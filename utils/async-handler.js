module.exports = function asyncHandler(middleware) {
  return async function (req, res, next) {
    try {
      await middleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
