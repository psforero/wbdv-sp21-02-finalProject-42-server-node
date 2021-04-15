const questionsService = require("../services/questions-service")

module.exports = (app) => {

    app.get("/api/quizzes/:qid/questions", (req, res) =>
        questionsService.findQuestionsForQuiz(req.params['qid'])
            .then(questions => res.send(questions)))

    app.get("/api/questions", (req, res) =>
        questionsService.findAllQuestions()
            .then(allQuestions => res.json(allQuestions)))

    app.get("/api/questions/:qid", (req, res) =>
        questionsService.findQuestionById(req.params['qid'])
            .then(question => res.json(question)))
}