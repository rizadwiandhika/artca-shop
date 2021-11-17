// const express = require('express')

const errorControllers = require('../controllers/error')

// Kayaknya kalo error middleware itu ngga bisa pake router
// const router = express.Router()

// router.use(errorControllers.unknownPath)
// router.use(errorControllers.errorMiddleware)
const router = []

router.push(errorControllers.unknownPath)
router.push(errorControllers.errorMiddleware)

module.exports = router
