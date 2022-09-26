# <p align = "center"> Projeto Sing me a Song - Tests </p>

<p align="center">
   <img src="https://miro.medium.com/max/1400/1*PoH0pTYeT1zmX06Ehbq1UA.jpeg"/>
   <img src="https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/113/000/original/logo_landscape_(1).png?1643756332"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Januacele Vieira-4dae71?style=flat-square" />
   <img src="https://img.shields.io/badge/language-Typescript-4dae71?style=flat-square" />
</p>

##  :clipboard: Descrição
  O projeto Sing me a Song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas.
  A intenção desse projeto foi realizar os testes unitários utilizando a biblioteca jest, testes de integração por meio do supertest e testes ponta a ponta ou end-to-end (2e2) utilizando o cypress.
  Foi implementada duas rotas ao projeto, a rota post ("/resetDB") para limpar o banco de dados e a rota post ("/topList") para inserir recomendações de teste ao banco. As demais informações sobre como baixar o projeto e rodas os testes serão descritas a seguir.

***
## :computer:	 Tecnologias e Conceitos

- Node.js
- TypeScript
- SQL database with Prisma
- SuperTest
- Jest
- Cypress

***
## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [node js](https://nodejs.org/pt-br/docs/) e [creat react app] (https://developer.mozilla.org/pt-BR/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started) então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/Januacele/sing-me-a-song-tests.git
```

Dentro da pasta back-end, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Dentro da pasta front-end, rode o seguinte comando para instalar as dependencias.
```
npm install
```

## 🏁 Variáveis de ambiente


Para rodar ese projeto você precisa configurar as variáveis de ambiente no seu arquivo .env:


Crie na pasta raiz do back-end um arquivo .env e configure as seguintes variáveis de ambiente:

```
  PORT=5000
  DATABASE_URL=postgres://<user>:<password>@localhost:5432/<project-name>
  NODE_ENV=development
```


Agora crie um arquivo .env.test, para configurar um ambiente específico para rodar todas as implementações dos testes:

```
  PORT=5000
  DATABASE_URL= postgres://<user>:<password>@localhost:5432/<project-name-test>
  NODE_ENV=test
```

Na raiz do diretorio do front-end, crie um aquivo .env com a seguinte configuração:

```
  REACT_APP_API_BASE_URL=http://localhost:5000
```


## 🏁 Rodando os testes


Para rodar os testes unitários e de integração, use o seguinte comando dentro da pasta back-end:

```
  npm run test
```

Para rodar apenas o teste unitário, use o seguinte comando dentro da pasta back-end:

```
   npm run test:unit
```

Para rodar apenas o teste de integração, use o seguinte comando dentro da pasta back-end:

```
  npm run test:integration
```

Para rodar o teste de ponta a ponta (e2e), use o seguinte comando dentro da pasta front-end:

```
  npx cypress open
```

Para inicializar a aplicação no browser, rode o seguinte comando dentro da pasta front-end:

```
  npm start
```

Então, selecione o broswer apropriado e inspecione a aplicação.

