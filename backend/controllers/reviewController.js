const Review = require('../models/Review');
const Tool = require('../models/Tool');

// @desc    Get reviews for a tool
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
    try {
        const { toolId, page = 1, limit = 10 } = req.query;
        let query = {};
        if (toolId) query.toolId = toolId;

        const skip = (page - 1) * limit;
        const reviews = await Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
        const total = await Review.countDocuments(query);

        // Optional: Populate toolName if missing for older reviews
        const enrichedReviews = await Promise.all(reviews.map(async (review) => {
            if (!review.toolName && review.toolId) {
                const tool = await Tool.findById(review.toolId).catch(() => null);
                if (tool) {
                    review.toolName = tool.name;
                    await review.save();
                }
            }
            return review;
        }));

        res.status(200).json({
            success: true,
            count: reviews.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: enrichedReviews
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add a review
// @route   POST /api/reviews
// @access  Public
const addReview = async (req, res) => {
    try {
        const { toolId, name, email, rating, comment } = req.body;

        let toolName = req.body.toolName;
        if (!toolName && toolId) {
            const tool = await Tool.findById(toolId).catch(() => null);
            if (tool) {
                toolName = tool.name;
            }
        }

        const review = await Review.create({
            toolId,
            name,
            email,
            rating,
            comment,
            toolName: toolName || 'Unknown Tool'
        });

        res.status(201).json({ success: true, review });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
// @access  Public
const markHelpful = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        review.helpful += 1;
        await review.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        await review.deleteOne();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update review (visibility)
// @route   PUT /api/reviews/:id
// @access  Private/Admin
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getReviews,
    addReview,
    markHelpful,
    deleteReview,
    updateReview
};
