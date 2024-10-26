
#  **API Node.js para CRUD de Usuários e Produtos**

  

Este projeto é uma API RESTful construída com **Node.js** e **Express**, utilizando o **Sequelize ORM** para interagir com bancos de dados MySQL ou SQLite. A API permite operações de CRUD em usuários e produtos, com autenticação JWT e controle de acesso baseado em perfis de usuário.

  

##  **Sumário**

  

- [Recursos Principais](#recursos-principais)

- [Pré-requisitos](#pré-requisitos)

- [Instalação](#instalação)

- [Configuração](#configuração)

- [Executando a Aplicação](#executando-a-aplicação)

- [Endpoints da API](#endpoints-da-api)

- [Autenticação](#autenticação)

- [Produtos](#produtos)

- [Controle de Acesso](#controle-de-acesso)

- [Considerações de Segurança](#considerações-de-segurança)

- [Testando a API](#testando-a-api)

- [Licença](#licença)

- [Contato](#contato)

  

---

  

##  **Recursos Principais**

  

-  **CRUD de Usuários:**

- Campos: `nome`, `email`, `senha`, `perfil`.

-  **CRUD de Produtos:**

- Campos: `nome`, `quantidade`, `preco`.

-  **Autenticação JWT:**

- Autenticação baseada em tokens JWT.

-  **Controle de Acesso Baseado em Perfis:**

-  **listar:** pode listar produtos.

-  **inserir:** pode inserir produtos.

-  **admin:** pode listar, inserir, atualizar e deletar produtos.

-  **Conexão com Banco de Dados Configurável:**

- Suporte a **MySQL** e **SQLite**, configurável via arquivo `.env`.

-  **Criação Automática de Tabelas:**

- As tabelas são criadas automaticamente no banco de dados ao iniciar a aplicação.

  

##  **Pré-requisitos**

  

-  **Node.js** (versão 14 ou superior)

-  **npm** (gerenciador de pacotes do Node.js)

- Banco de dados **MySQL** ou **SQLite**

  

##  **Instalação**

  

1.  **Clone o repositório:**

  

```bash

git clone https://github.com/faustinopsy/auth-node.git

cd auth-node

  

```

## Instale as dependências:

```

npm install

  

```

  

## Configuração

  

1. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

  

# Escolha o banco de dados: 'mysql' ou 'sqlite'

DB_DIALECT=sqlite

  

# Configurações para SQLite

DB_STORAGE=./database.sqlite

  

# Configurações para MySQL (se estiver usando MySQL)

DB_HOST=localhost

DB_PORT=3306

DB_NAME=nome_do_banco

DB_USER=usuario

DB_PASSWORD=senha

  

# Segredo JWT para autenticação

JWT_SECRET=seu_segredo_jwt

  
  

- Nota: Se estiver usando SQLite, apenas DB_DIALECT e DB_STORAGE são necessários.

- Nota: Substitua os valores conforme suas configurações.

Configurações adicionais (opcional):

  

Certifique-se de que o banco de dados MySQL esteja rodando e acessível, se optar por usá-lo.

O arquivo de banco de dados SQLite será criado automaticamente no caminho especificado em DB_STORAGE.

  

## Executando a Aplicação

Inicie o servidor com o seguinte comando:

```

npm start

```

A API estará acessível em http://localhost:3000.

  

## Endpoints da API

Autenticação

Registrar Usuário

URL: /auth/register

  

Método: POST

  

Descrição: Cria um novo usuário.

  

Corpo da Requisição (JSON):

```

{

"nome": "Nome do Usuário",

"email": "usuario@example.com",

"senha": "senha123",

"perfil": "listar" // ou 'inserir' ou 'admin'

}

  

```

Resposta de Sucesso (200):

```

{

"user": {

"id": 1,

"nome": "Nome do Usuário",

"email": "usuario@example.com",

"perfil": "listar",

"updatedAt": "2023-10-25T12:00:00.000Z",

"createdAt": "2023-10-25T12:00:00.000Z"

},

"token": "jwt_token_aqui"

}

  
  

```

Login

URL: /auth/login

  

Método: POST

  

Descrição: Autentica um usuário e retorna um token JWT.

  

Corpo da Requisição (JSON):

```

{

"email": "usuario@example.com",

"senha": "senha123"

}

  

```

Resposta de Sucesso (200):

```

{

"token": "jwt_token_aqui"

}

  

```

  

Produtos

Listar Produtos

URL: /products

  

Método: GET

  

Descrição: Lista todos os produtos.

  

Cabeçalhos:

```

Authorization: Bearer jwt_token_aqui

  

```

Resposta de Sucesso (200):

```

[

{

"id": 1,

"nome": "Produto A",

"quantidade": 10,

"preco": 99.99,

"createdAt": "2023-10-25T12:00:00.000Z",

"updatedAt": "2023-10-25T12:00:00.000Z"

},

{

"id": 2,

"nome": "Produto B",

"quantidade": 5,

"preco": 49.99,

"createdAt": "2023-10-25T12:05:00.000Z",

"updatedAt": "2023-10-25T12:05:00.000Z"

}

]

  

```

  

Inserir Produto

URL: /products

  

Método: POST

  

Descrição: Insere um novo produto.

  

Cabeçalhos:

```

Authorization: Bearer jwt_token_aqui

  

```

Corpo da Requisição (JSON):

```

{

"nome": "Produto C",

"quantidade": 20,

"preco": 29.99

}

  

```

Resposta de Sucesso (200):

  

```

{

"id": 3,

"nome": "Produto C",

"quantidade": 20,

"preco": 29.99,

"createdAt": "2023-10-25T12:10:00.000Z",

"updatedAt": "2023-10-25T12:10:00.000Z"

}

  
  

```

  

Atualizar Produto

URL: /products/:id

  

Método: PUT

  

Descrição: Atualiza um produto existente.

  

Cabeçalhos:

  

```

Authorization: Bearer jwt_token_aqui

  

```

Parâmetros de URL:

  

id - ID do produto a ser atualizado.

Corpo da Requisição (JSON):

```

{

"nome": "Produto C Atualizado",

"quantidade": 25,

"preco": 34.99

}

  

```

Resposta de Sucesso (200):

```

{

"id": 3,

"nome": "Produto C Atualizado",

"quantidade": 25,

"preco": 34.99,

"createdAt": "2023-10-25T12:10:00.000Z",

"updatedAt": "2023-10-25T12:15:00.000Z"

}

  

```

Deletar Produto

URL: /products/:id

  

Método: DELETE

  

Descrição: Deleta um produto existente.

  

Cabeçalhos:

```

Authorization: Bearer jwt_token_aqui

  

```

Parâmetros de URL:

  

id - ID do produto a ser deletado.

Resposta de Sucesso (200):

```

{

"message": "Produto deletado"

}

  

```

  

##  **Controle de Acesso**

  

-  **Perfis de Usuário:**

-  **listar:** Pode listar produtos.

-  **inserir:** Pode inserir produtos.

-  **admin:** Pode listar, inserir, atualizar e deletar produtos.

-  **Regras de Acesso:**

-  **Listar Produtos (`GET /products`):** Permitido para perfis `listar` e `admin`.

-  **Inserir Produto (`POST /products`):** Permitido para perfis `inserir` e `admin`.

-  **Atualizar Produto (`PUT /products/:id`):** Permitido apenas para perfil `admin`.

-  **Deletar Produto (`DELETE /products/:id`):** Permitido apenas para perfil `admin`.

  

##  **Considerações de Segurança**

  

-  **Autenticação JWT:**

- Tokens JWT devem ser enviados no cabeçalho `Authorization` com o prefixo `Bearer`.

- Exemplo: `Authorization: Bearer seu_token_jwt`

-  **Hash de Senhas:**

- As senhas são armazenadas no banco de dados usando o algoritmo `bcrypt`.

-  **Variáveis de Ambiente:**

-  **NUNCA** compartilhe seu segredo JWT (`JWT_SECRET`) ou outras informações sensíveis.

- O arquivo `.env` não deve ser commitado no controle de versão.

-  **Validação de Entrada:**

- Recomenda-se implementar validação nos dados recebidos para evitar injeções ou dados inconsistentes.

-  **Erros e Logs:**

- Erros são retornados com mensagens adequadas.

- Evite expor detalhes de erros internos ao usuário final.

  

##  **Testando a API**

  

Você pode usar ferramentas como **Postman**, **Insomnia** ou **cURL** para testar os endpoints da API.

  

###  **Exemplo de Requisição com cURL**
Login:
```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@example.com", "senha": "senha123"}'
```
Listar Produtos:
```
curl -X GET http://localhost:3000/products \
  -H "Authorization: Bearer seu_token_jwt"

```

## **Licença**

Este projeto é licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.