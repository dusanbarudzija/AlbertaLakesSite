const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' },
  subscribed: { type: Boolean, default: false },
  savedLakes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Waterbody' }]
});

module.exports = mongoose.model('User', userSchema);
