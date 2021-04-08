const questions = require("./questions.json")

const findQuestionForQuiz = (qid) => {
    return questions.filter(question => (question.quizId === qid))
}

module.exports = {
    findQuestionForQuiz
}