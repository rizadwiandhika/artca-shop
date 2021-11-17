const Art = require('../models/art')
const Trasaction = require('../models/transaction')

const asyncHandler = require('../utils/async-handler')
const createError = require('../utils/create-error')

exports.getIndex = asyncHandler(async (req, res, next) => {
  // const products = await Art.findAndCountAll({ where: { or: [] } })
  res.render('shop/home')
})

exports.getArtDetail = asyncHandler(async (req, res, next) => {
  res.render('shop/product')
})

exports.getCheckout = asyncHandler(async (req, res, next) => {
  const artId = req.params.artId
  const art = await Art.findByPk(artId)

  // if (!art) {
  //   throw createError(404, 'Art not found')
  // }

  // if (art.stock < 1) {
  //   throw createError(422, 'Product is out of stock')
  // }

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
