const gradesModel = require('../db/grades/grades-model');

const findAllGrades = () => {
  return gradesModel.find();
}

const findGradeById = (gradeId) => {
  return gradesModel.findById(gradeId)
}

const findGradesForStudent = (studentId) => {
  return gradesModel.find({ studentId: studentId })
};

const createGradeForStudent = (grade) => {
  const newGrade = new gradesModel(grade);
  return newGrade.save()
};

const updateGradeForStudent = (gradeId, grade) => {
  return gradesModel.findByIdAndUpdate(gradeId, grade)
};

const deleteGradeForStudent = (gradeId) => {
  return gradesModel.findByIdAndDelete(gradeId)
}

module.exports = {
  findAllGrades,
  findGradeById,

  findGradesForStudent,
  createGradeForStudent,
  updateGradeForStudent,
  deleteGradeForStudent
};
