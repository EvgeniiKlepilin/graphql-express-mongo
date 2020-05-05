# graphql-express-mongo

This project showcases a Node.js server with MongoDB implementing GraphQL API written in Typescript. Project is made with consideration for best practices in architecture, project setup, dev tool usage, convenience, and simplicity.

## Local setup

Clone the project and locate to the folder of the project.

```bash
git clone https://github.com/EvgeniiKlepilin/graphql-express-mongo.git && cd graphql-express-mongo
```

### Installation

First, make sure that your environment is setup. Copy `.env-example` file and create `.env`. If you do not need a custom setup, you can use provided values as they will work.

```bash
cp .env-example .env
```

Decide on whether you are going to be using your own DB setup or use existing `docker-compose` setup. To setup `docker-compose`, copy `docker-compose-example.yml` to `docker-compose.yml`:

```bash
cd docker-compose-example.yml docker-compose.yml
```

Install all of the NPM modules:

```bash
npm install
```

### Launch

Start your database up or bring `docker-compose` up. If you do not want to see the log of the active containers, run `docker-compose up -d`:

```bash
docker-compose up
```

Current Docker setup has two images: `mongo` and `mongo-express`. If you need GUI to interact with database, proceed to http://localhost:8081 after `docker-compose` finished the setup.

Finally, start up the server:

```bash
npm run watch:dev
```

Once the command finishes execution, you should see that your server is available at http://localhost:4000/graphql. You should be able to see GraphiQL interface to interact with the API.

## Fixtures

If you need entries for testing, you can run fixtures script:

```bash
npm run fixtures
```

In case you need to clear DB from fixtures (ex. after running a test), run following:

```bash
npm run fixtures-unload
```

## Available Queries and Mutations

```graphql
query getUser($userID: Int!) {
  user(id: $userID) {
    ...userFields
  }
}

query getUsers($hobby: String) {
  users(hobby: $hobby) {
    ...userFields
  }
}

mutation updateUser($id: Int!, $name: String!, $age: Int) {
  updateUser(id: $id, name:$name, age: $age){
    ...userFields
  }
}

mutation createUser($name: String!, $age: Int, $hobby: String) {
  createUser(name:$name, age: $age, hobby: $hobby){
    ...userFields
  }
}

mutation deleteUser($id: Int!) {
  deleteUser(id: $id){
    ...userFields
  }
}

fragment userFields on User {
  name
  age
  hobby
}

```

## Available NPM Scripts

```json
{
  ...
  "scripts": {
    "server": "node built/server.js",
    "test": "jest",
    "tsc": "tsc",
    "clean": "rimraf built",
    "build": "npm-run-all clean tsc",
    "lint": "eslint . --ext .ts",
    "fixtures": "npm-run-all fixtures-unload fixtures-load",
    "fixtures-load": "dotenv -- cross-var \"node node_modules/.bin/mongodb-fixtures load -u mongodb://%MONGO_DB_ROOT_USERNAME%:%MONGO_DB_ROOT_PASSWORD%@%MONGO_DB_HOST%:%MONGO_DB_PORT%/ -d %DATABASE_NAME% --path ./src/fixtures -b\"",
    "fixtures-unload": "dotenv -- cross-var \"node node_modules/.bin/mongodb-fixtures unload -u mongodb://%MONGO_DB_ROOT_USERNAME%:%MONGO_DB_ROOT_PASSWORD%@%MONGO_DB_HOST%:%MONGO_DB_PORT%/ -d %DATABASE_NAME% --path ./src/fixtures -b\"",
    "dev": "NODE_ENV=development npm-run-all build server",
    "prod": "NODE_ENV=production npm-run-all build server",
    "watch:dev": "nodemon -e ts,js"
  },
  ...
}
```

- "server": Run transpiled server file
- "test": Run jest for available tests
- "tsc": Transpile TS code into TS. `tsconfig.json` specifies provided configuration
- "clean": Remove `built` folder and all its contents using `rimraf`
- "build": Run "clean" and "tsc"
- "lint": Lint the code using `eslint`
- "fixtures": Run "fixtures-unload" and "fixtures-load"
- "fixtures-load": Load fixtures provided in `src/fixtures` into MongoDB. Environment variables are provided from `.env` file via `dotenv` and `cross-var`
- "fixtures-unload": Unload fixtures provided in `src/fixtures` from MongoDB. Environment variables are provided from `.env` file via `dotenv` and `cross-var`
- "dev": Run "build" and "server" with `NODE_ENV` set to `development`
- "prod": Run "build" and "server" with `NODE_ENV` set to `production`
- "watch:dev": Start `nodemon` with specified extensions (`ts,js`)