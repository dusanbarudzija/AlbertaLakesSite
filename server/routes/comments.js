const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Waterbody = require('../models/Waterbody');
const { auth, requireAdmin } = require('./auth');

router.get('/', async (req, res) => {
  // get comments
});

router.post('/', auth, async (req, res) => {
  // submit a comment
});

router.patch('/:id/review', auth, requireAdmin, async (req, res) => {
  // admin approve a comment
});

router.delete('/:id', auth, async (req, res) => {
  // delete a comment from DB (owner or admin)
});

module.exports = router;
