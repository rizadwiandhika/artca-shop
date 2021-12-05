const fileUtils = require('../utils/file')

const Art = require('../models/art')
const Transaction = require('../models/transaction')

const asyncHandler = require('../utils/async-handler')
const createError = require('../utils/create-error')

exports.getPesananMasuk = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.findAll({
    where: { status: 'pending' }
  })

  res.render('admin/pesananmasuk', {
    transactions
  })
})

exports.getBuktiTransaksi = asyncHandler(async (req, res, next) => {
  const transactionId = req.params.id
  const transaction = await Transaction.findByPk(transactionId)
  if (!transaction || transaction.status !== 'pending') {
    return next(createError(404, 'Transaction not found'))
  }

  const filePath = transaction.paymentProof
  const doesExist = await fileUtils.exists(filePath)
  if (!doesExist) {
    return next(createError(404, 'File not found'))
  }

  res.sendFile(transaction.paymentProof)
})

exports.postSetujuTransaksi = asyncHandler(async (req, res, next) => {
  const transactionId = req.params.id
  const transaction = await Transaction.findByPk(transactionId)

  transaction.status = 'paid'
  await transaction.save()
  res.redirect('/admin/pesananmasuk')
})

exports.postTolakTransaksi = asyncHandler(async (req, res, next) => {
  const transactionId = req.params.id
  const transaction = await Transaction.findByPk(transactionId)

  transaction.status = 'failed'
  await transaction.save()
  res.redirect('/admin/pesananmasuk')
})

exports.postAddArt = asyncHandler(async (req, res, next) => {
  const {
    name,
    imageUrl,
    description,
    weight,
    technique,
    price,
    status,
    estimatedCompletion,
    stock
  } = req.body

  const art = await Art.create({
    name,
    imageUrl,
    description,
    weight,
    technique,
    price,
    status,
    estimatedCompletion,
    stock,
    userId: req.user.id
  })

  res.redirect(`/art/${art.id}`)
})
