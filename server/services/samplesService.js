const Sample = require('../models/Sample');

// Get the most recent sample with a non-null cell count for a waterbody
async function getLatestCellCount(waterbodyId) {
  return Sample.findOne({
    waterbodyId,
    totalCyanobacterial_cells_mL: { $ne: null }
  }).sort({ collectionDateTime: -1 });
}

// Get the most recent sample with a non-null water description for a waterbody
async function getLatestWaterDescription(waterbodyId) {
  return Sample.findOne({
    waterbodyId,
    waterDescription: { $ne: null }
  }).sort({ collectionDateTime: -1 });
}

module.exports = { getLatestCellCount, getLatestWaterDescription };
