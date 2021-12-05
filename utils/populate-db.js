const path = require('path')

const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Art = require('../models/art')

// const { WORKDIR } = require('../utils/path')

const p1 = {
  name: 'Lukisan Motif Bata',
  imageUrl: path.join('img', 'product01.png'),
  description: 'Lukisan yang sangat menarik untuk dimiliki oleh kamu',
  weight: 1000,
  technique: 'Plakat',
  theme: 'Kesepian',
  price: 600000,
  rating: 4,
  status: 'ready',
  stock: 123
}

const p2 = {
  name: 'Lukisan Taman Malam',
  imageUrl: path.join('img', 'product02.png'),
  description: 'Lukisan bagus untuk dimiliki di rumah',
  weight: 1250,
  technique: 'Plakat',
  theme: 'Kesepian',
  price: 6250000,
  rating: 4,
  status: 'ready',
  stock: 123
}

const p3 = {
  name: 'Lukisan Kota Tua',
  imageUrl: path.join('img', 'product03.png'),
  description: 'Lukisan seru banget buat dipajang',
  weight: 1000,
  technique: 'Plakat',
  theme: 'Pemandangan',
  price: 750000,
  rating: 5,
  status: 'ready',
  stock: 123
}

const p4 = {
  name: 'Lukisan Rumah Seni',
  imageUrl: path.join('img', 'product04.png'),
  description: 'Lukisan bernuansa desa yang sangat menarik',
  weight: 1212,
  technique: 'Plakat',
  theme: 'Pemandangan',
  price: 800000,
  rating: 5,
  status: 'ready',
  stock: 123
}

const p5 = {
  name: 'Lukisan Ikan Akuarium',
  imageUrl: path.join('img', 'product05.png'),
  description: 'Lukisan yang menggambarkan sebuah ikan di dalam air',
  weight: 950,
  technique: 'Plakat',
  theme: 'Alam',
  price: 900000,
  rating: 5,
  status: 'ready',
  stock: 123
}

const p6 = {
  name: 'Lukisan Abstrak',
  imageUrl: path.join('img', 'product06.png'),
  description: 'Lukisan keren yang sangat amat menarik',
  weight: 1010,
  technique: 'Plakat',
  theme: 'Abstrak',
  price: 300000,
  rating: 3,
  status: 'ready',
  stock: 123
}

const p7 = {
  name: 'Lukisan Orang Kebingungan',
  imageUrl: path.join('img', 'product07.png'),
  description: 'Lukisan ilustrasi kebingungan yang sangat menarik',
  weight: 1000,
  technique: 'Kesepian',
  theme: 'Ke',
  price: 990000,
  rating: 5,
  status: 'ready',
  stock: 123
}

const p8 = {
  name: 'Lukisan Gunung Merapi',
  imageUrl: path.join('img', 'product08.png'),
  description: 'Lukisan seru banget buat dipajang',
  weight: 1500,
  technique: 'Plakat',
  theme: 'Pemandangan',
  price: 850000,
  rating: 5,
  status: 'ready',
  stock: 123
}

const p9 = {
  name: 'The Starry Night',
  imageUrl: path.join('img', 'product09.png'),
  description:
    'The Starry Night is an oil-on-canvas painting by the Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village',
  weight: 1700,
  technique: 'Plakat',
  theme: 'Pemandangan',
  price: 999000,
  rating: 5,
  status: 'ready',
  stock: 123
}

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

  if (!(await Art.findOne({ where: { id: 1 } }))) {
    await riza.createArt(p1)
  }
  if (!(await Art.findOne({ where: { id: 2 } }))) {
    await riza.createArt(p2)
  }
  if (!(await Art.findOne({ where: { id: 3 } }))) {
    await riza.createArt(p3)
  }
  if (!(await Art.findOne({ where: { id: 4 } }))) {
    await riza.createArt(p4)
  }
  if (!(await Art.findOne({ where: { id: 5 } }))) {
    await riza.createArt(p5)
  }
  if (!(await Art.findOne({ where: { id: 6 } }))) {
    await riza.createArt(p6)
  }
  if (!(await Art.findOne({ where: { id: 7 } }))) {
    await riza.createArt(p7)
  }
  if (!(await Art.findOne({ where: { id: 8 } }))) {
    await riza.createArt(p8)
  }
  if (!(await Art.findOne({ where: { id: 9 } }))) {
    await riza.createArt(p9)
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
