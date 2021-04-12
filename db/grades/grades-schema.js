const mongoose = require('mongoose')

const gradesSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, { collection: 'grades' })

module.exports = gradesSchema