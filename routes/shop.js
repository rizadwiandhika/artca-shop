const express = require('express')

const shopControllers = require('../controllers/shop')
const { shouldLogin } = require('../middleware/auth')

const router = express.Router()

router.get('/art/:id', shopControllers.getArtDetail)
router.get('/checkout/:artId', shouldLogin(true), shopControllers.getCheckout)
// router.get('/checkout/:artId', shopControllers.getCheckout)
router.post('/checkout', shouldLogin(true), shopControllers.postCheckout)
router.get('/home', shopControllers.getIndex)

module.exports = router
