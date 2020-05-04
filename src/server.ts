import express = require('express');
import graphqlHTTP = require('express-graphql');
import graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
  type Mutation {
    updateUser(id: Int!, name: String!, age: String): Person
  }
`);

interface User {
  id: number;
  name: string;
  age: number;
  shark?: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'Brian',
    age: 21,
    shark: 'Great White Shark'
  },
  {
    id: 2,
    name: 'Kim',
    age: 22,
    shark: 'Whale Shark'
  },
  {
    id: 3,
    name: 'Faith',
    age: 23,
    shark: 'Hammerhead Shark'
  },
  {
    id: 4,
    name: 'Joseph',
    age: 23,
    shark: 'Tiger Shark'
  },
  {
    id: 5,
    name: 'Joy',
    age: 25,
    shark: 'Hammerhead Shark'
  }
];

const getUser = (args: { id: number }): User => {
  return users.filter(user => user.id == args.id)[0];
}

const getUsers = (args: { shark?: string }): User[] => {
  return args.shark ? users.filter(user => user.shark === args.shark) : users;
}

const updateUser = (userData: User): User => {
  users.map(user => {
    if (user.id === userData.id) {
      user.name = userData.name;
      user.age = userData.age;
      return user;
    }
  });
  return users.filter(user => user.id === userData.id)[0];
}

const root = {
  user: getUser,
  users: getUsers,
  updateUser
};

const app: express.Application = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));