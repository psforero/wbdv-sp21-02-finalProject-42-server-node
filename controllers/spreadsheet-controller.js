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
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId
    })
    res.json(metaData)
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
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Advisors!A2:A1000'
    })
    res.json(rows.data.values)
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
    res.json(rows.data.values)
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

