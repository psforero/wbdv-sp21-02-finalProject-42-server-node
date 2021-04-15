// const quizzes = require("./quizes.json")
//
// const quizzesModel = require("../models/quizzes/quizzes-model")
//
// const createQuiz = () => {}
// const findAllQuizzes = () => {
//     return quizzesModel.find()
// }
// const findQuizById = (qid) => {
//     return quizzesModel.findById(qid)
// }
// const updateQuiz = () => {}
// const deleteQuiz = () => {}
//
// module.exports = {
//     createQuiz,
//     findAllQuizzes, findQuizById,
//     updateQuiz, deleteQuiz
// }

const quizzesDao = require('../daos/quizzes-dao')

const findAllQuizzes = () => quizzesDao.findAllQuizzes()
const findQuizById = (qid) => quizzesDao.findQuizById(qid)
                                        .populate()
                                        .exec()

module.exports = {
    findAllQuizzes,
    findQuizById
}