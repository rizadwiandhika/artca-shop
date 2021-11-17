const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Art = require('../models/art')

async function populateDB() {
  await populateUsers()
}

async function populateUsers() {
  await User.findOrCreate({
    where: { email: 'riza@mail.com' },
    defaults: {
      name: 'Riza Dwi Andhika',
      email: 'riza@mail.com',
      password: await bcrypt.hash('riza123', 12),
      address: 'Jalan Ahmad Dahlan',
      role: 'admin'
    }
  })

  await User.findOrCreate({
    where: { email: 'jamie@mail.com' },
    defaults: {
      name: 'Jamie Saviola',
      email: 'jamie@mail.com',
      password: await bcrypt.hash('jamie123', 12),
      address: 'Jalan Kebayoran',
      role: 'user'
    }
  })

  const riza = await User.findOne({ where: { email: 'riza@mail.com' } })
  const jamie = await User.findOne({ where: { email: 'jamie@mail.com' } })

  if ((await Art.findOne({ where: { name: 'monalisa' } })) === null) {
    await riza.createArt({
      name: 'monalisa',
      weight: 1,
      price: 100000,
      status: 'available',
      stock: 10
    })
  }

  if ((await Art.findOne({ where: { name: 'abstract' } })) === null) {
    await riza.createArt({
      name: 'abstract',
      weight: 1.5,
      price: 12200,
      status: 'available',
      stock: 10
    })
  }

  if ((await Art.findOne({ where: { name: 'asalole' } })) === null) {
    await riza.createArt({
      name: 'asalole',
      weight: 2,
      price: 899122,
      status: 'available',
      stock: 10
    })
  }
}

module.exports = populateDB

/* 
console.log(
    'USER riza ARTS',
    (await riza.getArts()).map((art) => art.dataValues)
  )
  console.log()
  console.log(
    'USER jamie ARTS',
    (await jamie.getArts()).map((art) => art.dataValues)
  )
  console.log()
  console.log(
    'ARTS',
    (await Art.findAll()).map((art) => art.dataValues)
  )
*/
