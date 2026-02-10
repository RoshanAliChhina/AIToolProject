const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-tools-directory');
        console.log('MongoDB Connected...');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@aitoolshub.com' });

        if (adminExists) {
            console.log('Admin user already exists!');
            console.log('Email: admin@aitoolshub.com');
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@aitoolshub.com',
            password: 'admin123', // Will be hashed by the User model pre-save hook
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@aitoolshub.com');
        console.log('Password: admin123');
        console.log('\n⚠️  Please change this password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
