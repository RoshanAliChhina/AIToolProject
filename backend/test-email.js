const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function verify() {
    console.log('Testing SMTP connection with:');
    console.log(`Service: ${process.env.EMAIL_SERVICE}`);
    console.log(`User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('\n✅ SUCCESS: Connection to email server is established and credentials are valid!');
    } catch (error) {
        console.error('\n❌ ERROR: Connection failed!');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure "2-Step Verification" is ON in your Google Account.');
        console.log('2. Ensure you are using a 16-character "App Password", NOT your regular Gmail password.');
        console.log('3. Double check for typos in the .env file.');
    }
}

verify();
