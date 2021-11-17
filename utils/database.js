const { Sequelize } = require('sequelize')

const DATABASE = 'artca'
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  logging: false
})

module.exports = sequelize
