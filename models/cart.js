const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER }
})

module.exports = Cart
