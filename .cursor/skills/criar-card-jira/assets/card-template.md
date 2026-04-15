# [Título do Card — Verbo + Objeto + Contexto]

> **Tipo:** História de Usuário | Task Técnica | Bug | Melhoria | Spike
> **Épico:** [Nome ou código do épico]
> **Time:** [Squad responsável]

---

## História de Usuário

```
Como [persona],
quero [ação/funcionalidade],
para que [benefício/resultado de negócio].
```

---

## Contexto

### As-Is — Situação Atual

> Descreva como o processo ou funcionalidade funciona **hoje**, incluindo a dor ou limitação concreta.

[Descreva o estado atual, fluxo existente e o problema que o usuário enfrenta. Use dados quantitativos se disponíveis.]

### To-Be — Situação Desejada

> Descreva o que **muda** após a entrega deste card.

[Descreva o novo comportamento esperado, como o usuário será beneficiado e quais métricas de sucesso indicarão que a entrega foi bem-sucedida.]

---

## Regras de Negócio

| ID | Regra |
|----|-------|
| RN-01 | [Regra objetiva e testável] |
| RN-02 | [Regra objetiva e testável] |
| RN-03 | [Regra objetiva e testável] |

> Adicione ou remova linhas conforme necessário. Cada regra deve ser verificável (pass/fail).

---

## Cenários BDD

```gherkin
# language: pt

Funcionalidade: [Nome da funcionalidade]
  Como [persona]
  Quero [ação]
  Para que [benefício]

  Contexto:
    Dado que [pré-condição comum a todos os cenários abaixo]

  Cenário: [Cenário feliz — caminho principal]
    Dado [estado inicial específico]
    Quando [ação do usuário]
    Então [resultado observável esperado]
    E [resultado adicional se necessário]

  Cenário: [Cenário de erro — validação ou limite]
    Dado [estado que leva ao erro]
    Quando [ação que dispara a validação]
    Então [mensagem ou comportamento de erro esperado]

  Cenário: [Cenário de caso limite]
    Dado [condição de borda]
    Quando [ação]
    Então [comportamento esperado no limite]
```

---

## Critérios de Aceite

- [ ] [Critério 1 — observável e testável]
- [ ] [Critério 2 — observável e testável]
- [ ] [Critério 3 — observável e testável]
- [ ] [Critério 4 — observável e testável]
- [ ] [Critério 5 — observável e testável]

> Máximo recomendado: 7 critérios. Se precisar de mais, considere dividir a história.

---

## Fora de Escopo

- [Funcionalidade explicitamente excluída desta entrega]
- [Melhoria futura relacionada — registrar como card separado]
- [Caso de uso fora dos limites desta história]

---

## Metadados

| Campo | Valor |
|-------|-------|
| **Tipo** | História de Usuário |
| **Épico** | [nome ou código] |
| **Prioridade** | Crítica / Alta / Média / Baixa |
| **Story Points** | [número ou "A estimar no refinamento"] |
| **Labels** | [tag-1, tag-2] |
| **Dependências** | [PROJ-XXX, nome do sistema externo] |
| **Time** | [squad] |
| **Sprint** | [número ou "Backlog"] |

---

## Notas e Referências

> Seção opcional para links, mockups, documentos de apoio ou decisões relevantes.

- [Link para mockup/protótipo]
- [Link para documento de regras de negócio]
- [Referência a ADR ou decisão técnica relacionada]
