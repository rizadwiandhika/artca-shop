const Art = require('../models/art')

const asyncHandler = require('../utils/async-handler')

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
