function createError(code = 500, message = 'something went wrong') {
  const error = Error(message)
  error.code = code
  return error
}

module.exports = createError
