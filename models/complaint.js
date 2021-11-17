const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Complaint = sequelize.define('complaint', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  transactionDetailId: { type: DataTypes.INTEGER, unique: true },
  complain: { type: DataTypes.TEXT, allowNull: false }
})

module.exports = Complaint
