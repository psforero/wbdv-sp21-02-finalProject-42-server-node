const quizzesDao = require('../daos/quizzes-dao')

const findAllQuizzes = () => quizzesDao.findAllQuizzes()
const findQuizById = (qid) => quizzesDao.findQuizById(qid)
                                        .populate()
                                        .exec()

module.exports = {
    findAllQuizzes,
    findQuizById
}