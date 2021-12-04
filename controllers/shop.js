const Art = require('../models/art')
const Transaction = require('../models/transaction')
const Trasaction = require('../models/transaction')

const asyncHandler = require('../utils/async-handler')
const createError = require('../utils/create-error')

exports.getIndex = asyncHandler(async (req, res, next) => {
  const arts = await Art.findAll()
  res.render('shop/home', { arts })
})

exports.getArtDetail = asyncHandler(async (req, res, next) => {
  const art = await Art.findByPk(req.params.id)
  console.log('art:', art)
  if (!art) {
    return next(createError(404, 'Art not found'))
  }
  res.render('shop/product', { art })
})

exports.getCheckout = asyncHandler(async (req, res, next) => {
  const artId = req.params.artId
  const art = await Art.findByPk(artId)

  res.render('shop/checkout', { art: art, user: req.session.user })
})

exports.getPembayaran = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id

  const trasactions = await Transaction.findAll({
    where: { userId: userId, status: 'unpaid' },
    include: [{ model: Art }]
  })

  res.render('shop/pembayaran', { trasactions })
})

exports.postCheckout = asyncHandler(async (req, res, next) => {
  const { totalPrice, productId } = req.body
  const art = await Art.findByPk(productId)

  const newTransaction = new Trasaction({
    userId: req.session.user.id,
    artId: art.id,
    type: 'normal',
    totalPrice: totalPrice,
    address: req.session.user.address
  })

  art.stock -= 1

  await Promise.all([newTransaction.save(), art.save()])
  res.redirect('/shop/pembayaran')
})
