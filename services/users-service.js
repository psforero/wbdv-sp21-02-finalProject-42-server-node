const usersModel = require('../db/users/users-model')
const gradesModel = require('../db/grades/grades-model')
const checkinsModel = require('../db/widgets/checkins-model')
const spreadsheet = require('../services/spreadsheet-service')

const findAllUsers = () => {
  return usersModel.find()
}

const findUserByName = (name) => {
  return usersModel.find({ firstName: name.firstName, lastName: name.lastName })
}

const findUserByUsername = (username) => {
  return usersModel.find({ username: username })
}

const findAdvisoryForTeacher = (advisorId) => {
  return usersModel.find({ advisorId: advisorId })
}

const initializeDatabase = async () => {
  const deletedUsers = await usersModel.deleteMany({ type: {$ne: 'ADMIN'} })
  const deletedGrades = await gradesModel.deleteMany({})
  const deletedCheckins = await checkinsModel.deleteMany({})

  const accounts = await spreadsheet.generateAccounts()
  const staffAccounts = await usersModel.insertMany(accounts.staff)
  const studentAccounts = await usersModel.insertMany(accounts.student)

  return {
    users: deletedUsers,
    grades: deletedGrades,
    checkins: deletedCheckins,
    staffAccounts: staffAccounts.length,
    studentAccounts: studentAccounts.length
  }
}

const createUser = (user) => {
  const newUser = new usersModel(user)
  return newUser.save()
}

const updateUser = (userId, user) => {
  return usersModel.findByIdAndUpdate(userId, user, { new: true })
}

const deleteUser = (userId) => {
  return usersModel.findByIdAndDelete(userId)
}

const login = (userId) => {
  return usersModel.find({ username: userId.username, password: userId.password })
}

module.exports = {
  findAllUsers,
  findUserByName,
  findUserByUsername,
  findAdvisoryForTeacher,
  initializeDatabase,
  createUser,
  updateUser,
  deleteUser,
  login
}
