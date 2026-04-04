const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Waterbody = require('../models/Waterbody');
const Site = require('../models/Site');
const { auth } = require('./auth');
const { getLatestCellCount, getLatestWaterDescription } = require('../services/samplesService');

// User routes for profile page
router.get('/me/savedLakes', auth, async (req, res) => {
  // get saved lakes list for current user
  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const waterbodies = await Waterbody.find({ _id: { $in: user.savedLakes } });

    const lakes = await Promise.all(waterbodies.map(async (wb) => {
      const latestCellCount = await getLatestCellCount(wb._id);
      const latestWaterDescription = await getLatestWaterDescription(wb._id);
      const site = await Site.findOne({ waterBodyId: wb._id });
      return {
        ...wb.toObject(),
        cellCount: latestCellCount ? latestCellCount.totalCyanobacterial_cells_mL : null,
        cellCountDate: latestCellCount ? latestCellCount.collectionDateTime : null,
        waterDescription: latestWaterDescription ? latestWaterDescription.waterDescription : null,
        waterDescriptionDate: latestWaterDescription ? latestWaterDescription.collectionDateTime : null,
        latitude: site ? site.location.latitude : null,
        longitude: site ? site.location.longitude : null,
        beachName: site ? site.beachName : null,
      };
    }));

    res.json(lakes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/me/savedLakes', auth, async (req, res) => {
  // add a lake to list
  try {
    const { waterbodyId } = req.body;
    if (!waterbodyId) return res.status(400).json({ message: 'waterbodyId is required' });

    const user = await User.findOne({ username: req.session.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.savedLakes.some(id => id.toString() === waterbodyId)) {
      return res.status(409).json({ message: 'Lake already saved.' });
    }

    user.savedLakes.addToSet(waterbodyId);
    await user.save();
    res.json({ message: 'Lake saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/me/savedLakes/:waterbodyId', auth, async (req, res) => {
  // remove a lake from list
  try {
    const user = await User.findOne({ username: req.session.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedLakes.pull(req.params.waterbodyId);
    await user.save();
    res.json({ message: 'Lake removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
