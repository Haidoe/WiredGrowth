const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campus'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    attendanceStatus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'AttendanceStatus'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Attendance', AttendanceSchema)