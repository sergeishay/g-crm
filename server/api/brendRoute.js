const express = require('express')
const Sequelize = require('sequelize')
const brendRouter = express.Router()
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


  module.exports = brendRouter
  