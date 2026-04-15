# Checklist de Definition of Ready (DoR)

Critérios que um card JIRA deve atender antes de entrar em sprint ou refinamento final.
Usado pela skill `criar-card-jira` para validação antes da entrega ao time.

---

## Critérios Obrigatórios

Todo card deve atender **todos** os itens abaixo antes de ser considerado pronto para refinamento.

### Clareza e Valor

- [ ] O título descreve a entrega em até 80 caracteres (verbo + objeto + contexto)
- [ ] A história de usuário segue o formato "Como / Quero / Para que"
- [ ] O "Para que" expressa valor de negócio, não detalhe técnico
- [ ] Uma única persona está descrita na história (não mistura múltiplos perfis)

### Contexto

- [ ] O contexto As-Is descreve o estado atual de forma objetiva e compreensível
- [ ] O contexto To-Be descreve claramente o que muda após a entrega
- [ ] Há pelo menos uma métrica ou indicador de sucesso no To-Be

### Regras de Negócio

- [ ] As regras de negócio estão numeradas no formato RN-XX
- [ ] Cada regra é objetiva, testável e sem ambiguidade
- [ ] Nenhuma regra contém detalhes de implementação técnica

### Cenários BDD

- [ ] Existe ao menos um cenário feliz (caminho principal)
- [ ] Existe ao menos um cenário de erro ou caso limite por regra crítica
- [ ] Os cenários estão em Gherkin válido (Dado / Quando / Então)
- [ ] Nenhum cenário tem mais de 7 passos
- [ ] Os passos do `Então` são observáveis e verificáveis

### Critérios de Aceite

- [ ] Há entre 3 e 7 critérios de aceite
- [ ] Cada critério é verificável (pode ser marcado pass/fail)
- [ ] Os critérios não repetem as regras de negócio — complementam os cenários BDD

### Escopo

- [ ] A seção "Fora de Escopo" está preenchida com pelo menos um item
- [ ] Dependências com outros cards ou sistemas estão identificadas

### Metadados

- [ ] Tipo do card está definido (História / Task / Bug / Melhoria / Spike)
- [ ] Prioridade está preenchida
- [ ] Épico pai está vinculado (ou justificativa de ausência)

---

## Critérios Recomendados

Itens desejáveis que aumentam a qualidade do refinamento. Não bloqueantes, mas devem ser sinalizados se ausentes.

- [ ] Mockup ou protótipo linkado (para histórias com interface)
- [ ] Story Points estimados ou sinalizado "A estimar no refinamento"
- [ ] Labels e tags preenchidos para rastreabilidade
- [ ] Referência a documentos externos (regulações, políticas, ADRs)
- [ ] Critérios de performance ou SLA quando aplicável

---

## Framework INVEST — Verificação Rápida

Toda história deve ser:

| Letra | Critério | Pergunta |
|-------|----------|----------|
| **I** | Independente | A história pode ser desenvolvida sem depender de outra? |
| **N** | Negociável | O time pode discutir e ajustar a solução? |
| **V** | Valiosa | Entrega valor claro para o usuário ou negócio? |
| **E** | Estimável | O time consegue estimar o esforço? |
| **S** | Small (Pequena) | Pode ser entregue em até uma sprint? |
| **T** | Testável | Há critérios claros para verificar a conclusão? |

Se algum critério do INVEST não for atendido, registre a razão antes de avançar.

---

## Ação por Status

| Status | Ação |
|--------|------|
| Todos os obrigatórios ✅ | Card pronto para refinamento |
| 1-2 obrigatórios ❌ | Sinalizar ao usuário com descrição do que falta |
| 3+ obrigatórios ❌ | Retornar ao Passo 2 da skill para recoleta de informações |
| Recomendados ausentes | Registrar como observação no card, não bloquear |
