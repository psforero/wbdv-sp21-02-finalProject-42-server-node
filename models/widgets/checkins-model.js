const checkinsSchema = require('./checkins-schema')
const mongoose = require('mongoose')
const checkinsModel = mongoose
.model('CheckinsModel', checkinsSchema)

module.exports = checkinsModel