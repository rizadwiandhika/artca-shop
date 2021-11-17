const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const TransactionDetail = sequelize.define('transactionDetail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  transactionId: { type: DataTypes.INTEGER, unique: 'my_composite_unique' },
  artId: { type: DataTypes.INTEGER, unique: 'my_composite_unique' },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DOUBLE, allowNull: false }
})

module.exports = TransactionDetail
