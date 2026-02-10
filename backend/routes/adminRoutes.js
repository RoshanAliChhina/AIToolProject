const express = require('express');
const { getStats, getRecentActivity } = require('../controllers/adminController');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes here are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/activity', getRecentActivity);

router.route('/users')
    .get(getUsers);

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
