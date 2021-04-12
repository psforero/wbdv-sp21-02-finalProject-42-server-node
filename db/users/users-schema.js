const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
    type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN']
  },
  advisor: {
    type: String,
  },
}, { collection: 'users' })

module.exports = usersSchema