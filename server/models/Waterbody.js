const mongoose = require('mongoose');

const waterbodySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model('Waterbody', waterbodySchema);
