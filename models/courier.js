const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Courier = sequelize.define('courier', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Courier
