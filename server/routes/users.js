const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('./auth');
const { getLatestCellCount } = require('../services/samplesService');

// User routes for profile page
router.get('/me/savedLakes', auth, async (req, res) => {
  // get saved lakes list for current user
});

router.post('/me/savedLakes', auth, async (req, res) => {
  // add a lake to list
});

router.delete('/me/savedLakes/:waterbodyId', auth, async (req, res) => {
  // remove a lake from list
});

module.exports = router;
