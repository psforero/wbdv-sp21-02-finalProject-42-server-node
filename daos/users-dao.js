const usersModel = require("../models/users/users-model")

const findUserByUsername = (username) => {
    return usersModel.find({username})
}

const findUserByCredentials = (credentials) => {
    return usersModel.findOne({
        username: credentials.username,
        password: credentials.password
    })
}

const createUser = (user) => {
    return usersModel.create(user)
}

module.exports = {
    findUserByUsername,
    findUserByCredentials,
    createUser
}