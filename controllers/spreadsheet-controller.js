module.exports = async (app) => {

  // CREDENTIALS
  const { google } = require('googleapis')
  const creds = 'credentials.json'
  const spreadsheetId = '1qVhOEMqrhgvsmrHk8aXx3KzRMaNo6Y7jTHtPAZtrC24'

  const auth = new google.auth.GoogleAuth({
    keyFile: creds,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })
  const client = await auth.getClient()
  const googleSheets = google.sheets({ version: 'v4', auth: client })

  // METHODS
  const getAllData = async (req, res) => {
    const advisorsResponse = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Advisors!A2:A1000'
    })
    const advisories = advisorsResponse.data.values.reduce((a, b) => a.concat(b), [])

    const departmentsResponse = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'CourseOfferings!A1:Z1',
    })
    const departments = departmentsResponse.data.values[0]

    const classesResponse = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'CourseOfferings!A2:Z1000',
      majorDimension: 'COLUMNS'
    })
    const classes = classesResponse.data.values.reduce((a, b) => a.concat(b), [])

    const students = []
    for (let advisory of advisories) {
      const advisoryDataResponse = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${advisory}!A2:Z1000`
      })
      const advisoryData = advisoryDataResponse.data.values

      advisoryData.forEach((row, rowIndex) => {
        let student = {
          grades: [],
          advisor: advisory
        }
        row.forEach((col, colIndex) => {
          let grade = {}
          if (colIndex === 0) {
            student.lastName = col
          } else if (colIndex === 1) {
            student.firstName = col
          } else if (colIndex < departments.length + 2) {
            grade.grade = parseInt(col)
            grade.department = departments[colIndex - 2]
            grade.title = row[colIndex + departments.length]
            student.grades.push(grade)
          }
        })
        students.push(student)
      })
    }
    const formattedData = {
      studentData: students,
      advisories: advisories,
      departments: departments,
      classes: classes
    }
    res.json(formattedData)
  }

  const getAdvisoryData = async (req, res) => {
    const sheetName = req.params['advisorName']
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${sheetName}!A2:Z1000`
    })
    res.json(rows.data.values)
  }

  const getAdvisors = async (req, res) => {
    const advisors = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Advisors!A2:A1000'
    })
    res.json(advisors.data.values)
  }

  const getDepartments = async (req, res) => {
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'CourseOfferings!A1:Z1',
    })
    res.json(rows.data.values)
  }

  const getClasses = async (req, res) => {
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'CourseOfferings!A2:Z1000',
      majorDimension: 'COLUMNS'
    })
    res.json(rows.data.values.reduce((a, b) => a.concat(b), []))
  }

  const getFields = async (req, res) => {
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'CourseOfferings!A1:Z1',
    })
    res.json(rows.data.values)
  }

  app.get('/api/spreadsheet/data', getAllData)
  app.get('/api/spreadsheet/data/:advisorName', getAdvisoryData)
  app.get('/api/spreadsheet/advisors', getAdvisors)
  app.get('/api/spreadsheet/classes', getClasses)
  app.get('/api/spreadsheet/departments', getDepartments)
  app.get('/api/spreadsheet/fields', getFields)
}

