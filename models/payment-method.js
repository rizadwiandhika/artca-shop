const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const PaymentMethod = sequelize.define('paymentMethod', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
})

module.exports = PaymentMethod
