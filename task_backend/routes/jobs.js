const express = require('express');
const { createJob, approveJob, getJobs } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, authorize('employer'), createJob);
router.put('/approve/:id', protect, authorize('coordinator'), approveJob);
router.get('/', protect, getJobs);

module.exports = router;
