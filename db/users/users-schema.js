const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  type: {
    type: String, enum: ['STUDENT', 'STAFF', 'ADMIN'],
    require: true
  },
  advisor: {
    type: String
  },
  email: {
    type: String
  }
}, { collection: 'users' })

module.exports = usersSchema