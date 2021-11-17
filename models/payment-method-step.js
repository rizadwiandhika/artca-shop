const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const PaymentMethodStep = sequelize.define('paymentMethodStep', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  paymentMethodId: { type: DataTypes.INTEGER, unique: 'my_composite_unique' },
  step: {
    type: DataTypes.INTEGER,
    unique: 'my_composite_unique',
    allowNull: false
  },
  description: { type: DataTypes.STRING, defaultValue: '' }
})

module.exports = PaymentMethodStep
