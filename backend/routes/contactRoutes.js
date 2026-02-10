const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { contactAdminTemplate, contactConfirmTemplate } = require('../utils/emailTemplates');

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const date = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 1. Email to Admin (Incoming Notification)
        const adminMailOptions = {
            from: `"AI Tools System" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
            subject: `${subject} - New Submission`, // Strictly short heading
            text: `Contact Submission: ${subject}\nFrom: ${name} (${email})\n\nMessage:\n${message}`,
            html: contactAdminTemplate({ name, email, subject, message, date })
        };

        // 2. Confirmation to User (Auto-Response)
        const userMailOptions = {
            from: `"AI Tools Hub" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Inquiry Received: ${subject}`, // Short and clear
            text: `Hi ${name}, we have received your inquiry regarding "${subject}". Our team will review it and get back to you soon.`,
            html: contactConfirmTemplate({ name, subject })
        };

        // Send both
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

module.exports = router;
