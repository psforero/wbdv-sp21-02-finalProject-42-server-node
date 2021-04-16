const express = require('express')
const app = express()

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/whiteboard-01',
//     {useNewUrlParser: true, useUnifiedTopology: true});


// configure CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./controllers/quizzes-controller')(app)
require('./controllers/question-controller')(app)
require('./controllers/quiz-attempts-controller')(app)


// const quizzesController = require("./controllers/quizzes-controller")
// quizzesController(app)

// app.listen(3000)

//mongo "mongodb+srv://cluster0.3scwd.mongodb.net/myFirstDatabase" --username Kelly
// const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
// mongoose.connect("mongodb+srv://Kelly:881994Ide@cluster0.3scwd.mongodb.net/whiteboard-01" ,
//     {useNewUrlParser: true, useUnifiedTopology: true});

const CONNECTION_URL = "mongodb+srv://Kelly%3ASkylzuWyNF9VA83G@cluster0.3scwd.mongodb.net/whiteboard-02"

app.listen(3000, () => {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error) => {
        if(error) {
            throw error;
        }
    });
});