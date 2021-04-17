const gradesSchema = require('./grades-schema')
const mongoose = require('mongoose')
const gradesModel = mongoose
  .model('GradesModel', gradesSchema)

module.exports = gradesModel