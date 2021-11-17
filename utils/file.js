const { access, constants } = require('fs')

async function exists(path) {
  return new Promise((res, _) => {
    access(path, constants.F_OK, (err) => {
      const exist = err ? false : true
      res(exist)
    })
  })
}

module.exports = { exists }
