const express = require('express')
const path = require('path')
const multer = require('multer')

const { WORKDIR } = require('../utils/path')

const shopControllers = require('../controllers/shop')
const { shouldLogin } = require('../middleware/auth')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(WORKDIR, 'bukti'))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniquePrefix + '-' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  const error = null
  const accFiles = ['image/png', 'image/jpeg', 'image/jpg']
  const isAcceptable = accFiles.includes(file.mimetype)

  // Kalo arg kedua true => file diterima
  cb(error, isAcceptable)
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

router.get('/product/:id', shopControllers.getArtDetail)
router.get('/checkout/:artId', shouldLogin(true), shopControllers.getCheckout)
router.get(
  '/list-transaksi',
  shouldLogin(true),
  shopControllers.getListTransaksi
)
router.get('/pembayaran', shouldLogin(true), shopControllers.getPembayaran)
router.get('/home', shopControllers.getIndex)

router.post('/checkout', shouldLogin(true), shopControllers.postCheckout)
router.post(
  '/pembayaran',
  shouldLogin(true),
  upload.single('bukti-pembayaran'),
  shopControllers.postPembayaran
)

module.exports = router
