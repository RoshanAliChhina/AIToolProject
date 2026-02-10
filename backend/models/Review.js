const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    toolId: {
        type: String, // String to match frontend toolId which can be numeric but sent as string
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    comment: {
        type: String,
        required: true
    },
    helpful: {
        type: Number,
        default: 0
    },
    reported: {
        type: Boolean,
        default: false
    },
    toolName: {
        type: String
    },
    visible: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
