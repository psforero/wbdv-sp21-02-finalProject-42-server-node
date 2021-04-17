const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

const CONNECTION_URL = "mongodb+srv://FinalProjectUser:s8QsSbTVFGammReA@cluster0.h6og9.mongodb.net/WBDV_Final_Project_DB?retryWrites=true&w=majority"
var port = process.env.PORT || 4000

app.listen(port, () => {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error) => {
        if(error) {
            throw error;
        }
    });
});

// configure CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./controllers/quizzes-controller')(app)
require('./controllers/question-controller')(app)
require('./controllers/quiz-attempts-controller')(app)
require('./controllers/users-controller')(app)


