require('dotenv').config();
const { Sequelize } = require('sequelize');

const options = {
    dialect: process.env.DB_DIALECT,
    logging: false,
  };
  
  if (process.env.DB_DIALECT === 'sqlite') {
    options.storage = process.env.DB_STORAGE || './database.sqlite';
  } else {
    options.host = process.env.DB_HOST;
    options.port = process.env.DB_PORT;
    options.username = process.env.DB_USER;
    options.password = process.env.DB_PASSWORD;
    options.database = process.env.DB_NAME;
  }
  
  const sequelize = new Sequelize(options);

module.exports = sequelize;
