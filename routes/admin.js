const express = require('express')
const adminControllers = require('../controllers/admin')
const { shouldLogin, allowedRole } = require('../middleware/auth')

const router = express.Router()

// router.use(shouldLogin(true), allowedRole('admin'))

router.get('/bukti/transaksi/:id', adminControllers.getBuktiTransaksi)
router.get('/pesananmasuk', adminControllers.getPesananMasuk)
router.get('/daftartransaksi', adminControllers.getDaftarTransaksi)

router.post('/setuju/transaksi/:id', adminControllers.postSetujuTransaksi)
router.post('/tolak/transaksi/:id', adminControllers.postTolakTransaksi)
router.post('/add-art', adminControllers.postAddArt)

module.exports = router
