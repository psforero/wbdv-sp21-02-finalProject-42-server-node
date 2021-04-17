const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
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
  advisorId: {
    type: String
  }
}, { collection: 'users' })

module.exports = usersSchema