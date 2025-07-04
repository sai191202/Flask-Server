const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  author: String,
  action: String,
  from_branch: String,
  to_branch: String,
  timestamp: Date
});

module.exports = mongoose.model('Event', eventSchema);
