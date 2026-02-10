/**
 * Email Template Utility
 * Generates NAFEES (Premium, Polished, and Elegant) HTML templates.
 * Focuses on high-end SaaS aesthetics: Airy whitespace, subtle gradients, and refined typography.
 */

const colors = {
    primary: '#10b981', // Emerald 500
    primaryDark: '#065f46', // Emerald 800 (More luxury feel)
    primaryLight: '#d1fae5', // Emerald 100 for soft accents
    secondary: '#0f172a', // Slate 900 (Deep professional)
    background: '#f8fafc', // Slate 50 (Airy bg)
    white: '#ffffff',
    textMain: '#1e293b', // Slate 800
    textMuted: '#64748b', // Slate 500
    textLight: '#94a3b8', // Slate 400
    border: '#e2e8f0', // Slate 200
    divider: '#f1f5f9', // Slate 100
    shadow: 'rgba(15, 23, 42, 0.08)',
    premiumGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
};

/**
 * Standard NAFEES Premium Wrapper
 */
const getBaseTemplate = (content, previewText) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Tools Hub</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }
    </style>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            height: 100% !important;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: ${colors.background};
            color: ${colors.textMain};
            -webkit-font-smoothing: antialiased;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        .wrapper {
            width: 100%;
            background-color: ${colors.background};
            padding: 60px 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: ${colors.white};
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px ${colors.shadow}, 0 10px 15px -3px ${colors.shadow};
            border: 1px solid ${colors.divider};
        }

        .header {
            padding: 48px 40px 32px;
            text-align: center;
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            color: ${colors.secondary};
            text-decoration: none;
            display: inline-block;
            letter-spacing: -1.2px;
        }

        .logo span {
            color: ${colors.primary};
        }

        .content {
            padding: 0 48px 48px;
        }

        .badge {
            display: inline-block;
            padding: 6px 14px;
            background-color: ${colors.primaryLight};
            color: ${colors.primaryDark};
            border-radius: 12px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 24px;
        }

        .title {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 20px;
            color: ${colors.secondary};
            letter-spacing: -0.04em;
        }

        .paragraph {
            font-size: 16px;
            line-height: 1.6;
            color: ${colors.textMuted};
            margin-bottom: 32px;
        }

        /* NAFEES Card - Highly Polished */
        .nafees-card {
            background-color: ${colors.white};
            border: 1px solid ${colors.divider};
            border-radius: 24px;
            padding: 32px;
            margin-bottom: 32px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .label {
            font-size: 10px;
            font-weight: 800;
            color: ${colors.textLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 6px;
        }

        .value {
            font-size: 15px;
            font-weight: 600;
            color: ${colors.secondary};
            margin-bottom: 20px;
        }

        .value:last-child {
            margin-bottom: 0;
        }

        .message-section {
            padding: 24px 0;
            border-top: 1px solid ${colors.divider};
        }

        .message-label {
            font-size: 11px;
            font-weight: 700;
            color: ${colors.primary};
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .message-box {
            font-size: 15px;
            line-height: 1.7;
            color: ${colors.textMain};
            white-space: pre-wrap;
            background-color: #fafbfc;
            padding: 24px;
            border-radius: 20px;
            border: 1px solid #f0f4f8;
        }

        .button-container {
            padding-top: 24px;
            text-align: center;
        }

        .button {
            display: inline-block;
            padding: 18px 42px;
            background: ${colors.premiumGradient};
            color: ${colors.white} !important;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            border-radius: 18px;
            box-shadow: 0 20px 30px -10px rgba(16, 185, 129, 0.4);
        }

        .footer {
            padding: 48px 40px;
            text-align: center;
            background-color: #fafbfc;
            border-top: 1px solid ${colors.divider};
        }

        .footer-logo {
            font-size: 16px;
            font-weight: 700;
            color: ${colors.textLight};
            letter-spacing: -0.5px;
            margin-bottom: 20px;
            display: block;
        }

        .footer-nav {
            margin-bottom: 32px;
        }

        .footer-nav a {
            color: ${colors.textMuted};
            text-decoration: none;
            margin: 0 16px;
            font-size: 13px;
            font-weight: 500;
        }

        .copyright {
            font-size: 12px;
            color: ${colors.textLight};
            line-height: 1.8;
            margin: 0;
        }

        @media screen and (max-width: 600px) {
            .wrapper { padding: 30px 15px; }
            .container { border-radius: 24px; }
            .content { padding: 0 32px 40px; }
            .title { font-size: 28px; }
            .nafees-card { padding: 24px; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <a href="https://aitoolshub.com" class="logo">AI Tools<span> Hub</span></a>
            </div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                <span class="footer-logo">AI Tools Hub</span>
                <div class="footer-nav">
                    <a href="#">Directory</a>
                    <a href="#">Categories</a>
                    <a href="#">Contact</a>
                    <a href="#">Privacy</a>
                </div>
                <p class="copyright">&copy; ${new Date().getFullYear()} AI Tools Hub. Curating the best for builders.</p>
                <p class="copyright">San Francisco • London • Berlin</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

/**
 * Template for Incoming Contact Messages (To Admin)
 */
const contactAdminTemplate = (data) => {
    const { name, email, subject, message, date } = data;
    const ticketId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;

    const content = `
        <div class="badge">Inbound Inqury</div>
        <h1 class="title">New Submission <span style="color: ${colors.primary};">#${ticketId}</span></h1>
        
        <p class="paragraph">An entry has been received via the contact portal. We've compiled the primary details for your review below.</p>

        <div class="nafees-card">
            <div class="label">SENDER NAME</div>
            <div class="value">${name}</div>
            
            <div class="label">REPLY ADDRESS</div>
            <div class="value"><a href="mailto:${email}" style="color: ${colors.primary}; text-decoration: none; border-bottom: 1px solid ${colors.primary}40;">${email}</a></div>
            
            <div class="label">INQUIRY SUBJECT</div>
            <div class="value" style="color: ${colors.secondary};">${subject}</div>
            
            <div class="label">SUBMISSION TIME</div>
            <div class="value" style="margin-bottom: 0; color: ${colors.textMuted}; font-size: 13px;">${date}</div>
        </div>

        <div class="message-section">
            <div class="message-label">MESSAGE CONTENT</div>
            <div class="message-box">${message}</div>
        </div>
        
        <div class="button-container">
            <a href="mailto:${email}" class="button">Direct Response</a>
            <p style="margin-top: 20px; font-size: 12px; color: ${colors.textLight}; font-weight: 500;">Tip: You are replying directly to the sender's account.</p>
        </div>
    `;

    return getBaseTemplate(content, `Inquiry Alert: ${subject} from ${name}`);
};

/**
 * Template for Confirmation Message (To User)
 */
const contactConfirmTemplate = (data) => {
    const { name, subject } = data;
    const refId = `ATH-${Math.floor(1000 + Math.random() * 9000)}`;

    const content = `
        <div class="badge">Success Confirmation</div>
        <h1 class="title">Message logged. <span style="color: ${colors.primary};">✨</span></h1>
        
        <p class="paragraph">Hello <strong>${name}</strong>,<br><br>We have successfully received your inquiry regarding "<strong>${subject}</strong>". One of our specialists will review your request and get back to you shortly.</p>

        <div class="nafees-card" style="text-align: center; background-color: ${colors.background}; border: 1px solid ${colors.border};">
            <div class="label" style="margin-bottom: 12px;">REFERENCE IDENTITY</div>
            <div style="font-size: 24px; font-weight: 800; color: ${colors.secondary}; letter-spacing: 4px; padding-bottom: 4px;">${refId}</div>
            <div style="font-size: 11px; color: ${colors.textMuted}; font-weight: 500;">Status: Pending Review</div>
        </div>

        <p class="paragraph" style="text-align: center; font-size: 14px;">Average response window: <strong>&lt; 24 business hours</strong></p>
        
        <div class="button-container">
            <a href="https://aitoolshub.com" class="button">Explore New Tools</a>
        </div>
    `;

    return getBaseTemplate(content, "We've logged your inquiry. Our team is on it.");
};

/**
 * Template for Welcome Email (To New User)
 */
const welcomeEmailTemplate = (data) => {
    const { name } = data;

    const content = `
        <div class="badge">Welcome to the Hub</div>
        <h1 class="title">The world's AI at your fingertips. <span style="color: ${colors.primary};">🚀</span></h1>
        
        <p class="paragraph">Welcome aboard, <strong>${name}</strong>.<br><br>You've just joined a community of builders and innovators dedicated to excellence. Your journey into the smartest directory on the web starts here.</p>

        <div class="nafees-card">
            <div class="message-label" style="color: ${colors.secondary}; font-weight: 800;">YOUR JOURNEY INCLUDES</div>
            <div style="margin-top: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td width="30" valign="top" style="padding-bottom: 20px;"><span style="color: ${colors.primary}; font-weight: 800;">✓</span></td>
                        <td style="padding-bottom: 20px; font-size: 14px; color: ${colors.textMuted};"><strong>Curated Directory:</strong> Over 500+ verified tools.</td>
                    </tr>
                    <tr>
                        <td width="30" valign="top" style="padding-bottom: 20px;"><span style="color: ${colors.primary}; font-weight: 800;">✓</span></td>
                        <td style="padding-bottom: 20px; font-size: 14px; color: ${colors.textMuted};"><strong>Smart Filters:</strong> Find exactly what you need in seconds.</td>
                    </tr>
                    <tr>
                        <td width="30" valign="top"><span style="color: ${colors.primary}; font-weight: 800;">✓</span></td>
                        <td style="font-size: 14px; color: ${colors.textMuted};"><strong>Community Reviews:</strong> Honest feedback from real builders.</td>
                    </tr>
                </table>
            </div>
        </div>
        
        <div class="button-container" style="padding-top: 10px;">
            <a href="https://aitoolshub.com" class="button">Go to Dashboard</a>
            <p style="margin-top: 24px; font-size: 14px; color: ${colors.textLight};">Have questions? Just hit reply.</p>
        </div>
    `;

    return getBaseTemplate(content, "Welcome to AI Tools Hub. Let's build something amazing.");
};

/**
 * Template for New Tool Notification (To Newsletter Subscribers)
 */
const newToolNotificationTemplate = (data) => {
    const { toolName, toolDescription, toolCategory, toolUrl, toolLogo } = data;

    const content = `
        <div class="badge">New Tool Alert</div>
        <h1 class="title">Discover <span style="color: ${colors.primary};">${toolName}</span></h1>
        
        <p class="paragraph">We've just added a powerful new tool to our directory that we think you'll love!</p>

        <div class="nafees-card" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border: 2px solid ${colors.divider};">
            ${toolLogo ? `<div style="text-align: center; margin-bottom: 24px;"><img src="${toolLogo}" alt="${toolName}" style="max-width: 120px; height: auto; border-radius: 16px;"></div>` : ''}
            
            <div class="label">TOOL NAME</div>
            <div class="value" style="font-size: 20px; font-weight: 800; color: ${colors.secondary}; margin-bottom: 16px;">${toolName}</div>
            
            <div class="label">CATEGORY</div>
            <div class="value" style="color: ${colors.primary}; margin-bottom: 16px;">${toolCategory}</div>
            
            <div class="label">DESCRIPTION</div>
            <div class="value" style="line-height: 1.6; color: ${colors.textMuted};">${toolDescription}</div>
        </div>

        <div class="button-container">
            <a href="${toolUrl}" class="button">Explore ${toolName}</a>
            <p style="margin-top: 20px; font-size: 13px; color: ${colors.textLight}; font-weight: 500;">Click to view full details, pricing, and reviews</p>
        </div>

        <p class="paragraph" style="text-align: center; font-size: 13px; margin-top: 40px; padding-top: 32px; border-top: 1px solid ${colors.divider};">
            You're receiving this because you subscribed to AI Tools Hub newsletter.<br>
            <a href="#" style="color: ${colors.textMuted}; text-decoration: underline;">Unsubscribe</a> | <a href="#" style="color: ${colors.textMuted}; text-decoration: underline;">Update Preferences</a>
        </p>
    `;

    return getBaseTemplate(content, `New Tool Added: ${toolName} - ${toolCategory}`);
};

module.exports = {
    contactAdminTemplate,
    contactConfirmTemplate,
    welcomeEmailTemplate,
    newToolNotificationTemplate
};
