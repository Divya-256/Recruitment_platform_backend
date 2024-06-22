const express = require('express');
const { applyForJob, reviewApplication, completeR2Check } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', protect, authorize('candidate'), applyForJob);
router.put('/review/:id', protect, authorize('recruiter'), reviewApplication);
router.put('/r2check/:id', protect, authorize('recruiter'), completeR2Check);

module.exports = router;
