const checkinsModel = require('../db/widgets/checkins-model')

const findAllCheckins = () => {
  return checkinsModel.find()
}

const findCheckinById = (checkinId) => {
  return checkinsModel.findById(checkinId)
}

const findCheckinsForUser = (userId, type) => {
  if (type === 'STUDENT')
    return checkinsModel.find({ forStudentId: userId })
  else if (type === 'TEACHER')
    return checkinsModel.find( { byTeacherId: userId })
}

const createCheckin = (checkin) => {
  const newCheckin = new checkinsModel(checkin)
  return newCheckin.save()
}

const updateCheckin = (checkinId, checkin) => {
  return checkinsModel.findByIdAndUpdate(checkinId, checkin, { new: true })
}

const deleteCheckin = (checkinId) => {
  return checkinsModel.findByIdAndDelete(checkinId)
}

module.exports = {
  findAllCheckins,
  findCheckinById,

  findCheckinsForUser,
  createCheckin,
  updateCheckin,
  deleteCheckin
}
