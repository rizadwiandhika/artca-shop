const express = require('express')

const shopControllers = require('../controllers/shop')
const { shouldLogin } = require('../middleware/auth')

const router = express.Router()

router.get('/product/:id', shopControllers.getArtDetail)
router.get('/checkout/:artId', shouldLogin(true), shopControllers.getCheckout)
router.get('/pembayaran', shouldLogin(true), shopControllers.getPembayaran)
router.get('/home', shopControllers.getIndex)

router.post('/checkout', shouldLogin(true), shopControllers.postCheckout)

module.exports = router
