module.exports = (app) => {
  const checkinsService = require('../services/checkins-service')

  const findAllCheckins = async (req, res) => {
    try {
      const checkins = await checkinsService.findAllCheckins()
      res.json(checkins)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findCheckinById = async (req, res) => {
    try {
      const checkinId = req.params['checkinId']
      const checkin = await checkinsService.findCheckinsById(checkinId)
      if (checkin == null) {
        res.status(404).json({ message: 'Checkin not found' })
      } else {
        res.json(checkin)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findCheckinsForUser = async (req, res) => {
    try {
      const userId = req.params['userId']
      const type = req.query['type']
      const checkins = await checkinsService.findCheckinsForUser(userId, type)

      if (checkins == null) {
        res.status(404).json({ message: 'Checkins not found.' })
      } else {
        res.json(checkins)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const createCheckin = async (req, res) => {
    try {
      const studentId = req.params['userId']
      const checkin = {
        byTeacherId: req.body.byTeacherId,
        forStudentId: studentId,
        content: req.body.content,
        date: req.body.date,
      }
      const newCheckin = await checkinsService.createCheckinForStudent(checkin)
      res.status(201).json(newCheckin)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const updateCheckin = async (req, res) => {
    try {
      const studentId = req.params['userId']
      const checkinId = req.params['checkinId']
      const checkin = {
        byTeacherId: req.body.byTeacherId,
        forStudentId: studentId,
        content: req.body.content,
        date: req.body.date,
        items: req.body.items
      }
      const updatedCheckin = await checkinsService.updateCheckinForStudent(checkinId, checkin)
      res.status(201).json(updatedCheckin)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const deleteCheckin = async (req, res) => {
    try {
      const checkinId = req.params['checkinId']

      const deletedCheckin = await checkinsService.deleteCheckinForStudent(checkinId)
      res.status(201).json(deletedCheckin)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  app.get('/api/checkins', findAllCheckins)
  app.get('/api/checkins/:checkinId', findCheckinById)
  app.get('/api/users/:userId/checkins', findCheckinsForUser)
  app.post('/api/users/:userId/checkins', createCheckin)
  app.put('/api/users/:userId/checkins/:checkinId', updateCheckin)
  app.delete('/api/users/:userId/checkins/:checkinId', deleteCheckin)
}