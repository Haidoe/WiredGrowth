const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Team', TeamSchema);