const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  responsibilities: { type: String, required: true },
  r1CheckForm: [{ question: String, correctAnswer: String }],
  r2CheckForm: [{ question: String }],
  status: { type: String, enum: ['submitted', 'approved', 'live'], default: 'submitted' },
  recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Job', JobSchema);
