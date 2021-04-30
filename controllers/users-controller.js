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

  const findUserByName = async (req, res) => {
    try {
      const names = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }

      const user = await usersService.findUserByName(names)
      res.status(201).json(user)
    } catch (err) {
      res.status(404).json({ message: err.message })
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

  const initializeDatabase = async (req, res) => {
    try {
      const initialize = await usersService.initializeDatabase();
      res.json(initialize)
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
        email: req.body.email,
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
        email: req.body.email,
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

  const register = async (req, res) => {
    try {
      const credentials = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type,
      }

      let newUser = await usersService.findUserByUsername(credentials.username)
      if (newUser.length > 0) {
        res.status(400).json({ message: `Username '${credentials.username}' already exists` })
      } else {
        newUser = await usersService.createUser(credentials)
        res.status(201).json(newUser)
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const login = async (req, res) => {
    try {
      const user = {
        username: req.body.username,
        password: req.body.password,
      }

      const loggedUser = await usersService.login(user)
      res.status(201).json(loggedUser)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  }

  app.get('/api/users', findAllUsers)
  app.get('/api/users/:userId/advisory', findAdvisoryForTeacher)
  app.put('/api/users/:userId', updateUser)
  app.delete('/api/users/:userId', deleteUser)
  app.post('/api/users/byName', findUserByName)
  app.post('/api/users', createUser)
  app.post('/api/users/initialize', initializeDatabase)
  app.post('/api/users/register', register)
  app.post('/api/users/login', login)
}
