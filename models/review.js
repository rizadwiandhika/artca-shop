const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Review = sequelize.define('review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  transactionDetailId: { type: DataTypes.INTEGER, unique: true },
  star: { type: DataTypes.INTEGER },
  review: { type: DataTypes.TEXT }
})

module.exports = Review
