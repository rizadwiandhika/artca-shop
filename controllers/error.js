const path = require('path')
const fileUtils = require('../utils/file')

exports.unknownPath = (req, res, _next) => {
  console.log('unknown path', req.url)
  res.render('error/404')
}

exports.errorMiddleware = async (err, _req, res, _next) => {
  const filepath = path.join(__dirname, 'views', 'error', err.code + '.ejs')
  let doesExists

  try {
    doesExists = await fileUtils.exists(filepath)
  } catch (error) {
    console.log('fileUtils.exists error', error)
    doesExists = false
  }

  console.error('error middleware', err)

  if (err.code && doesExists) {
    return res.render(`error/${err.code}`, err.payload)
  }

  return res.render('error/500')
}

/* 

app.use('/', (_req, res) => {
  res.render('error/404')
})

app.use(async (err, _req, res, _next) => {
  const filepath = path.join(__dirname, 'views', 'error', err.code + '.ejs')
  const fileExists = await fileUtils.exists(filepath)

  console.error('error middleware', err)

  if (err.code && fileExists) {
    return res.render(`error/${err.code}`)
  }

  return res.render('error/500')
})

*/
