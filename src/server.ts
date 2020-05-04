import express = require('express');
import graphqlHTTP = require('express-graphql');
import graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: (): string => 'Hello world!'
};

const app: express.Application = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));