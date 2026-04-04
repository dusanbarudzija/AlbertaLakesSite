const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  waterbodyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Waterbody', required: true },
  commentText: { type: String, required: true },
  commentDateTime: { type: Date, default: Date.now },
  reviewStatus: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

module.exports = mongoose.model('Comment', commentSchema);
