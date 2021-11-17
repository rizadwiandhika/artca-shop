exports.shouldLogin = function (shouldHaveLogin, red = '') {
  return function (req, res, next) {
    const isLoggedIn = req.session.user

    if ((shouldHaveLogin && isLoggedIn) || (!shouldHaveLogin && !isLoggedIn)) {
      return next()
    }

    const redirect = isLoggedIn ? '/' : '/login'
    res.redirect(redirect)
  }
}

exports.allowedRole = function (...roles) {
  return function (req, _res, next) {
    const authorized = roles.includes(req.session.user.role)
    if (authorized) return next()

    const error = Error('Unauthorized!')
    error.status = 401
    error.payload = { message: 'Unauthorized!' }
    throw error
  }
}
