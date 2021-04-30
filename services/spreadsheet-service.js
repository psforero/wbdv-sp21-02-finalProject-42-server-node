const generateAccounts = async () => {
  const { google } = require('googleapis')
  const creds = 'credentials.json'
  const spreadsheetId = '1qVhOEMqrhgvsmrHk8aXx3KzRMaNo6Y7jTHtPAZtrC24'

  const auth = new google.auth.GoogleAuth({
    keyFile: creds,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const client = await auth.getClient()

  const googleSheets = google.sheets({ version: 'v4', auth: client })

  const accounts =
    {
      staff: [],
      student: []
    }
  const advisorResponse = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Advisors!A2:Z1000'
  })
  const advisors = advisorResponse.data.values

  for (let advisor of advisors) {
    accounts.staff.push({
      lastName: advisor[0],
      firstName: advisor[1],
      username: advisor[0].toLowerCase()[0] + advisor[1],
      password: advisor[0].toLowerCase() + advisor[1],
      email: advisor[0].toLowerCase()[0] + advisor[1] + '@daViz.edu',
      type: 'STAFF'
    })

    const studentsResponse = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${advisor[0]}!A2:B1000`
    })
    const students = studentsResponse.data.values

    let index = 2
    for (let student of students) {
      accounts.student.push({
        lastName: student[0],
        firstName: student[1],
        advisor: advisor[0],
        username: student[0].toLowerCase()[0] + student[1],
        password: student[0].toLowerCase() + index,
        email: student[0].toLowerCase()[0] + student[1] + '@daViz.student.edu',
        type: 'STUDENT'
      })
      index++
    }
  }
  return accounts
}


module.exports = {
  generateAccounts
}

