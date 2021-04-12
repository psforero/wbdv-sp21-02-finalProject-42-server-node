const usersSchema = require('./users-schema')
const mongoose = require('mongoose')
const usersModel = mongoose
  .model('UsersModel', usersSchema)

module.exports = usersModel