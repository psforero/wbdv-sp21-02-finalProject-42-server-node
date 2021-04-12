module.exports = (app) => {
  const gradesService = require('../services/grades-service')

  const findAllGrades = async (req, res) => {
    try {
      const grades = await gradesService.findAllGrades()
      res.json(grades)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findGradeById = async (req, res) => {
    try {
      const gradeId = req.params['gradeId']
      const grade = await gradesService.findGradeById(gradeId)
      if (grade == null) {
        res.status(404).json({ message: 'Grade not found' })
      } else {
        res.json(grade);
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const findGradesForStudent = async (req, res) => {
    try {
      const studentId = req.params['userId']
      const grades = await gradesService.findGradesForStudent(studentId)
      if (grades == null) {
        res.status(404).json({ message: 'Grades not found.' })
      } else {
        res.json(grades)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  const createGradeForStudent = async (req, res) => {
    try {
      const studentId = req.params['userId']
      const grade = {
        studentId: studentId,
        title: req.body.title,
        department: req.body.department,
        grade: req.body.grade,
        date: req.body.date
      }
      const newGrade = await gradesService.createGradeForStudent(grade)
      res.status(201).json(newGrade)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const updateGradeForStudent = async (req, res) => {
    try {
      const studentId = req.params['userId']
      const gradeId = req.params['gradeId']
      const grade = {
        studentId: studentId,
        title: req.body.title,
        department: req.body.department,
        grade: req.body.grade,
        date: req.body.date
      }
      const updatedGrade = await gradesService.updateGradeForStudent(gradeId, grade)
      res.status(201).json(updatedGrade)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  const deleteGradeForStudent = async (req, res) => {
    try {
      const gradeId = req.params['gradeId'];

      const deletedGrade = await gradesService.deleteGradeForStudent(gradeId)
      res.status(201).json(deletedGrade)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  app.get('/api/grades', findAllGrades)
  app.get('/api/grades/:gradeId', findGradeById)
  app.get('/api/users/:userId/grades', findGradesForStudent)
  app.post('/api/users/:userId/grades', createGradeForStudent)
  app.put('/api/users/:userId/grades/:gradeId', updateGradeForStudent)
  app.delete('/api/users/:userId/grades/:gradeId', deleteGradeForStudent)
}