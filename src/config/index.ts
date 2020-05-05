import dotenv = require('dotenv');

dotenv.config();

export default {
  db: {
    port: process.env.MONGO_DB_PORT,
    hostname: process.env.MONGO_DB_HOST,
    username: process.env.MONGO_DB_ROOT_USERNAME,
    password: process.env.MONGO_DB_ROOT_PASSWORD,
  }
}