const Tool = require('../models/Tool');
const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
    try {
        const totalTools = await Tool.countDocuments();
        const totalReviews = await Review.countDocuments();
        const totalUsers = await User.countDocuments();
        const pendingTools = await Tool.countDocuments({ status: 'Pending' });

        // Get monthly growth (simplified: just return some dummy growth for now or calculate from createdAt)
        // For a real app, you'd compare this month vs last month

        res.status(200).json({
            success: true,
            stats: {
                totalTools: { value: totalTools, change: 12 }, // Change could be calculated
                totalReviews: { value: totalReviews, change: 8 },
                totalUsers: { value: totalUsers, change: 15 },
                pendingTools: { value: pendingTools, change: -3 }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get recent activity
// @route   GET /api/admin/activity
// @access  Private/Admin
exports.getRecentActivity = async (req, res) => {
    try {
        // Fetch recent tools, reviews, and users
        const recentTools = await Tool.find().sort({ createdAt: -1 }).limit(5);
        const recentReviews = await Review.find().sort({ createdAt: -1 }).limit(5);
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

        // Combine and sort by date
        let activity = [
            ...recentTools.map(t => ({ id: t._id, type: 'tool', action: t.status === 'Pending' ? 'New tool submitted' : 'Tool added', tool: t.name, createdAt: t.createdAt })),
            ...recentReviews.map(r => ({ id: r._id, type: 'review', action: 'Review posted', tool: r.toolName || 'Tool', createdAt: r.createdAt })),
            ...recentUsers.map(u => ({ id: u._id, type: 'user', action: 'User registered', tool: 'N/A', createdAt: u.createdAt }))
        ];

        activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        activity = activity.slice(0, 5);

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
