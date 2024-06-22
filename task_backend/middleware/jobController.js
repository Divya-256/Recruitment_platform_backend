const Job = require('../models/Job');

const createJob = async (req, res) => {
  const { title, location, salary, responsibilities, r1CheckForm } = req.body;
  const job = await Job.create({ title, location, salary, responsibilities, r1CheckForm, employer: req.user.id });
  res.status(201).json({ success: true, data: job });
};

const approveJob = async (req, res) => {
  const { recruiters, r2CheckForm } = req.body;
  const job = await Job.findByIdAndUpdate(req.params.id, { status: 'approved', recruiters, r2CheckForm }, { new: true });
  res.status(200).json({ success: true, data: job });
};

const getJobs = async (req, res) => {
  const jobs = await Job.find().populate('employer').populate('recruiters');
  res.status(200).json({ success: true, data: jobs });
};

module.exports = { createJob, approveJob, getJobs };
