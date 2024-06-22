const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
  const { jobId, resume, r1CheckResponses } = req.body;
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  const responses = r1CheckResponses.map(response => ({
    question: response.question,
    answer: response.answer,
    correct: job.r1CheckForm.some(q => q.question === response.question && q.correctAnswer === response.answer)
  }));

  const application = await Application.create({
    candidate: req.user.id,
    job: jobId,
    resume,
    r1CheckResponses: responses
  });

  res.status(201).json({ success: true, data: application });
};

const reviewApplication = async (req, res) => {
  const { applicationId, r2CheckResponses } = req.body;
  const application = await Application.findById(applicationId);
  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  application.r2CheckResponses = r2CheckResponses;
  application.status = 'reviewed';
  await application.save();

  res.status(200).json({ success: true, data: application });
};

const completeR2Check = async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  application.status = 'shortlisted';
  await application.save();

  res.status(200).json({ success: true, data: application });
};

module.exports = { applyForJob, reviewApplication, completeR2Check };
