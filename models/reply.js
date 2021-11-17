const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Reply = sequelize.define('reply', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  comment: { type: DataTypes.TEXT, allowNull: false }
})

module.exports = Reply
