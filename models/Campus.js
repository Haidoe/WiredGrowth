const mongoose = require('mongoose')

const CampusSchema = new mongoose.Schema({
  campus: {
      type: String,
      required: true
  }  
})

module.exports = mongoose.model('Campus', CampusSchema)