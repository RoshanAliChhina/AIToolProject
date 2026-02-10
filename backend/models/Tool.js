const mongoose = require('mongoose');

const toolSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a tool name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    image: {
        type: String,
        required: [true, 'Please add a logo URL']
    },
    link: {
        type: String,
        required: [true, 'Please add a platform link']
    },
    pricing: {
        type: String,
        enum: ['Free', 'Freemium', 'Paid'],
        default: 'Free'
    },
    features: [{
        name: String,
        description: String
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Featured'],
        default: 'Pending'
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
toolSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Tool', toolSchema);
