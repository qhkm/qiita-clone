/** @format */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// Load env file
require('dotenv').config()

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// DB Config
// const db = require('./config/keys').mongoURI

// Connect to MongoDB
console.log(process.env.MONGO_URI)
mongoose
  .connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true},
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error(err)
    return
  })

// Passport middleware
app.use(passport.initialize())
// app.use(passport.session())

// Passport Config
require('./config/passport')(passport)

const allowCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
}

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
