const express = require('express')
const { body } = require('express-validator')

const authControllers = require('../controllers/auth')
const { shouldLogin } = require('../middleware/auth')
const { checkEmailExists } = require('../utils/validation')

const router = express.Router()

router.get('/login', shouldLogin(false), authControllers.getLogin)
router.get('/register', shouldLogin(false), authControllers.getRegister)
router.get(
  '/forgot-password',
  shouldLogin(false),
  authControllers.getForgotPassword
)

router.post('/login', authControllers.postLogin)
router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email address.')
      .custom(checkEmailExists)
  ],
  authControllers.postRegister
)
router.post('/logout', authControllers.postLogout)

module.exports = router
