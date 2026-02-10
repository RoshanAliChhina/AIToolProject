const express = require('express');
const {
    getTools,
    getTool,
    createTool,
    updateTool,
    deleteTool
} = require('../controllers/toolController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(getTools)
    .post(protect, authorize('admin'), createTool);

router
    .route('/:id')
    .get(getTool)
    .put(protect, authorize('admin'), updateTool)
    .delete(protect, authorize('admin'), deleteTool);

module.exports = router;
