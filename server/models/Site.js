const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  waterBodyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Waterbody', required: true },
  beachName: { type: String, required: true },
  beachAccessNumber: { type: String },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Site', siteSchema);
