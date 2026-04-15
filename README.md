# skills-catalog

CLI interativo para instalar **Cursor skills** (e commands relacionados) deste catálogo no projeto atual.

## Uso (após publicar no npm)

No diretório do projeto onde você quer `.cursor/skills/` e `.cursor/commands/`:

```bash
npx skills-catalog
```

Com escopo de organização (exemplo):

```bash
npx @your-org/skills-catalog
```

> Ajuste o campo `"name"` em [`package.json`](package.json) antes de publicar (ex.: `@minha-org/skills-catalog`).

O fluxo:

1. Lista todas as skills bundladas (lê o frontmatter `name` e `description` de cada `SKILL.md`).
2. Você escolhe uma ou mais skills (multi-select).
3. Opcionalmente instala os **commands** que referenciam essas skills (detecção por `skill \`<pasta>\`` ou caminho `.cursor/skills/<pasta>/` nos `.md` de commands).
4. Arquivos são copiados para `./.cursor/skills/<pasta>/` e `./.cursor/commands/*.md` (sobrescreve se já existir).

Reinicie o Cursor ou recarregue a janela se as skills não aparecerem.

## Desenvolvimento local

```bash
npm install
npm run build
```

Testar o CLI sem publicar:

```bash
node dist/cli.js
# ou
npm run dev
```

Em outro diretório (ex.: um projeto vazio), rode o caminho absoluto para `dist/cli.js` ou use `npm link` neste repositório e execute `skills-catalog` no projeto alvo.

## Publicação para o time

1. Defina `"name"` (recomendado: `@escopo/skills-catalog` para pacote privado na org).
2. `npm login` (ou configure CI com token).
3. Para GitHub Packages ou registry privado, use `.npmrc` no projeto do time com `registry=` e escopo adequado.
4. `npm publish --access public` (pacote público) ou `npm publish` (privado, conforme configuração).

O pacote inclui apenas `dist/` e `.cursor/` (veja `"files"` em `package.json`).

## Requisitos

- Node.js **18+**

## Licença

MIT
