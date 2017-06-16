import Sequelize from 'sequelize';
require('dotenv').config();

let db = new Sequelize(
  process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    dialect: process.env.DIALECT
  }
);

export default db;