module.exports = async (app) => {
  const { google } = require('googleapis')
  const creds = 'credentials.json'
  const spreadsheetId = '1qVhOEMqrhgvsmrHk8aXx3KzRMaNo6Y7jTHtPAZtrC24'

  const auth = new google.auth.GoogleAuth({
    keyFile: creds,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const client = await auth.getClient()

  const googleSheets = google.sheets({ version: 'v4', auth: client })

  const getMetadata = async (req, res) => {

    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId
    })
    res.json(metaData)
  }

  const getValues = async (req, res) => {
    const sheetName = req.params['advisorName']
    const rows = await googleSheets.spreadsheets.values.get( {
      auth,
      spreadsheetId,
      range: sheetName
    })
    res.json(rows.data)
  }

  const getAdvisors = async (req, res) => {
    const rows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Advisors'
    })
    res.json(rows.data)
  }

  app.get('/api/spreadsheet/metadata', getMetadata)
  app.get('/api/spreadsheet/advisors', getAdvisors)
  app.get('/api/spreadsheet/:advisorName', getValues)
}