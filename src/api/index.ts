import graphql = require('graphql');

const { buildSchema } = graphql;

export default buildSchema(`
  type Query {
    user(id: Int!): User
    users(hobby: String): [User]
  },
  type User {
    id: Int
    name: String
    age: Int
    hobby: String
  }
  type Mutation {
    updateUser(id: Int!, name: String!, age: Int, hobby: String): User
    createUser(name: String!, age: Int, hobby: String): User
    deleteUser(id: Int!): [User]
  }
`);