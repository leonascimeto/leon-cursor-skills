---
name: avilla-driven-development
description: "Executa o fluxo completo de desenvolvimento orientado a documentação: cria PRD, Tech Spec, lista de tarefas, implementa tasks, revisa e executa QA. Use quando for iniciar uma nova funcionalidade, documentar requisitos, gerar especificação técnica, detalhar ou implementar tarefas, revisar implementações ou executar testes de qualidade. Não use para debugging genérico, refatoração sem contexto de task, ou tarefas fora do ciclo de desenvolvimento de funcionalidades."
---

# Avilla Driven Development

Fluxo completo de desenvolvimento orientado a documentação com seis fases sequenciais:

**PRD → Tech Spec → Tasks → Executar Task → Revisar Task → QA**

Cada fase possui um command dedicado que ativa este skill automaticamente. Execute as fases em ordem; cada uma depende da anterior.

---

## Fase 1: Criar PRD

**Pré-condição:** Solicitação de funcionalidade recebida do usuário.

**Passo 1 — Esclarecer (obrigatório)**

Use a ferramenta `Ask User Question` para levantar:

- Qual problema será resolvido e qual o objetivo mensurável
- Quem são os usuários principais e suas histórias
- O que está **fora de escopo**
- Restrições conhecidas (performance, conformidade, integrações)

> Não avance para o Passo 2 sem respostas completas.

**Passo 2 — Planejar**

1. Esboce a abordagem seção por seção antes de redigir.
2. Execute Web Search para buscar regras de negócio relevantes ao domínio.
3. Liste premissas e dependências identificadas.

**Passo 3 — Redigir o PRD**

1. Leia `assets/prd-template.md` e use-o como estrutura exata — **não desvie do template**.
2. Foque no **O QUÊ e POR QUÊ**, nunca no COMO.
3. Inclua requisitos funcionais numerados.
4. Mantenha o documento em no máximo 2.000 palavras.

**Passo 4 — Salvar**

1. Crie o diretório: `./tasks/prd-[nome-funcionalidade]/` (kebab-case).
2. Salve em: `./tasks/prd-[nome-funcionalidade]/prd.md`.
3. Confirme o caminho ao usuário com um resumo breve.

**Restrições críticas da Fase 1:**

- Nunca gere o PRD sem antes executar o Passo 1 com o Ask User Question tool.
- Nunca inclua detalhes de implementação no PRD.
- Nunca desvie do template em `assets/prd-template.md`.

---

## Fase 2: Criar Tech Spec

**Pré-condição:** `./tasks/prd-[nome-funcionalidade]/prd.md` deve existir.

**Passo 1 — Ler o PRD**

Leia o arquivo `./tasks/prd-[nome-funcionalidade]/prd.md` por completo. Não pule esta etapa.

**Passo 2 — Analisar o projeto**

1. Descubra arquivos, módulos e pontos de integração relevantes ao escopo.
2. Mapeie dependências, configurações e padrões existentes.
3. Use o MCP Context7 para documentação técnica de bibliotecas.
4. Execute pelo menos 3 buscas com Web Search para regras de negócio e referências externas.

**Passo 3 — Esclarecer (obrigatório)**

Use o Ask User Question tool para perguntas técnicas sobre:

- Posicionamento de domínio e limites de módulo
- Fluxo de dados, contratos e transformações
- Dependências externas e modos de falha
- Cenários de teste críticos
- Reusar vs construir (bibliotecas existentes têm preferência)

**Passo 4 — Redigir a Tech Spec**

1. Leia `assets/techspec-template.md` e use-o como estrutura exata — **não desvie do template**.
2. Foque no **COMO**, não no O QUÊ (o PRD já define o quê).
3. Prefira arquitetura simples e evolutiva com interfaces claras.
4. Mantenha até ~2.000 palavras; evite repetir requisitos funcionais do PRD.
5. Evite mostrar código extenso; prefira interfaces e contratos.

**Passo 5 — Salvar**

1. Salve em: `./tasks/prd-[nome-funcionalidade]/techspec.md`.
2. Confirme o caminho ao usuário.

**Restrições críticas da Fase 2:**

- Nunca gere a Tech Spec sem antes executar os Passos 1, 2 e 3.
- Nunca desvie do template em `assets/techspec-template.md`.

---

## Fase 3: Criar Tasks

**Pré-condição:** `./tasks/prd-[nome-funcionalidade]/prd.md` e `./tasks/prd-[nome-funcionalidade]/techspec.md` devem existir.

**Passo 1 — Analisar PRD e Tech Spec**

1. Leia `./tasks/prd-[nome-funcionalidade]/prd.md`.
2. Leia `./tasks/prd-[nome-funcionalidade]/techspec.md`.
3. Extraia requisitos, decisões técnicas e componentes principais.

**Passo 2 — Propor estrutura high-level (obrigatório)**

1. Liste as tarefas principais (máximo 15) com título e objetivo.
2. Exiba a lista ao usuário e **aguarde aprovação antes de gerar qualquer arquivo**.

**Passo 3 — Gerar lista de tarefas**

1. Leia `assets/tasks-template.md` como estrutura exata.
2. Salve em: `./tasks/prd-[nome-funcionalidade]/tasks.md`.

**Passo 4 — Gerar tarefas individuais**

Para cada tarefa aprovada:

1. Leia `assets/task-template.md` como estrutura exata.
2. Detalhe subtarefas, critérios de sucesso e testes (unidade, integração, E2E).
3. Referencie a techspec em vez de repetir detalhes de implementação.
4. Salve em: `./tasks/prd-[nome-funcionalidade]/[num]_task.md`.

**Passo 5 — Confirmar**

Apresente os caminhos dos arquivos gerados e aguarde confirmação para prosseguir com implementação.

**Diretrizes de tarefas:**

- Cada tarefa deve ser um entregável funcional e independentemente completável.
- Toda tarefa deve ter testes (unidade + integração no mínimo).
- Ordenar por dependência: backend antes do frontend; ambos antes dos testes E2E.
- Usar formato X.0 para tarefas principais e X.Y para subtarefas.
- Escrever para leitores júniors — seja explícito e claro.

**Restrições críticas da Fase 3:**

- Nunca gere arquivos sem aprovação da lista high-level.
- Nunca implemente código nesta fase.

---

---

## Fase 4: Executar Task

**Pré-condição:** O arquivo da task `./tasks/prd-[nome-funcionalidade]/[num]_task.md` deve existir.

**Passo 1 — Identificar a task**

1. Se o usuário não especificou qual task, leia `./tasks/prd-[nome-funcionalidade]/tasks.md` e liste as tasks pendentes (marcadas com `- [ ]`).
2. Use o Ask User Question tool para confirmar qual task será executada.

**Passo 2 — Carregar contexto completo**

Leia obrigatoriamente, nesta ordem:

1. `./tasks/prd-[nome-funcionalidade]/prd.md`
2. `./tasks/prd-[nome-funcionalidade]/techspec.md`
3. `./tasks/prd-[nome-funcionalidade]/[num]_task.md`

Não inicie a implementação sem ter lido os três arquivos.

**Passo 3 — Perguntar sobre execução automática de Review + QA**

Antes de implementar, use o Ask User Question tool para perguntar:

> "Deseja que, após a implementação, eu execute automaticamente a Revisão (Fase 5) e o QA (Fase 6) como subagentes em sequência, sem interrupção?"

- Se **sim**: após o Passo 5, execute a Fase 5 e depois a Fase 6 automaticamente em sequência.
- Se **não**: finalize a Fase 4 e aguarde o próximo command do usuário.

**Passo 4 — Implementar**

1. Siga estritamente as subtarefas e critérios de sucesso definidos no arquivo da task.
2. Implemente de forma incremental — complete cada subtarefa antes de avançar.
3. Não implemente nada além do escopo da task atual.
4. Referencie a techspec para decisões de arquitetura; não reinterprete os requisitos.

**Passo 5 — Executar testes da task**

1. Execute os testes listados na seção "Testes da Tarefa" do arquivo da task.
2. Todos os testes devem passar antes de considerar a implementação concluída.
3. Se algum teste falhar, corrija a implementação e reexecute antes de avançar.

**Passo 6 — Reportar**

Apresente ao usuário:
- Resumo do que foi implementado por subtarefa
- Status de todos os testes executados
- Arquivos criados ou modificados

Se a execução automática foi solicitada, prossiga diretamente para a Fase 5.

**Restrições críticas da Fase 4:**

- Nunca implemente sem ter lido o prd.md, techspec.md e o arquivo da task.
- Nunca implemente além do escopo da task definida.
- Nunca avance para a próxima fase sem que todos os testes da task passem.

---

## Fase 5: Revisar Task

**Pré-condição:** A Fase 4 deve ter sido concluída para a task em questão.

**Passo 1 — Carregar contexto**

Leia obrigatoriamente:

1. `./tasks/prd-[nome-funcionalidade]/prd.md`
2. `./tasks/prd-[nome-funcionalidade]/techspec.md`
3. `./tasks/prd-[nome-funcionalidade]/[num]_task.md`
4. Todos os arquivos implementados ou modificados durante a Fase 4.

**Passo 2 — Revisar conformidade com a task**

Verifique cada item da seção "Critérios de Sucesso" do arquivo da task:

- A implementação cobre todos os critérios? Marque cada um como ✅ ou ❌.
- As subtarefas foram completadas integralmente?
- Há código ou lógica fora do escopo da task?

**Passo 3 — Revisar conformidade com a Tech Spec**

Verifique:

- As interfaces e contratos definidos na techspec foram respeitados?
- Os padrões arquiteturais foram seguidos?
- Há desvios justificados? Registre-os explicitamente.

**Passo 4 — Revisar conformidade com o PRD**

Verifique:

- Os requisitos funcionais numerados no PRD foram atendidos pela task?
- Há impacto em requisitos de outras tasks? Se sim, sinalize.

**Passo 5 — Emitir relatório de revisão**

Produza um relatório estruturado com:

```
## Relatório de Revisão — Task [num]: [título]

### Critérios de Sucesso
- ✅/❌ [critério 1]
- ✅/❌ [critério 2]

### Conformidade com Tech Spec
[observações]

### Conformidade com PRD
[observações]

### Problemas Encontrados
[lista de problemas ou "Nenhum"]

### Recomendação
[ ] Aprovado para QA
[ ] Requer correções antes do QA
```

**Passo 6 — Decisão**

- Se **aprovado**: prossiga para a Fase 6 (automaticamente se solicitado, ou aguarde command).
- Se **requer correções**: liste os pontos a corrigir, interrompa e retorne para Fase 4.

**Restrições críticas da Fase 5:**

- Nunca aprove uma revisão com critérios de sucesso não atendidos.
- Nunca pule a leitura dos três documentos de contexto.

---

## Fase 6: QA Executar

**Pré-condição:** A Fase 5 deve ter emitido "Aprovado para QA".

**Passo 1 — Carregar contexto de testes**

Leia:

1. `./tasks/prd-[nome-funcionalidade]/[num]_task.md` — seção "Testes da Tarefa"
2. `./tasks/prd-[nome-funcionalidade]/techspec.md` — seção "Abordagem de Testes"
3. Arquivos de teste existentes relacionados à implementação.

**Passo 2 — Executar testes de unidade**

1. Execute todos os testes de unidade listados na task e na techspec.
2. Registre: nome do teste, status (PASS/FAIL), mensagem de erro se falhou.

**Passo 3 — Executar testes de integração**

1. Execute todos os testes de integração definidos.
2. Registre resultados no mesmo formato.

**Passo 4 — Executar testes E2E (se aplicável)**

1. Se a task define testes E2E, execute-os (preferencialmente com Playwright).
2. Se não há testes E2E definidos, registre "N/A" e continue.

**Passo 5 — Emitir relatório de QA**

Produza um relatório estruturado:

```
## Relatório de QA — Task [num]: [título]

### Testes de Unidade
| Teste | Status | Observação |
|-------|--------|------------|
| [nome] | PASS/FAIL | [mensagem] |

### Testes de Integração
| Teste | Status | Observação |
|-------|--------|------------|

### Testes E2E
| Teste | Status | Observação |
|-------|--------|------------|

### Resultado Geral
[ ] APROVADO — todos os testes passaram
[ ] REPROVADO — [N] teste(s) falharam
```

**Passo 6 — Marcar task como concluída (somente se aprovado)**

Se o resultado geral for **APROVADO**:

1. Abra `./tasks/prd-[nome-funcionalidade]/tasks.md`.
2. Localize a linha correspondente à task executada no formato `- [ ] X.0 [título]`.
3. Substitua `- [ ]` por `- [x]`.
4. Salve o arquivo e confirme a atualização ao usuário.

Se o resultado for **REPROVADO**:

1. Liste os testes que falharam com detalhes.
2. **Não marque a task como concluída.**
3. Retorne para a Fase 4 para correção.

**Restrições críticas da Fase 6:**

- Nunca marque a task como concluída sem que todos os testes passem.
- Nunca pule testes definidos na task — registre todos, mesmo os que passaram.

---

## Error Handling

- Se o PRD não existir ao iniciar a Fase 2 ou 3, informar o usuário e solicitar execução da Fase 1 primeiro.
- Se a Tech Spec não existir ao iniciar a Fase 3, 4 ou 5, informar o usuário e solicitar execução da Fase 2 primeiro.
- Se o arquivo da task não existir ao iniciar as Fases 4, 5 ou 6, informar o usuário e solicitar execução da Fase 3 primeiro.
- Se a Fase 5 retornar "Requer correções", interromper o fluxo automático e aguardar o usuário.
- Se a Fase 6 reprovar, interromper o fluxo automático e aguardar o usuário.
- Se o usuário não responder às perguntas de clarificação, reiterar a importância antes de prosseguir.
- Se um template em `assets/` não for encontrado, informar o usuário imediatamente — nunca improvisar a estrutura do documento.
