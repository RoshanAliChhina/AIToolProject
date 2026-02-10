const express = require('express');
const router = express.Router();
const { getReviews, addReview, markHelpful, deleteReview, updateReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', addReview);
router.put('/:id/helpful', markHelpful);
router.put('/:id', protect, authorize('admin'), updateReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

module.exports = router;
