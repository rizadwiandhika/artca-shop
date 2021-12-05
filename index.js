const fs = require('fs')
const path = require('path')

require('dotenv').config()
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const adminRouters = require('./routes/admin')
const shopRouters = require('./routes/shop')
const authRouters = require('./routes/auth')

const sequelize = require('./utils/database')
const populateDB = require('./utils/populate-db')
const fileUtils = require('./utils/file')
const { WORKDIR } = require('./utils/path')

const { initializeRelation } = require('./models')

const PORT = process.env.PORT || 8080
const SESSION_SECRET = process.env.SESSION_SECRET

const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

if (SESSION_SECRET) {
  const sessionConfig = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
  }
  app.use(session(sessionConfig))
  app.use(flash())
}

/* START OF - HTML EXPERIMENT ZONE */
app.get('/shop/profile', (req, res) => {
  const PATH_TO_EJS_FILE = 'shop/profile' // refer to "views/shop/home.ejs" file
  res.render(PATH_TO_EJS_FILE)
})

app.get('/admin/daftarproduct', (req, res) => {
  const PATH_TO_EJS_FILE = 'admin/daftarproduct' // refer to "views/admin/daftarproduct.ejs" file
  res.render(PATH_TO_EJS_FILE)
})

app.get('/admin/daftartransaksi', (req, res) => {
  const PATH_TO_EJS_FILE = 'admin/daftartransaksi' // refer to "views/admin/daftartransaksi.ejs" file
  res.render(PATH_TO_EJS_FILE)
})

app.get('/admin/pesananmasuk', (req, res) => {
  const PATH_TO_EJS_FILE = 'admin/pesananmasuk' // refer to "views/admin/pesananmasuk.ejs" file
  res.render(PATH_TO_EJS_FILE)
})

/* END OF - HTML EXPERIMENT ZONE */

app.use((req, res, next) => {
  console.log(
    'is auth',
    req.session?.user?.email,
    'requested endpoint',
    req.method,
    req.url
  )
  res.locals.isAuth = req.session?.user
  next()
})

app.use('/admin', adminRouters)
app.use('/auth', authRouters)
app.use('/shop', shopRouters)

app.get('/', (_, res) => {
  res.redirect('/shop/home')
})
app.get('/shop/home-login', (_, res) => {
  res.redirect('/shop/home')
})

app.use((req, res, _next) => {
  console.log('unknown path', req.method, req.url)
  res.render('error/404')
})

app.use(async (err, _req, res, _next) => {
  console.log('error middleware', err)
  const filepath = path.join(__dirname, 'views', 'error', err.code + '.ejs')
  const doesFileExists = await fileUtils.exists(filepath)

  if (err.code && doesFileExists) {
    return res.render(`error/${err.code}`, err.payload)
  }

  return res.render('error/500')
})

initializeRelation()

const buktiDirectory = path.join(WORKDIR, 'bukti')
if (!fs.existsSync(buktiDirectory)) {
  fs.mkdirSync(buktiDirectory)
}

async function startServer() {
  try {
    // Connect to database if username and password are set
    if (process.env.USERNAME && process.env.PASSWORD) {
      console.log('Conntecting to database...')
      await sequelize.authenticate()
      console.log('Connected to database! Waiting port setup...')
      await sequelize.sync({ force: true })
      // await sequelize.sync()
      await populateDB()
    }

    app.listen(PORT, () => console.log('listening on port', PORT))
  } catch (error) {
    console.error('Unable to setup server:', error)
  }
}
startServer()
