const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if already subscribed
        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'This email is already subscribed to our newsletter'
                });
            } else {
                // Reactivate subscription
                existingSubscriber.isActive = true;
                existingSubscriber.subscribedAt = Date.now();
                await existingSubscriber.save();

                return res.status(200).json({
                    success: true,
                    message: 'Welcome back! Your subscription has been reactivated.'
                });
            }
        }

        // Create new subscriber
        const subscriber = await Newsletter.create({ email });

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed! You\'ll receive updates about new AI tools.',
            subscriber: {
                email: subscriber.email,
                subscribedAt: subscriber.subscribedAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const subscriber = await Newsletter.findOne({ email });

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Email not found in our newsletter list'
            });
        }

        subscriber.isActive = false;
        await subscriber.save();

        res.status(200).json({
            success: true,
            message: 'Successfully unsubscribed from newsletter'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all subscribers (Admin only)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
exports.getSubscribers = async (req, res) => {
    try {
        const { active } = req.query;
        let query = {};

        if (active !== undefined) {
            query.isActive = active === 'true';
        }

        const subscribers = await Newsletter.find(query).sort({ subscribedAt: -1 });
        const totalActive = await Newsletter.countDocuments({ isActive: true });
        const totalInactive = await Newsletter.countDocuments({ isActive: false });

        res.status(200).json({
            success: true,
            count: subscribers.length,
            totalActive,
            totalInactive,
            data: subscribers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
