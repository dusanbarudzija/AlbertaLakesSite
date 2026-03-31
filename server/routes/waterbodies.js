const express = require('express');
const router = express.Router();
const Waterbody = require('../models/Waterbody');
const { getLatestCellCount, getLatestWaterDescription } = require('../services/samplesService');

router.get('/lakes', async (req, res) => {
    // get all waterbodies + their most recent cellCount and waterDescription (+ the dates for each) for the lakes page
});

module.exports = router;
