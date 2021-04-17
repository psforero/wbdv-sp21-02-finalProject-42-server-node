const mongoose = require('mongoose')
const itemsSchema = require('./item-schema')

const checkinsSchema = new mongoose.Schema({
  byTeacherId: {
    type: String,
    required: true
  },
  forStudentId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  items: [itemsSchema]
}, { collection: 'checkins' })

module.exports = checkinsSchema