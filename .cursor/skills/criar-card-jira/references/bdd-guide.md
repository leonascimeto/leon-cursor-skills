# Guia de Cenários BDD — Gherkin em PT-BR

Referência rápida para escrita de cenários BDD de qualidade, usada pela skill `criar-card-jira`.

---

## Estrutura Gherkin

```gherkin
# language: pt

Funcionalidade: [nome]          ← descreve a capacidade do sistema
  Como [persona]
  Quero [ação]
  Para que [benefício]

  Contexto:                     ← pré-condições compartilhadas (opcional)
    Dado [estado comum]

  Cenário: [nome descritivo]    ← um comportamento específico
    Dado [estado inicial]
    Quando [ação do ator]
    Então [resultado observável]
    E [resultado adicional]     ← encadeia mais afirmações
    Mas [exceção à regra]       ← encadeia negações

  Esquema do Cenário: [nome]    ← cenário parametrizado com múltiplos exemplos
    Dado [estado com <variável>]
    Quando [ação com <variável>]
    Então [resultado com <variável>]

    Exemplos:
      | variável | outro_campo |
      | valor1   | resultado1  |
      | valor2   | resultado2  |
```

---

## Palavras-chave em PT-BR

| Inglês | PT-BR |
|--------|-------|
| Feature | Funcionalidade |
| Background | Contexto |
| Scenario | Cenário |
| Scenario Outline | Esquema do Cenário |
| Examples | Exemplos |
| Given | Dado / Dada / Dados / Dadas |
| When | Quando |
| Then | Então |
| And | E |
| But | Mas |

---

## Boas Práticas

### O que o `Dado` deve expressar
- Estado do sistema **antes** da ação
- Dados de contexto necessários para o cenário
- Nunca ações do usuário (isso é `Quando`)

```gherkin
✅  Dado que o usuário está autenticado com perfil "Operador"
✅  Dado que existe um pedido no status "Aguardando pagamento"
❌  Dado que o usuário clicou em "Entrar"  ← isso é uma ação
```

### O que o `Quando` deve expressar
- **Uma única ação** do ator principal
- Evitar múltiplas ações em um `Quando`

```gherkin
✅  Quando o usuário submete o formulário de cadastro
❌  Quando o usuário preenche o formulário e clica em salvar  ← duas ações
```

### O que o `Então` deve expressar
- Resultado **observável** e verificável
- Feedback para o usuário, mudança de estado ou resposta do sistema
- Nunca implementação técnica

```gherkin
✅  Então o sistema exibe a mensagem "Cadastro realizado com sucesso"
✅  Então o pedido é movido para o status "Confirmado"
❌  Então a tabela "orders" é atualizada com status = 1  ← detalhe de implementação
```

---

## Tipos de Cenário — Quando Usar

| Tipo | Quando usar |
|------|-------------|
| **Cenário feliz** | Caminho principal que entrega valor ao usuário |
| **Cenário de validação** | Entradas inválidas, campos obrigatórios, formatos incorretos |
| **Cenário de permissão** | Acesso negado para perfis sem autorização |
| **Cenário de limite** | Valores no limite mínimo/máximo, listas vazias, zero registros |
| **Cenário de concorrência** | Ações simultâneas que podem gerar conflito |
| **Esquema do Cenário** | Mesma lógica com múltiplos conjuntos de dados |

---

## Antipadrões — Evitar

| Antipadrão | Problema | Solução |
|------------|----------|---------|
| Passos com detalhes de UI ("clica no botão X") | Frágil a mudanças de interface | Foco no comportamento, não na implementação |
| Cenário com mais de 7 passos | Difícil de manter | Quebrar em cenários menores |
| Múltiplas ações em um `Quando` | Ambíguo e não testável isoladamente | Um `Quando` por ação principal |
| Nomes vagos ("Cenário: funciona") | Não comunica intenção | Nome descritivo do comportamento testado |
| Estado no `Então` sem verificação | Não é testável | Todo `Então` deve ser verificável via teste |
| Duplicar o `Contexto` em cada cenário | Verbosidade | Usar o bloco `Contexto:` para pré-condições comuns |

---

## Exemplo Completo — Bem Escrito

```gherkin
# language: pt

Funcionalidade: Autenticação de usuário
  Como visitante do portal
  Quero fazer login com meu e-mail e senha
  Para que eu possa acessar as funcionalidades restritas

  Contexto:
    Dado que existe uma conta ativa com e-mail "ana@empresa.com"

  Cenário: Login com credenciais válidas
    Dado que o usuário está na tela de login
    Quando submete o e-mail "ana@empresa.com" e a senha correta
    Então é redirecionado para o painel principal
    E exibe a saudação "Olá, Ana"

  Cenário: Login com senha incorreta
    Dado que o usuário está na tela de login
    Quando submete o e-mail "ana@empresa.com" e uma senha incorreta
    Então o sistema exibe a mensagem "E-mail ou senha inválidos"
    E o usuário permanece na tela de login

  Cenário: Bloqueio após tentativas excessivas
    Dado que o usuário falhou no login 4 vezes consecutivas
    Quando submete credenciais pela quinta vez
    Então o sistema bloqueia a conta por 30 minutos
    E exibe a mensagem "Conta temporariamente bloqueada"

  Esquema do Cenário: Validação de campos obrigatórios
    Dado que o usuário está na tela de login
    Quando submete o formulário com <campo> vazio
    Então o sistema exibe a mensagem de erro "<mensagem>"

    Exemplos:
      | campo  | mensagem                  |
      | e-mail | "E-mail é obrigatório"    |
      | senha  | "Senha é obrigatória"     |
```

---

## Regras de Qualidade dos Cenários

- Cada cenário deve ser **independente** — não depende da execução de outro
- Cada cenário deve ter **nome único** e descritivo dentro da funcionalidade
- Cenários devem cobrir o **caminho feliz** e os **principais caminhos de erro**
- Use **Esquema do Cenário** quando os mesmos passos se repetem com dados diferentes
- Evite lógica condicional dentro dos passos (sem "se/então" nos passos)
