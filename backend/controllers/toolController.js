const Tool = require('../models/Tool');
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');
const { newToolNotificationTemplate } = require('../utils/emailTemplates');

// @desc    Get all tools
// @route   GET /api/tools
// @access  Public
exports.getTools = async (req, res) => {
    try {
        const { category, status, search, page = 1, limit = 10 } = req.query;
        let query = {};

        if (category && category !== 'All') query.category = category;
        if (status) query.status = status;
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const tools = await Tool.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
        const total = await Tool.countDocuments(query);

        res.status(200).json({
            success: true,
            count: tools.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: tools
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single tool
// @route   GET /api/tools/:id
// @access  Public
exports.getTool = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);
        if (!tool) {
            return res.status(404).json({ success: false, message: 'Tool not found' });
        }
        res.status(200).json(tool);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new tool
// @route   POST /api/tools
// @access  Private/Admin
exports.createTool = async (req, res) => {
    try {
        const tool = await Tool.create(req.body);

        // Send email notifications to all newsletter subscribers
        try {
            const subscribers = await Newsletter.find({ isActive: true });

            if (subscribers.length > 0) {
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const toolUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/article/${tool._id}`;

                const emailHtml = newToolNotificationTemplate({
                    toolName: tool.name,
                    toolDescription: tool.description,
                    toolCategory: tool.category,
                    toolUrl: toolUrl,
                    toolLogo: tool.logo
                });

                // Send emails in batches to avoid rate limits
                const batchSize = 50;
                for (let i = 0; i < subscribers.length; i += batchSize) {
                    const batch = subscribers.slice(i, i + batchSize);

                    await Promise.all(batch.map(subscriber =>
                        transporter.sendMail({
                            from: `"AI Tools Hub" <${process.env.EMAIL_USER}>`,
                            to: subscriber.email,
                            subject: `🚀 New Tool Added: ${tool.name}`,
                            html: emailHtml
                        }).catch(err => {
                            console.error(`Failed to send email to ${subscriber.email}:`, err.message);
                        })
                    ));

                    // Small delay between batches
                    if (i + batchSize < subscribers.length) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }

                console.log(`✅ Sent new tool notification to ${subscribers.length} subscribers`);
            }
        } catch (emailError) {
            console.error('Newsletter email error:', emailError);
            // Don't fail the tool creation if emails fail
        }

        res.status(201).json(tool);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update tool
// @route   PUT /api/tools/:id
// @access  Private/Admin
exports.updateTool = async (req, res) => {
    try {
        const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!tool) {
            return res.status(404).json({ success: false, message: 'Tool not found' });
        }

        res.status(200).json(tool);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete tool
// @route   DELETE /api/tools/:id
// @access  Private/Admin
exports.deleteTool = async (req, res) => {
    try {
        const tool = await Tool.findByIdAndDelete(req.params.id);

        if (!tool) {
            return res.status(404).json({ success: false, message: 'Tool not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
