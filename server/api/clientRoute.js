const express = require('express')
const Sequelize = require('sequelize')
const clientRouter = express.Router()
const moment = require('moment')
const dbConfig = require("../config/config");



const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  console.log(sequelize)

try {
 sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// clientRouter.get('/', async function (req, res) {
//     const users = await sequelize
//         .query(`SELECT * FROM Users`)
//     res.send(users[0])
// }
// )





  module.exports = clientRouter
