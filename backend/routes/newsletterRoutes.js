const express = require('express');
const { subscribe, unsubscribe, getSubscribers } = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes
router.get('/subscribers', protect, authorize('admin'), getSubscribers);

module.exports = router;
