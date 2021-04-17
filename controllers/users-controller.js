const userDao = require("../daos/users-dao")

module.exports = (app) => {
  const usersService = require('../services/users-service')

  const findAllUsers = async (req, res) => {
    try {
      const users = await usersService.findAllUsers();
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findUserById = async (req, res) => {
    try {
      const userId = req.params['userId']
      const user = await usersService.findUserById(userId)
      if (user == null) {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.json(user)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findAdvisoryForTeacher = async (req, res) => {
    try {
      const advisorId = req.params['userId']
      const advisory = await usersService.findAdvisoryForTeacher(advisorId)
      res.json(advisory)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const createUser = async (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
      }
      if (req.body.type === 'STUDENT') {
        user.advisorId = req.body.advisorId
      }

      const newUser = await usersService.createUser(user)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const updateUser = async (req, res) => {
    try {
      const userId = req.params['userId']
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
      }
      if (req.body.type === 'STUDENT') {
        user.advisorId = req.body.advisorId
      }

      const updatedUser = await usersService.updateUser(userId, user)
      res.status(201).json(updatedUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const userId = req.params['userId']

      const deletedStudent = await usersService.deleteUser(userId)
      res.status(201).json(deletedStudent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const register = (req, res) => {
    const credentials = req.body;
    //check if the user exits
    userDao.findUserByUsername(credentials.username)
        .then((actualUser) => {
          if(actualUser.length > 0) {
            res.send("0")
          } else {
            userDao.createUser(credentials)
                .then((newUser) => {
                  console.log("new user: " + newUser)
                  req.session['profile'] = newUser
                  res.send(newUser)
                })
          }
        })
  }

  const profile = (req, res) => {
    const currentUser = req.session['profile']
    res.send(currentUser)
  }

  const login = (req, res) => {
    const credentials = req.body;
    //check if the user exits
    userDao.findUserByCredentials(credentials)
        .then((actualUser) => {
          if(actualUser) {
            req.session['profile'] = actualUser
            res.send(actualUser)
          } else {
            res.send("0")
          }
        })
  }

  app.get('/api/users', findAllUsers)
  app.get('/api/users/:userId', findUserById)
  app.get('/api/users/:userId/advisory', findAdvisoryForTeacher)
  app.post('/api/users', createUser)
  app.put('/api/users/:userId', updateUser)
  app.delete('/api/users/:userId', deleteUser)
  app.post('/api/users/register', register)
  app.post('/api/users/profile', profile)
  app.post('/api/users/login', login)
}

// KELLY
// Same as class implementation but I am using try/catch/await instead of then().
// It is the same except it looks a bit clearer and it allows us to send out error/success messages
// and deal with cases that fail in a clearer way than then()

// const functionName = async () => { // async tells that the function is asynchronous
//   try { // do whatever is here. In out case we are calling functions from the service
//     await someOtherFunction() // this is the equivalent to then()... it will not move on until someOtherFunction returns with the result
//   } catch (e) { // if something goes wrong with the try, do this instead
//
//   }
// }

// Also, instead of using res.send(), I am using res.json(). They both do the same thing, except the
// second one sets the message format as JSON
