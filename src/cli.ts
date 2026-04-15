import * as p from "@clack/prompts";
import fs from "fs-extra";
import matter from "gray-matter";
import path from "node:path";
import { fileURLToPath } from "node:url";

function getPackageRoot(): string {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const base = path.basename(dir);
  if (base === "dist") return path.dirname(dir);
  if (base === "src") return path.dirname(dir);
  return dir;
}

function discoverSkillFolders(skillsRoot: string): string[] {
  if (!fs.existsSync(skillsRoot)) return [];
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(skillsRoot, name, "SKILL.md")));
}

interface SkillInfo {
  folder: string;
  name: string;
  description: string;
}

function loadSkillInfo(skillsRoot: string, folder: string): SkillInfo {
  const skillPath = path.join(skillsRoot, folder, "SKILL.md");
  const raw = fs.readFileSync(skillPath, "utf8");
  try {
    const { data } = matter(raw);
    const name =
      typeof data.name === "string" && data.name.length > 0 ? data.name : folder;
    const description =
      typeof data.description === "string" ? data.description : "";
    return { folder, name, description };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[skills-catalog] Frontmatter YAML inválido em ${skillPath}\n  ${msg}\n` +
        `  Dica: use aspas em description se houver texto no formato "algo: outro".`,
    );
    return { folder, name: folder, description: "" };
  }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findCommandsForSkillFolder(
  commandsDir: string,
  folder: string,
): string[] {
  if (!fs.existsSync(commandsDir)) return [];
  const files = fs.readdirSync(commandsDir).filter((f) => f.endsWith(".md"));
  const skillBacktick = new RegExp(
    `skill \`${escapeRegExp(folder)}\``,
    "m",
  );
  const skillPathMarker = `.cursor/skills/${folder}/`;
  const out: string[] = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(commandsDir, file), "utf8");
    if (skillBacktick.test(content) || content.includes(skillPathMarker)) {
      out.push(file);
    }
  }
  return out;
}

function truncateHint(text: string, max = 72): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

async function main(): Promise<void> {
  p.intro("skills-catalog — install Cursor skills");

  const root = getPackageRoot();
  const bundledCursor = path.join(root, ".cursor");
  const skillsRoot = path.join(bundledCursor, "skills");
  const commandsRoot = path.join(bundledCursor, "commands");

  if (!(await fs.pathExists(skillsRoot))) {
    p.outro(
      `Bundled skills not found at ${skillsRoot}. Is the package installed correctly?`,
    );
    process.exitCode = 1;
    return;
  }

  const folders = discoverSkillFolders(skillsRoot);
  if (folders.length === 0) {
    p.outro("No skills found in the catalog.");
    process.exitCode = 1;
    return;
  }

  const skills = folders
    .map((folder) => loadSkillInfo(skillsRoot, folder))
    .sort((a, b) => a.name.localeCompare(b.name));

  const selected = await p.multiselect({
    message: "Select skills to install",
    options: skills.map((s) => ({
      value: s.folder,
      label: s.name,
      hint: truncateHint(s.description),
    })),
    required: false,
  });

  if (p.isCancel(selected)) {
    p.cancel("Installation cancelled.");
    process.exit(0);
    return;
  }

  if (selected.length === 0) {
    p.outro("No skills selected. Nothing to do.");
    return;
  }

  const installCommands = await p.confirm({
    message: "Also install related Cursor commands (.cursor/commands)?",
    initialValue: true,
  });

  if (p.isCancel(installCommands)) {
    p.cancel("Installation cancelled.");
    process.exit(0);
    return;
  }

  const cwd = process.cwd();
  const destSkills = path.join(cwd, ".cursor", "skills");
  const destCommands = path.join(cwd, ".cursor", "commands");

  const s = p.spinner();
  s.start("Installing…");

  const installedSkills: string[] = [];
  const installedCommands: string[] = [];

  try {
    for (const folder of selected) {
      const from = path.join(skillsRoot, folder);
      const to = path.join(destSkills, folder);
      await fs.ensureDir(path.dirname(to));
      await fs.copy(from, to, { overwrite: true });
      installedSkills.push(folder);

      if (installCommands) {
        const cmdFiles = findCommandsForSkillFolder(commandsRoot, folder);
        for (const file of cmdFiles) {
          await fs.ensureDir(destCommands);
          await fs.copy(
            path.join(commandsRoot, file),
            path.join(destCommands, file),
            { overwrite: true },
          );
          if (!installedCommands.includes(file)) installedCommands.push(file);
        }
      }
    }
  } catch (err) {
    s.stop("Installation failed.");
    console.error(err);
    process.exitCode = 1;
    return;
  }

  s.stop("Done.");

  p.log.success(
    `Installed ${installedSkills.length} skill(s) under .cursor/skills/`,
  );
  for (const name of installedSkills) {
    p.log.message(`  • ${name}`);
  }

  if (installCommands && installedCommands.length > 0) {
    p.log.success(
      `Installed ${installedCommands.length} command(s) under .cursor/commands/`,
    );
    for (const file of installedCommands.sort()) {
      p.log.message(`  • ${file}`);
    }
  }

  p.outro("Restart Cursor or reload the window if skills do not appear.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
