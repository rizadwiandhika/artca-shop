const Art = require('../models/art')
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

  res.render('shop/checkout', { art: art })
})

exports.postCheckout = asyncHandler(async (req, res, next) => {
  const { artId, quantity, address } = req.body
  const art = await Art.findByPk(artId)
  const newTransaction = new Trasaction({
    userId: req.session.user.id || 1,
    artId: art.id,
    quantity: quantity,
    totalPrice: quantity * art.price,
    type: 'normal',
    address: address
  })

  art.stock -= quantity

  await newTransaction.save()
  await art.save()

  // res.redirect('/')
  res.json({
    message: 'success',
    art,
    newTransaction
  })
})
