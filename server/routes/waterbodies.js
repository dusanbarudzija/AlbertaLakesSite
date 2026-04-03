const express = require('express');
const router = express.Router();
const Waterbody = require('../models/Waterbody');
const { getLatestCellCount, getLatestWaterDescription } = require('../services/samplesService');

router.get('/lakes', async (req, res) => {
    // Get all waterbodies most recent cellCount and waterDescription (+ the dates for each) for the lakes page
    try {
        const waterbodies = await Waterbody.find();
        const waterbodiesWithLatestData = await Promise.all(waterbodies.map(async (waterbody) => {
            const latestCellCount = await getLatestCellCount(waterbody._id);
            const latestWaterDescription = await getLatestWaterDescription(waterbody._id);
            return {
                ...waterbody.toObject(),
                latestCellCount,
                latestWaterDescription
            };
        }));
        res.json(waterbodiesWithLatestData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
