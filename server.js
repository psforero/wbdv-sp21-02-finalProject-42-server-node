require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  )
  res.header(
    'Access-Control-Allow-Credentials', 'true'
  )
  next()
})

app.use(express.json())

require('./controllers/users-controller')(app)
require('./controllers/grades-controller')(app)
require('./controllers/checkins-controller')(app)
require('./controllers/spreadsheet-controller')(app)

app.listen(4000, () => console.log('Server started'))
