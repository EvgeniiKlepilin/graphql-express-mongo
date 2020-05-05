import express = require('express');
import graphqlHTTP = require('express-graphql');
import mongodb = require('mongodb');

import config from './config';
import schema from './api';

import UserService from './services/UserService';

const app: express.Application = express();

const { MongoClient } = mongodb;

const mongoUrl = `mongodb://${config.db.username}:${config.db.password}@${config.db.hostname}:${config.db.port}/`;

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to MongoDB at ${mongoUrl}`);
    const db = client.db(process.env.DATABASE_NAME);
    const userCollection = db.collection('users');

    const userService = new UserService(userCollection);
    
    const root = {
      user: userService.getUser,
      users: userService.getUsers,
      updateUser: userService.updateUser,
      createUser: userService.createUser,
      deleteUser: userService.deleteUser
    };

    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));
  })
  .catch(error => console.error(error))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));