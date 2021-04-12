const usersModel = require('../db/users/users-model')

const findAllUsers = () => {
  return usersModel.find()
}

const findUserById = (userId) => {
  return usersModel.findById(userId)
}

const createUser = (user) => {
  const newUser = new usersModel(user)
  return newUser.save()
}

const updateUser = (userId, user) => {
  return usersModel.findByIdAndUpdate(userId, user)
}

const deleteUser = (userId) => {
  return usersModel.findByIdAndDelete(userId)
}

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser
}
