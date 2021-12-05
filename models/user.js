const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
  age: { type: DataTypes.INTEGER },
  address: { type: DataTypes.TEXT },
  dob: { type: DataTypes.DATE },
  sex: { type: DataTypes.STRING }
})

module.exports = User
