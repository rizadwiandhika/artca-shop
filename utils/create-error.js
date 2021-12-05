function createError(code = 500, message = 'something went wrong') {
  const error = Error(message)
  error.status = code
  return error
}

module.exports = createError
