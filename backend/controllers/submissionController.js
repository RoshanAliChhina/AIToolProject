const Submission = require('../models/Submission');

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Public (filtered by status) or Private/Admin (all)
const getSubmissions = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status) query.status = status;

        const submissions = await Submission.find(query).sort({ createdAt: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add a submission
// @route   POST /api/submissions
// @access  Public
const addSubmission = async (req, res) => {
    try {
        const submission = await Submission.create(req.body);
        res.status(201).json({ success: true, id: submission._id });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get submission by ID
// @route   GET /api/submissions/:id
// @access  Public
const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update submission status
// @route   PUT /api/submissions/:id/status
// @access  Private/Admin
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }

        submission.status = status;
        submission.reviewed = status !== 'pending';
        await submission.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSubmissions,
    addSubmission,
    getSubmissionById,
    updateStatus
};
