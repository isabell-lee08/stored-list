const mongoose = require('mongoose');

const namesSchema = new mongoose.Schema({
  name: String,
  gender: String,
  rank: String,
  isBoy: Boolean,
  isGirl: Boolean,
  isHighlighted: Boolean
});

module.exports = mongoose.model('Users', namesSchema);