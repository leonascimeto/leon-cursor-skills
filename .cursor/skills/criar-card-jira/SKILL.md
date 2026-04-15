---
name: criar-card-jira
description: "Cria cards JIRA completos e prontos para refinamento, seguindo boas práticas ágeis: histórias de usuário no formato padrão, contexto As-Is/To-Be, regras de negócio numeradas e cenários BDD em Gherkin. Use quando for criar histórias, tasks, bugs ou melhorias para o JIRA. Não use para criar documentação técnica, especificações de arquitetura ou PRDs — para isso use a skill avilla-driven-development."
---

# Criar Card JIRA

Gera cards JIRA estruturados, completos e prontos para refinamento com o time.

---

## Passo 1 — Identificar o tipo de card

Use o Ask User Question tool para confirmar:

- **Tipo:** História de Usuário · Task Técnica · Bug · Melhoria · Spike
- **Épico pai** (se existir)
- **Time/Squad responsável**

Se o tipo for **Bug**, leia `references/bug-guide.md` antes de continuar.
Para os demais tipos, siga o fluxo abaixo.

---

## Passo 2 — Coletar contexto (obrigatório)

Use o Ask User Question tool para levantar:

1. **Quem** é o usuário/persona afetado?
2. **Qual o problema atual** (As-Is)? Descreva o estado presente e a dor.
3. **Qual o resultado esperado** (To-Be)? O que muda após a entrega?
4. **Qual o valor de negócio**? Por que isso importa agora?
5. **Há restrições ou dependências** conhecidas?
6. **O que está fora do escopo** desta entrega?

> Não avance sem respostas para os itens 1 a 4 no mínimo.

---

## Passo 3 — Explorar o contexto do projeto

1. Se existir, leia `./tasks/prd-[funcionalidade]/prd.md` para absorver requisitos já levantados.
2. Busque arquivos de contexto do projeto (docs, ADRs, outras histórias do mesmo épico) para evitar duplicação ou conflito.
3. Se necessário, execute Web Search para buscar regras de negócio do domínio.

---

## Passo 4 — Redigir o card

Leia `assets/card-template.md` e preencha **todas** as seções usando os dados coletados.

### 4.1 — Título

- Formato: `[Verbo no infinitivo] + [objeto] + [contexto opcional]`
- Exemplo: `Adicionar validação de CPF no cadastro de cliente`
- Máximo: 80 caracteres. Sem jargões técnicos.

### 4.2 — História de Usuário

Use o formato padrão:

```
Como [persona],
quero [ação/funcionalidade],
para que [benefício/resultado de negócio].
```

- Uma história = uma persona. Se há múltiplas personas, crie cards separados.
- O "para que" deve expressar valor de negócio, não detalhe técnico.

### 4.3 — Contexto As-Is

Descreva o estado atual de forma objetiva:

- Como o processo/funcionalidade funciona hoje
- Qual a dor ou limitação concreta
- Dados quantitativos se disponíveis (ex: "X% dos usuários abandonam nessa etapa")

### 4.4 — Contexto To-Be

Descreva o estado desejado após a entrega:

- O que muda no fluxo ou comportamento
- Como o usuário se beneficia
- Métricas de sucesso esperadas

### 4.5 — Regras de Negócio

Liste as regras no formato numerado `RN-XX`:

```
RN-01: [Regra objetiva e testável]
RN-02: [Regra objetiva e testável]
```

Boas práticas para regras de negócio:
- Cada regra deve ser testável (pass/fail)
- Sem implementação técnica — apenas o comportamento esperado
- Referencie regulações ou políticas quando aplicável
- Leia `references/bdd-guide.md` se tiver dúvida sobre o nível de detalhe adequado

### 4.6 — Cenários BDD

Escreva cenários em Gherkin (PT-BR). Leia `references/bdd-guide.md` para guia completo.

Estrutura obrigatória:

```gherkin
Funcionalidade: [nome da funcionalidade]

  Contexto:
    Dado [pré-condição comum a todos os cenários]

  Cenário: [nome descritivo do cenário feliz]
    Dado [estado inicial específico]
    Quando [ação do usuário]
    Então [resultado esperado]

  Cenário: [nome do cenário de erro/exceção]
    Dado [estado inicial]
    Quando [ação que gera erro]
    Então [comportamento esperado no erro]
```

Requisitos mínimos:
- Ao menos 1 cenário feliz (caminho principal)
- Ao menos 1 cenário de erro ou caso limite por regra crítica
- Cada `Então` deve ser observável e mensurável

### 4.7 — Critérios de Aceite

Liste de forma direta e verificável:

```
- [ ] [Critério 1 — observável e testável]
- [ ] [Critério 2 — observável e testável]
```

- Máximo de 7 critérios. Se precisar de mais, avalie dividir a história.
- Cada critério responde à pergunta: "Como saberemos que isso está pronto?"

### 4.8 — Fora de Escopo

Liste explicitamente o que **não** será entregue neste card:

```
- [Item explicitamente excluído]
- [Funcionalidade futura relacionada]
```

### 4.9 — Metadados

Preencha os campos:

| Campo | Valor |
|-------|-------|
| Tipo | História / Task / Bug / Melhoria / Spike |
| Épico | [nome ou código do épico] |
| Prioridade | Crítica / Alta / Média / Baixa |
| Story Points | [estimativa ou "A estimar no refinamento"] |
| Labels | [tags relevantes] |
| Dependências | [cards ou sistemas dependentes] |
| Time | [squad responsável] |

---

## Passo 5 — Validar com o Checklist DoR

Leia `references/checklist-dor.md` e marque cada item.

Só apresente o card ao usuário após todos os itens obrigatórios estarem marcados.
Se algum item estiver bloqueado por falta de informação, sinalize claramente.

---

## Passo 6 — Apresentar e confirmar

1. Exiba o card completo formatado em markdown.
2. Apresente o checklist DoR com o status de cada item.
3. Aguarde confirmação ou ajustes do usuário antes de indicar que o card está pronto.
4. Se o usuário aprovar, confirme que o card pode ser copiado para o JIRA.

---

## Error Handling

- Se o usuário não souber responder ao As-Is ou To-Be, ajude com perguntas mais específicas antes de continuar.
- Se as regras de negócio forem vagas ou ambíguas, solicite exemplos concretos de comportamento esperado.
- Se um cenário BDD tiver mais de 7 passos, sugerir decomposição em cenários menores.
- Se os critérios de aceite ultrapassarem 7 itens, sugerir divisão da história em duas.
- Se o template `assets/card-template.md` não for encontrado, informar o usuário imediatamente.
