const express = require('express')
const adminControllers = require('../controllers/admin')
const { shouldLogin, allowedRole } = require('../middleware/auth')

const router = express.Router()

router.use(shouldLogin(true), allowedRole('admin'))

router.post('/add-art', adminControllers.postAddArt)

module.exports = router
