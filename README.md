##API Node.js com JWT e CRUD de Todos
Descrição

Esta API REST permite:

Registrar e autenticar usuários usando JWT (access + refresh tokens).

Gerenciar tarefas (todos) associadas a cada usuário.

Proteger rotas com autenticação via JWT.

Validar dados de entrada com Joi.

---

##Tecnologias utilizadas

Node.js + Express

MongoDB + Mongoose

JWT para autenticação

bcrypt para hash de senhas

Joi para validação de dados

CORS habilitado (básico)

---

## Funcionalidades

### Autenticação

- **POST /auth/register**  
  Cria usuário com `name`, `email` e `password`. Senha é hasheada.

- **POST /auth/login**  
  Autentica usuário e retorna `{ accessToken, refreshToken, user }`.

- **POST /auth/refresh**  
  Recebe `refreshToken` e retorna novos tokens.

- **GET /me**  
  Retorna dados do usuário autenticado (protegido por middleware JWT).

### CRUD de Todos (SERÁ IMPLEMENTADO NA PRÓXIMA ATUALIZAÇÃO)

- **POST /todos**  
  Cria um novo todo (`title`, `done`) associado ao usuário autenticado.

- **GET /todos**  
  Lista todos os todos do usuário autenticado.

- **GET /todos/:id**  
  Retorna um todo específico do usuário autenticado.

- **PUT /todos/:id**  
  Atualiza `title`, `description` e `done` do todo.

- **DELETE /todos/:id**  
  Deleta um todo do usuário autenticado.

---

## Regras

- Access token expira em ~15 minutos.
- Refresh token expira em 7–30 dias.
- Senhas **nunca** são armazenadas em texto claro (bcrypt).
- Rotas `/me` e `/todos*` são protegidas com middleware de autenticação.
- CORS habilitado para permitir chamadas externas.
- Validação de entrada com Joi.

---

## Estrutura do projeto

<img width="244" height="632" alt="image" src="https://github.com/user-attachments/assets/5288c739-1dbe-4061-957f-624e9b2a91d5" />


---

## Instalação

```
git clone <seu-repositório>
cd <nome-do-projeto>
npm install
```

---

## Configurar as variáveis de ambiente:
```
MONGO_URI=<sua-URI-do-MongoDB>
ACCESS_SECRET=<seu-secret-do-access-token>
REFRESH_SECRET=<seu-secret-do-refresh-token>
```
---

## Executar a aplicação:
```
node src/server.js
```
---
##Testes

Foi usado o Postman.
Segue prints abaixo:

<img width="1751" height="822" alt="register" src="https://github.com/user-attachments/assets/f49d00d2-86ba-4a09-875f-8b4a86632d8a" />

<img width="1743" height="813" alt="login" src="https://github.com/user-attachments/assets/e653566b-6560-480d-87b7-8ea820e7a184" />

<img width="1741" height="732" alt="me" src="https://github.com/user-attachments/assets/5fd91d1b-f76c-4e58-8f66-e373ce767596" />

<img width="1744" height="811" alt="refresh" src="https://github.com/user-attachments/assets/1bfe8660-e307-43b2-ac6e-5df6ab60704b" />

<img width="1742" height="707" alt="todos" src="https://github.com/user-attachments/assets/2b5570fa-4a90-406e-b0ff-67801946f463" />
