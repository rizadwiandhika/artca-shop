const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Discussion = sequelize.define('discussion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  thread: { type: DataTypes.TEXT, allowNull: false }
})

module.exports = Discussion
