const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Waterbody = require('../models/Waterbody');
const { auth, requireAdmin } = require('./auth');


router.get('/', async (req, res) => {
  // get comments
  try {
    const { waterbodyId, reviewStatus } = req.query;

    // Admin page: fetch all comments (requires login + admin)
    const user = req.session.username ? await User.findOne({ username: req.session.username }) : null;
    if (user?.role === 'admin' && !waterbodyId) {
      const filter = {};

      if (reviewStatus) {
        filter.reviewStatus = reviewStatus;
      }

      const comments = await Comment.find(filter).populate('userId', 'username').populate('waterbodyId', 'name').sort({ commentDateTime: -1 });

      const formatted = comments.map(comment => ({
        _id: comment._id,
        username: comment.userId?.username || 'Unknown User',
        waterbodyName: comment.waterbodyId?.name || 'Unknown Lake',
        commentText: comment.commentText,
        commentDateTime: comment.commentDateTime,
        reviewStatus: comment.reviewStatus
      }));

      return res.json(formatted);
    }

    // Lake page: fetch approved comments for one lake
    if (!waterbodyId) {
      return res.status(400).json({message: 'waterbodyId is required.'});
    }

    const comments = await Comment.find({waterbodyId,reviewStatus: 'approved'}) .populate('userId', 'username').sort({ commentDateTime: -1 });

    const formatted = comments.map(comment => ({ // for frontend
      _id: comment._id,
      username: comment.userId?.username || 'Unknown User',
      commentText: comment.commentText,
      commentDateTime: comment.commentDateTime
    }));

    res.json(formatted);

  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    res.status(500).json({message: 'Failed to fetch comments.'});
  }
});

router.post('/', auth, async (req, res) => {
  // submit a comment
  try {
    const { waterbodyId, commentText } = req.body;

    if (!waterbodyId || !commentText?.trim()) {
      return res.status(400).json({message: 'waterbodyId and commentText are required.'});
    }

    const comment = await Comment.create({
      userId: req.user._id,
      waterbodyId,
      commentText: commentText.trim(),
      reviewStatus: 'pending'
    });

    res.status(201).json({
      message: 'Comment submitted for review.',
      comment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to submit comment.'
    });
  }
});


router.patch('/:id/review', auth, requireAdmin, async (req, res) => {
  // admin approve a comment
  try {
    const { reviewStatus } = req.body;

    if (!['pending', 'approved'].includes(reviewStatus)) {
      return res.status(400).json({message: 'Invalid review status.'});
    }

    const updated = await Comment.findByIdAndUpdate(req.params.id, {reviewStatus}, {new: true});

    if (!updated) {
      return res.status(404).json({message: 'Comment not found.'});
    }

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to update comment.'});
  }
});


router.delete('/:id', auth, async (req, res) => {
  // delete a comment from DB (owner or admin)
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({message: 'Comment not found.'});
    }

    const isOwner = comment.userId.toString() === req.user._id.toString();

    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized.'});
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted.'});

  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Failed to delete comment.'});
  }
});

router.get('/mine', auth, async (req, res) => {
  try {
    const comments = await Comment.find({userId: req.user._id})
      .populate('waterbodyId', 'name')
      .sort({ commentDateTime: -1 });

    const formatted = comments.map(comment => ({
      id: comment._id,
      location: comment.waterbodyId?.name || 'Unknown Lake',
      date: comment.commentDateTime,
      comment: comment.commentText
    }));

    res.json(formatted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user comments.'});
  }
});

module.exports = router;

