const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Art = sequelize.define('art', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  weight: { type: DataTypes.DOUBLE, allowNull: false },
  technique: { type: DataTypes.STRING },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  estimatedCompletion: { type: DataTypes.INTEGER },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
})

module.exports = Art
