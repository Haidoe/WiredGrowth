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
    attendanceStatus: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'AttendanceStatus'
    },
    date: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Attendance', AttendanceSchema)