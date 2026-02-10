const mongoose = require('mongoose');
const Tool = require('./backend/models/Tool');
require('dotenv').config({ path: './backend/.env' });

const checkTools = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-tools');
        const tools = await Tool.find().limit(10);
        console.log('Tools found:', JSON.stringify(tools, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkTools();
