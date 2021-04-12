const mongoose = require('mongoose')

const checkinsSchema = new mongoose.Schema({
  byTeacherId: String,
  forStudentId: String,
  content: String,
  date: String,
  items: [{
    title: String,
    description: String,
    type: String, enum: ['TODO', 'EVENT'],
    date: String,
    completed: String
  }]
}, {collection: 'checkins'})

module.exports = checkinsSchema