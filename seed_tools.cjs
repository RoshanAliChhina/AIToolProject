const mongoose = require('mongoose');
const Tool = require('./backend/models/Tool');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

// We need to read the toolsData from the file manually since it's an ESM file and we are in CJS
const seedTools = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-tools');

        // Delete existing tools to avoid duplicates during development
        await Tool.deleteMany({});

        // This is a bit hacky but we need the data
        // For a real app, you'd have a proper migration/seed system
        // I'll define some core tools to seed based on the toolsData.js content
        const toolsToSeed = [
            { _id: '65c7a5f1e4b0a1b2c3d4e5f1', name: "Cursor AI", category: "IDE", description: "The AI-first code editor", image: "", link: "https://cursor.com", pricing: "Freemium", status: "Approved" },
            { _id: '65c7a5f1e4b0a1b2c3d4e5f2', name: "ChatGPT", category: "LLM", description: "The industry-standard conversational AI", image: "", link: "https://chatgpt.com", pricing: "Freemium", status: "Featured", featured: true },
            { _id: '29', name: "Blackbox AI", category: "DevTools", description: "The AI coding assistant", image: "", link: "https://www.blackbox.ai", pricing: "Freemium", status: "Approved" }
        ];

        await Tool.insertMany(toolsToSeed);
        console.log('Database Seeded Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedTools();
