const express = require('express');
const router = express.Router();
const { chatProxy } = require('../controllers/aiController');

router.post('/chat', chatProxy);

module.exports = router;
