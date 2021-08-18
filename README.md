![](https://i.imgur.com/xG74tOh.png)

# Desafio | Back-end - Módulo 2

Você acabou de ser contratado pela melhor empresa de tecnologia do mundo: a **CUBOS**.
Sua primeira tarefa como desenvolvedor é criar uma API para um Banco Digital.

Seu papel é construir uma RESTful API que permita:

-   Criação de conta
-   Depósito
-   Saque
-   Transferência
-   Extrato
-   Saldo
-   Deletar uma conta
-   Atualização dos dados do usuário da conta

## Requisitos obrigatórios

-   Sua API deve seguir o padrão REST
-   Seu código deve estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
    -   Um arquivo index.js
    -   Um arquivo de rotas
    -   Um pasta com controladores
-   Evite códigos duplicados. Antes de copiar e colar, pense se não faz sentido esse pedaço de código estar centralizado numa função.

### Criar conta

#### `POST` `/conta`

Esse endpoint deverá criar uma conta, onde será gerado um número único para identificação da conta (número da conta), a agência será sempre o número `0001`.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Criar uma nova conta cujo número é único
    -   CPF deve ser um campo único.
    -   Criar uma senha numérica de 4 digitos

-   Entradas
    -   Nome
    -   Cpf
    -   Data Nascimento
    -   Telefone
    -   Email
    -   Senha
-   Saída
    -   Dados usuário
    -   Número conta
    -   Agência
    -   Banco
    -   Saldo

#### Função

```javascript
function criarConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    conta: 1,
    agencia: 0001,
    banco: 277,
    saldo: 0,
    usuario: {
        nome: 'Foo Bar',
        cpf: '00011122233',
        data_nascimento: '2021-03-15',
        telefone: '71999998888',
        email: 'foo@bar.com',
        senha: '1234'
    }
}

// HTTP Status 400, 404
{
    mensagem: 'Mensagem do erro!'
}
```

### Atualizar usuário da conta

#### `PUT` `/conta/:numeroConta/usuario`

Esse endpoint deverá atualizar os dados do usuário de uma conta.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se a senha é válida antes de atualizar os dados do usuário
    -   Atualizar 1 ou mais campos dos dados do usuário de uma conta

-   Entradas
    -   Nome
    -   Cpf
    -   Data Nascimento
    -   Telefone
    -   Email
    -   Senha
-   Saída
    -   Dados usuário
    -   Número conta
    -   Agência
    -   Banco
    -   Saldo

#### Função

```javascript
function atualizarUsuarioConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    mensagem: "Conta atualizada com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Excluir Conta

#### `DELETE` `/conta/:numeroConta`

Esse endpoint deve excluir uma conta existente.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Permitir excluir exclusivamente contas com saldo `0` (zero)
    -   Validar a senha digitada se é uma senha válida
    -   Excluir do array a conta atual

-   Entradas

    -   Senha

-   Saida
    -   Sucesso ou erro

#### Função

```javascript
function excluirConta(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    mensagem: "Conta excluída com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Depositar

#### `POST` `/conta/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se há uma conta com os dados enviados
    -   Somar o valor de depósito ao saldo da conta em questão
    -   Não permitir depósitos com valores negativos

-   Entrada
    -   Dados da conta
    -   Valor
-   Saida
    -   Sucesso ou erro

#### Função

```javascript
function depositar(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    mensagem: "Depósito realizado com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Sacar

#### `POST` `/conta/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se a senha informada é uma senha válida
    -   Verificar se há saldo para o saque
    -   Subtrair o valor do saque junto ao saldo da conta

-   Entrada
    -   Dados da conta
    -   Valor
    -   Senha
-   Saída
    -   Sucesso ou erro

#### Função

```javascript
function sacar(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    mensagem: "Saque realizado com sucesso!"
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Tranferir

#### `POST` `/conta/transferir`

Esse endpoint permitirá a transferência de recursos (dinheiro) de uma conta para outra.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se senha informada é válida
    -   Verificar se há saldo na conta de origem para a transferência
    -   Verificar se a conta de destino é válida
    -   Subtrair o valor da transfência junto ao saldo da conta de origem

-   Entrada
    -   Dados da conta (origem)
    -   Senha da conta (origem)
    -   Valor
    -   Dados da conta (destino)
-   Saída
    -   Sucesso ou erro

#### Função

```javascript
function tranferir(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    mensagem: 'Transferência realizada com sucesso!',
    data: '2021-03-15 00:00:00',
    valor: 12300,
    destino: {
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233'
        },
        conta:{
            numero: 000111123,
            agencia: 0001,
            banco: 277
        }
    }
}

// HTTP Status 400, 404
{
    mensagem: 'Mensagem do erro!'
}
```

### Saldo

#### `GET` `/conta/saldo`

Esse endpoint retorna o saldo de uma conta.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se senha informada é válida
    -   Verificar se os dados da conta informada são válidos

-   Entrada
    -   Dados da conta
    -   Senha
-   Saída
    -   Saldo da conta

#### Função

```javascript
function saldo(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
{
    valor: 13000
}

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

### Extrato

#### `GET` `/conta/extrato`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

-   Você deverá, **OBRIGATORIAMENTE**:

    -   Verificar se senha informada é válida
    -   Verificar se os dados da conta informada são válidos
    -   Retornar a lista de transferências, depósitos e saques.

-   Entrada
    -   Dados da conta
    -   Senha
-   Saída
    -   Relatório da conta

#### Função

```javascript
function extrato(...) {
    //
}
```

#### Saída

```javascript
// HTTP Status 200
;[
    {
        tipo: "saque",
        data: "2021-03-15 00:00:00",
        valor: 10000,
    },
    {
        tipo: "deposito",
        data: "2021-03-15 00:00:00",
        valor: 10000,
    },
    {
        tipo: "transferencia",
        data: "2021-03-15 00:00:00",
        valor: 10000,
    },
]

// HTTP Status 400, 404
{
    mensagem: "Mensagem do erro!"
}
```

## Aulas úteis:

-   [Roteador e Controlador](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/17/05/2021/aula/9821747f-8d71-47ee-b48f-426997e37ce2/b5b395c1-1c49-4866-a749-8719a176c3c5)
-   [Reutilizando validações](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/17/05/2021/aula/9821747f-8d71-47ee-b48f-426997e37ce2/8206f90d-d0e5-472d-8e65-331dbe5f0ecd)
-   [Adicionando dias úteis com date-fns](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/24/05/2021/aula/567d09bf-b527-42fa-b063-63d9ff4743f1/7c3ac2fe-80e1-4646-9e34-8dd8b38f5a0d)
-   [async / await](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/31/05/2021/aula/e12827a0-8c67-4293-92aa-d5763020a2f7/bfa1c52e-6502-474f-aecf-1cf718deff88)
-   [try / catch](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/07/06/2021/aula/0304e88c-4ac5-42b8-924e-81216af18f35/f882d693-d529-4fa4-bc19-27464c856582)
-   [Criando transações pagarme](https://plataforma.cubos.academy/curso/61b2921e-a262-4f04-b943-89c4cfb15e5c/data/07/06/2021/aula/0304e88c-4ac5-42b8-924e-81216af18f35/9446fc5e-a71f-49b0-a285-62b306d7a0cd)

**LEMBRE-SE**: é melhor feito do quê perfeito!!!

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
