const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  waterbodyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Waterbody', required: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  sampleNumber: { type: String },
  waterbodyName: { type: String },
  beachName: { type: String },
  beachAccessNumber: { type: String },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  collectionDateTime: { type: Date },
  sampleType: { type: String },
  microcystinLR_ugL: { type: Number },
  totalCyanobacterial_cells_mL: { type: Number },
  microcystis_mcyEGene_copies_mL: { type: Number },
  anabaena_mcyEGene_copies_mL: { type: Number },
  planktothrix_mcyEGene_copies_mL: { type: Number },
  waterDescription: { type: String },
  waterDescriptionNotes: { type: String },
  turbidity: { type: String },
  colour: { type: String },
  evidenceOfBloom: { type: String },
  waterTemp_C: { type: Number },
  windDirection: { type: String },
  rainfall24h: { type: String },
  rainfall24h_mm: { type: Number },
  species: [{ type: String }]
});

module.exports = mongoose.model('Sample', sampleSchema);
