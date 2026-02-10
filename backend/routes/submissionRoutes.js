const express = require('express');
const router = express.Router();
const { getSubmissions, addSubmission, getSubmissionById, updateStatus } = require('../controllers/submissionController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getSubmissions);
router.post('/', addSubmission);
router.get('/:id', getSubmissionById);
router.put('/:id/status', protect, authorize('admin'), updateStatus);

module.exports = router;
