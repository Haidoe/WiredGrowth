const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);