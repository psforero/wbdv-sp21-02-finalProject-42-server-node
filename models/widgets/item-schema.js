const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String, enum: ['TODO', 'EVENT']
  },
  date: {
    type: String
  },
  completed: {
    type: String
  }
})

module.exports = itemsSchema