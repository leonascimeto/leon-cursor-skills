# Guia: usar o skills-catalog em outro projeto

Este repositório é um **pacote npm** com um **CLI** (`skills-catalog`) que copia skills e commands do Cursor do catálogo bundlado para o diretório onde você executar o comando.

---

## O que foi feito para virar uma “lib” instalável

Resumo técnico do que transforma o catálogo em pacote consumível por `npx` / `npm`:

| Peça | Função |
|------|--------|
| **`package.json`** | Declara o projeto como módulo Node (`"type": "module"`), define o executável em **`"bin"`** (`skills-catalog` → `./dist/cli.js`), limita o que vai para o npm em **`"files": ["dist", ".cursor"]`**, e roda o build antes de publicar com **`prepublishOnly`**. |
| **`src/cli.ts`** | Implementação do CLI: lê `.cursor/skills/*/SKILL.md`, menu interativo, cópia para `./.cursor/skills/` e opcionalmente `./.cursor/commands/`. |
| **`tsup` + `tsup.config.ts`** | Compila `src/cli.ts` para **`dist/cli.js`** (ESM, Node 18+) com shebang **`#!/usr/bin/env node`** para o sistema tratar o arquivo como executável. |
| **`dependencies`** | `@clack/prompts` (terminal), `gray-matter` (frontmatter dos `SKILL.md`), `fs-extra` (cópia de pastas). |
| **Pasta `.cursor/`** | Skills e commands **empacotados** junto do pacote; quem instala recebe essa árvore dentro de `node_modules/skills-catalog/.cursor/`. |

Ou seja: não é uma biblioteca importada com `import` no código do seu app — é um **pacote de ferramenta de linha de comando** que o npm expõe como comando ao instalar ou ao rodar via `npx`.

---

## Requisitos

- **Node.js 18+**
- Projeto ou pasta onde você queira criar/atualizar `.cursor/skills/` e `.cursor/commands/`

---

## Forma 1: depois de publicar no npm (recomendado para o time)

1. Publique o pacote (ajuste o nome se usar escopo, ex.: `@sua-org/skills-catalog`).

2. No **outro projeto**, na raiz (ou na pasta desejada), rode:

   ```bash
   npx skills-catalog
   ```

   Se o nome publicado for com escopo:

   ```bash
   npx @sua-org/skills-catalog
   ```

3. Siga o menu: escolha as skills, confirme se quer instalar os commands relacionados.

4. Abra ou recarregue o **Cursor** para passar a enxergar as skills novas.

---

## Forma 2: sem publicar — link local (desenvolvimento)

Útil para testar mudanças no catálogo antes do `npm publish`.

1. Neste repositório (`skills-catalog`):

   ```bash
   npm install
   npm run build
   npm link
   ```

2. No **outro projeto**:

   ```bash
   cd /caminho/do/outro-projeto
   skills-catalog
   ```

   O comando global aponta para o seu clone local até você dar `npm unlink -g` no catálogo.

---

## Forma 3: sem publicar — executar o JS direto

Depois de `npm install` e `npm run build` neste repo:

```bash
node /caminho/para/skills-catalog/dist/cli.js
```

Execute isso com o diretório de trabalho (`cd`) já no projeto onde quer a pasta `.cursor/`.

---

## O que o CLI faz no projeto alvo

- Cria (se precisar) **`.cursor/skills/<nome-da-skill>/`** com todos os arquivos da skill escolhida (templates, references, etc.).
- Opcionalmente copia **`.cursor/commands/*.md`** cujo conteúdo referencia aquela skill (padrões definidos no código do CLI).
- **Sobrescreve** arquivos se já existirem com o mesmo caminho.

Não altera `package.json` do projeto alvo: as skills são só arquivos do Cursor.

---

## Publicação rápida (lembrete)

```bash
npm login
npm publish
# ou, com escopo privado na org:
npm publish --access restricted
```

O tarball inclui apenas `dist/` e `.cursor/` (conforme `"files"` no `package.json`).

---

## Repositório no GitHub

O código-fonte e o catálogo versionados podem ficar em um repositório (ex.: clone + `npm link` ou fork). O **uso pelo time no dia a dia** costuma ser **`npx` após publicar no npm**, para não depender de clone manual.

---

## Problemas comuns

- **`YAMLException` / erro ao abrir o menu**: no frontmatter do `SKILL.md`, campos longos com `:` no meio do texto (ex.: `documentação: cria`) quebram o YAML se não estiverem entre aspas. Use `description: "texto completo..."` (aspas duplas).
- **`command not found`**: rode `npm run build` antes de `npm link` ou use `npx` apontando para o pacote publicado.
- **Skills não aparecem no Cursor**: reinicie o Cursor ou recarregue a janela; confira se os arquivos estão em `.cursor/skills/` na raiz do projeto que você abriu.
