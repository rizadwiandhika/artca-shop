const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Transaction = sequelize.define('transaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  totalPrice: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
  address: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' }
})

module.exports = Transaction
