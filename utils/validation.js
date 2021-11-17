const User = require('../models/user')

exports.checkEmailExists = async function (email) {
  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw Error('Email already exists')
    }
  } catch (err) {
    throw err
  }
}
