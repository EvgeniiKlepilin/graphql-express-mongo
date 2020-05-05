import mongodb = require('mongodb');

import { User } from '../types';

export default class UserService {

  private userCollection: mongodb.Collection<User>;

  constructor(userCollection) {
    this.userCollection = userCollection;
  }

  getUser = (args: { id: number }): Promise<void | User> => {
    return this.userCollection.findOne(args)
      .then(result => result)
      .catch(error => console.error(error));
  }

  getUsers = (args?: { hobby?: string }): Promise<void | User[]> => {
    return args && args.hobby ? this.userCollection.find(args).toArray()
      .then(result => result)
      .catch(error => console.error(error))
      : this.userCollection.find().toArray();
  }

  updateUser = (userData: User): Promise<void | User> => {
    return this.userCollection.findOneAndUpdate(
      { id: userData.id },
      {
        $set: {
          name: userData.name,
          age: userData.age,
          hobby: userData.hobby,
        }
      },
      { upsert: true }
    )
      .then(result => this.getUser(userData))
      .catch(error => console.error(error));
  }

  createUser = (userData: User): Promise<void | User> => {
    return this.userCollection.find().sort({id:-1}).limit(1).toArray()
      .then(result => {
        userData.id = result[0].id + 1;
        return this.userCollection.insertOne(userData)
          .then(result => this.getUser(userData))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }

  deleteUser = (args: { id: number }): Promise<void | User[]> => {
    return this.userCollection.deleteOne(args)
      .then(result => this.getUsers())
      .catch(error => console.error(error));
  }
}