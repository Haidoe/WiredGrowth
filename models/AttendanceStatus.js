const mongoose = require('mongoose')

const AttendanceStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AttendanceStatus', AttendanceStatusSchema)