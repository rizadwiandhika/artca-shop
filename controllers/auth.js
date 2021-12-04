const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../models/user')

const asyncHandler = require('../utils/async-handler')

exports.getLogin = asyncHandler(async (req, res) => {
  const [loginError] = req.flash('loginError')
  res.render('auth/login', { loginError })
})
exports.getRegister = asyncHandler(async (req, res) => {
  const [registerError] = req.flash('registerError')
  res.render('auth/register', { registerError })
})
exports.getForgotPassword = asyncHandler(async (req, res, next) => {
  res.render('auth/pass-recovery')
})

exports.postLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    req.flash('loginError', 'wrong username or password')
    return req.session.save((err) => {
      res.redirect('/auth/login')
    })
  }

  try {
    const hashedPassword = user.dataValues.password
    const doesMatch = await bcrypt.compare(password, hashedPassword)
    if (doesMatch === false) {
      throw Error('Wrong email or password')
    }
  } catch (error) {
    console.error('bcrypt error', error)

    let message = 'Something went wrong. Please try again...'
    if (error.message === 'Wrong email or password') {
      message = error.message
    }

    req.flash('loginError', message)
    return req.session.save((err) => {
      res.redirect('/auth/login')
    })
  }

  req.session.user = user.dataValues
  req.session.save((err) => {
    res.redirect('/shop/home')
  })
})
exports.postRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .reduce((acc, curr) => (acc += curr.msg + '. '), '')

    req.flash('registerError', errorMessages)

    return req.session.save((err) => {
      res.redirect('/auth/register')
    })
  }

  const COST = 12
  const hashedPassword = await bcrypt.hash(password, COST)

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role: 'user'
  }

  const result = await User.create(newUser)
  console.log('new user created', result.dataValues)

  res.redirect('/auth/login')
})
exports.postLogout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/')
  })
})
