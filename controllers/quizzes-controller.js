const quizzesServide = require("../services/quizzes-service")

module.exports = (app) => {

    const findAllQuizzes = (req, res) => {
        const quizzes = quizzesServide.findAllQuizzes()
        res.send(quizzes)
    }
    const findQuizById = (req, res) => {
        const quizId = req.params['qid']
        const quiz = quizzesServide.findQuizById(quizId)
        res.send(quiz)
    }


    app.get("/api/quizzes", findAllQuizzes)
    app.get("/api/quizzes/:qid", findQuizById)
}