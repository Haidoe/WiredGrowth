const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Attendee", AttendeeSchema);
