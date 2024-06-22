const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resume: { type: String, required: true },
  r1CheckResponses: [{ question: String, answer: String, correct: Boolean }],
  r2CheckResponses: [{ question: String, answer: String }],
  status: { type: String, enum: ['submitted', 'reviewed', 'shortlisted'], default: 'submitted' }
});

module.exports = mongoose.model('Application', ApplicationSchema);
