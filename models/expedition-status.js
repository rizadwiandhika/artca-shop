const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const ExpeditionStatus = sequelize.define('expeditionStatus', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
})

module.exports = ExpeditionStatus
