import cursorLogo from '../assets/Images/cursor_ai.svg';
import v0Logo from '../assets/Images/v0_logo.svg';
import claudeLogo from '../assets/Images/Claude 3.5 Sonnet.svg';
import deepseekLogo from '../assets/Images/deepseek-logo-icon.svg';
import grokLogo from '../assets/Images/grok-icon.svg';
import mistralLogo from '../assets/Images/mistral-color.svg';
import cohereLogo from '../assets/Images/cohere-color.svg';
import metaLogo from '../assets/Images/meta-ai-icon.svg';
import qwenLogo from '../assets/Images/qwen-color.svg';
import piLogo from '../assets/Images/pi-symbol-icon.svg';
import characterLogo from '../assets/Images/icons8-character-ai.svg';
import fireflyLogo from '../assets/Images/adobe-firefly-ai-icon.svg';
import sdLogo from '../assets/Images/stability-color.svg';
import kreaLogo from '../assets/Images/krea-ai-icon.svg';
import ideogramLogo from '../assets/Images/ideogram-ai-icon.svg';
import sunoLogo from '../assets/Images/suno-ai-icon.svg';
import udioLogo from '../assets/Images/udio-color.svg';
import descriptLogo from '../assets/Images/Descript_idUuG2vK6A_0.svg';
import otterLogo from '../assets/Images/otter.svg';
import firefliesLogo from '../assets/Images/Fireflies.ai_idjU1WbcfM_0.svg';
import tabnineLogo from '../assets/Images/Tabnine.png';
import codeiumLogo from '../assets/Images/codium-ai-icon8421.logowik.com.webp';
import boltLogo from '../assets/Images/bolt-ai-builder-icon.svg';
import langchainLogo from '../assets/Images/langchain-color.svg';
import flowiseLogo from '../assets/Images/Flowise AI.jpeg';
import chatgptLogo from '../assets/Images/chatgpt-icon.svg';
import geminiLogo from '../assets/Images/google-gemini-icon.svg';
import perplexityLogo from '../assets/Images/perplexity-ai-icon.svg';
import blackboxLogo from '../assets/Images/blackbox-ai-logo.png';
import replitLogo from '../assets/Images/replit-color.svg';
import githubCopilotLogo from '../assets/Images/github-copilot-icon.svg';

export const toolsData = [
    {
        id: 1,
        name: "Cursor AI",
        category: "IDE",
        description: "The AI-first code editor built for pair programming with AI.",
        image: cursorLogo,
        features: [
            { name: "AI Chat", description: "Chat with your codebase and ask complex questions about your logic." },
            { name: "Code Generation", description: "Generate entire functions or files from simple natural language prompts." },
            { name: "Bug Fixing", description: "Automatically detect and fix bugs in your code with one click." }
        ],
        pricing: "Free / Paid",
        link: "https://cursor.com",
        dateAdded: "2024-01-15",
        popularity: 98
    },
    {
        id: 26,
        name: "ChatGPT",
        category: "LLM",
        description: "The industry-standard conversational AI by OpenAI, now with advanced reasoning.",
        image: chatgptLogo,
        features: [
            { name: "GPT-4o", description: "Flagship model capable of real-time reasoning across audio, vision, and text." },
            { name: "Canvas", description: "New interface for working with ChatGPT on writing and coding projects." },
            { name: "Custom GPTs", description: "Create tailored versions of ChatGPT for specific tasks or workflows." }
        ],
        pricing: "Free / Plus",
        link: "https://chatgpt.com",
        dateAdded: "2024-06-15",
        popularity: 100
    },
    {
        id: 27,
        name: "Google Gemini",
        category: "LLM",
        description: "Google's most capable AI model, built to be multimodal from the ground up.",
        image: geminiLogo,
        features: [
            { name: "1.5 Pro", description: "Features a massive 2 million token context window for large scale analysis." },
            { name: "Google Integration", description: "Seamlessly works across Docs, Gmail, and other Google Workspace apps." },
            { name: "Multimodal", description: "Natively understands and reasons across text, images, video, and audio." }
        ],
        pricing: "Free / Advanced",
        link: "https://gemini.google.com",
        dateAdded: "2024-06-20",
        popularity: 99
    },
    {
        id: 28,
        name: "Perplexity AI",
        category: "Search",
        description: "The world's first AI-powered answer engine, providing reliable, real-time information.",
        image: perplexityLogo,
        features: [
            { name: "Pro Search", description: "Advanced search that breaks down complex questions into multi-step research." },
            { name: "Citations", description: "Every answer is backed by verifiable web sources and direct citations." },
            { name: "Pages", description: "Create beautiful, shared reports and articles directly from your research." }
        ],
        pricing: "Free / Pro",
        link: "https://perplexity.ai",
        dateAdded: "2024-06-25",
        popularity: 97
    },
    {
        id: 2,
        name: "v0.dev",
        category: "UI Design",
        description: "Generative UI system by Vercel to build React components with ease.",
        image: v0Logo,
        features: [
            { name: "React Support", description: "Generate high-quality React components that follow best practices." },
            { name: "Tailwind CSS", description: "Styling is handled automatically with utility-first Tailwind CSS classes." },
            { name: "Copy-Paste Ready", description: "Immediate access to code that you can drop straight into your project." }
        ],
        pricing: "Free Tier",
        link: "https://v0.dev",
        dateAdded: "2024-02-10",
        popularity: 92
    },
    {
        id: 3,
        name: "Claude 3.5 Sonnet",
        category: "LLM",
        description: "Most capable model from Anthropic, excels at coding tasks.",
        image: claudeLogo,
        features: [
            { name: "Fast Reasoning", description: "Get answers and code solutions incredibly fast without compromising quality." },
            { name: "Large Context", description: "Paste entire files or multiple documents to get comprehensive analysis." },
            { name: "Visual Analysis", description: "Understand charts, UI designs, and technical diagrams from images." }
        ],
        pricing: "Free / Paid",
        link: "https://anthropic.com",
        dateAdded: "2024-03-01",
        popularity: 99
    },
    {
        id: 4,
        name: "DeepSeek",
        category: "LLM",
        description: "Strong open-source LLM series known for exceptional coding and math performance.",
        image: deepseekLogo,
        features: [
            { name: "Code Mastery", description: "One of the best open-source models for Python and C++ development." },
            { name: "Math Reasoning", description: "Solves complex mathematical problems with high precision." },
            { name: "Cheap API", description: "Extremely cost-effective for developers building AI applications." }
        ],
        pricing: "Free / API",
        link: "https://deepseek.com",
        dateAdded: "2024-04-01",
        popularity: 95
    },
    {
        id: 5,
        name: "Grok (xAI)",
        category: "LLM",
        description: "Real-time AI from xAI with direct access to X (formerly Twitter) platform data.",
        image: grokLogo,
        features: [
            { name: "Real-time Info", description: "Accesses current world events via the X platform." },
            { name: "No-Nonsense", description: "Designed to have a bit of wit and a rebellious streak." },
            { name: "API Access", description: "Available for developers via the xAI console." }
        ],
        pricing: "Premium",
        link: "https://grok.x.ai",
        dateAdded: "2024-04-10",
        popularity: 94
    },
    {
        id: 6,
        name: "Mistral AI",
        category: "LLM",
        description: "European champion of efficient and powerful open-source large language models.",
        image: mistralLogo,
        features: [
            { name: "Efficiency", description: "Models like Mistral 7B outperform much larger competitors." },
            { name: "Open Weights", description: "Fully customize and deploy on your own infrastructure." },
            { name: "La Plateforme", description: "High-performance API access for business integration." }
        ],
        pricing: "Free / Paid",
        link: "https://mistral.ai",
        dateAdded: "2024-03-15",
        popularity: 93
    },
    {
        id: 7,
        name: "Cohere AI",
        category: "LLM",
        description: "Enterprise-grade AI focusing on RAG and multilingual search capabilities.",
        image: cohereLogo,
        features: [
            { name: "Command R+", description: "Optimized for long-context and Retrieval Augmented Generation." },
            { name: "Multilingual", description: "Supports over 100 languages with high accuracy." },
            { name: "Embeddings", description: "Industry-leading search and classification performance." }
        ],
        pricing: "Free / Enterprise",
        link: "https://cohere.com",
        dateAdded: "2024-02-20",
        popularity: 91
    },
    {
        id: 8,
        name: "Meta AI (Llama)",
        category: "LLM",
        description: "The world's leading open-source LLM, powering innovation across the globe.",
        image: metaLogo,
        features: [
            { name: "Llama 3", description: "State-of-the-art weights available for everyone to build upon." },
            { name: "Meta AI Chat", description: "Seamlessly integrated into WhatsApp, Instagram, and Facebook." },
            { name: "Ecosystem", description: "Massive community support and thousands of fine-tuned variants." }
        ],
        pricing: "Free / Open Source",
        link: "https://meta.ai",
        dateAdded: "2024-04-18",
        popularity: 97
    },
    {
        id: 9,
        name: "Adobe Firefly",
        category: "Image",
        description: "Creators' companion for safe and ethical generative AI in creative workflows.",
        image: fireflyLogo,
        features: [
            { name: "Generative Fill", description: "Perfectly blend new content into existing images in Photoshop." },
            { name: "Commercial Safety", description: "Trained on Adobe Stock to ensure copyright-safe output." },
            { name: "Text to Vector", description: "Create high-quality SVG graphics from simple prompts." }
        ],
        pricing: "Free / Paid",
        link: "https://firefly.adobe.com",
        dateAdded: "2024-03-25",
        popularity: 96
    },
    {
        id: 10,
        name: "Stable Diffusion",
        category: "Image",
        description: "Open-source image generation that gives you full control over your creative vision.",
        image: sdLogo,
        features: [
            { name: "Full Control", description: "Use ControlNet and LoRA to guide the generation precisely." },
            { name: "Local Execution", description: "Run on your own GPU without any subscription fees." },
            { name: "SDXL", description: "High-resolution output with photorealistic details." }
        ],
        pricing: "Free / Self-hosted",
        link: "https://stability.ai",
        dateAdded: "2024-01-20",
        popularity: 95
    },
    {
        id: 11,
        name: "Krea AI",
        category: "Image",
        description: "Real-time AI visuals and video generation for the next generation of creators.",
        image: kreaLogo,
        features: [
            { name: "Real-time Gen", description: "See the image change as you draw or update your prompt." },
            { name: "AI Video", description: "Animate images and create cinematic shots with ease." },
            { name: "Enhancer", description: "Upscale and add detail to any image with AI." }
        ],
        pricing: "Free Tier",
        link: "https://krea.ai",
        dateAdded: "2024-05-10",
        popularity: 92
    },
    {
        id: 12,
        name: "Ideogram",
        category: "Image",
        description: "The best AI for typography and text within generated images.",
        image: ideogramLogo,
        features: [
            { name: "Typography", description: "Generates readable and beautiful text within complex designs." },
            { name: "Logo Design", description: "Perfect for creating professional-grade logos and icons." },
            { name: "Style Palette", description: "Easy-to-use style tags for consistent artistic output." }
        ],
        pricing: "Free / Paid",
        link: "https://ideogram.ai",
        dateAdded: "2024-05-01",
        popularity: 93
    },
    {
        id: 13,
        name: "Suno AI",
        category: "Audio",
        description: "Create complete songs with vocals and melodies from just a text prompt.",
        image: sunoLogo,
        features: [
            { name: "Full Songs", description: "Generates lyrics, vocals, and instruments in any genre." },
            { name: "V3.5 Model", description: "Incredible audio quality with 4-minute song lengths." },
            { name: "Style Versatility", description: "From Jazz to Metal, Suno understands every musical style." }
        ],
        pricing: "Free / Paid",
        link: "https://suno.ai",
        dateAdded: "2024-04-20",
        popularity: 96
    },
    {
        id: 14,
        name: "Udio",
        category: "Audio",
        description: "High-fidelity AI music generation that rivals professional studio recordings.",
        image: udioLogo,
        features: [
            { name: "Studio Quality", description: "Produces crystal clear audio with complex arrangements." },
            { name: "Vocal Mastery", description: "Realistic emotional depth in AI-generated singing." },
            { name: "Community Remix", description: "Collaborate and remix tracks created by the community." }
        ],
        pricing: "Free / Paid",
        link: "https://udio.com",
        dateAdded: "2024-04-30",
        popularity: 94
    },
    {
        id: 15,
        name: "Descript",
        category: "Video",
        description: "Edit video and podcasts by editing text. The magic editor for creators.",
        image: descriptLogo,
        features: [
            { name: "Overdub", description: "Fix audio mistakes by just typing the new words." },
            { name: "Studio Sound", description: "Remove noise and make any mic sound like a studio." },
            { name: "Eye Contact", description: "AI correction that makes you look at the camera." }
        ],
        pricing: "Free Tier",
        link: "https://descript.com",
        dateAdded: "2024-02-15",
        popularity: 93
    },
    {
        id: 16,
        name: "Otter AI",
        category: "Productivity",
        description: "Live meeting transcription and AI summaries for all your calls.",
        image: otterLogo,
        features: [
            { name: "Real-time Transcript", description: "Accurate text conversion as people speak in meetings." },
            { name: "AI Summaries", description: "Automatically extracts action items and key decisions." },
            { name: "OtterPilot", description: "Automatically joins Zoom/Teams calls to record for you." }
        ],
        pricing: "Free Tier",
        link: "https://otter.ai",
        dateAdded: "2024-01-30",
        popularity: 92
    },
    {
        id: 17,
        name: "Fireflies AI",
        category: "Productivity",
        description: "AI search and analysis for all your voice conversations and meetings.",
        image: firefliesLogo,
        features: [
            { name: "Search Voice", description: "Search your entire meeting history like a Google Doc." },
            { name: "Topic Tracking", description: "Track specific mentions of competitors or pricing." },
            { name: "Workflow Sync", description: "Integrates with Slack, Notion, and HubSpot automatically." }
        ],
        pricing: "Free / Paid",
        link: "https://fireflies.ai",
        dateAdded: "2024-02-01",
        popularity: 91
    },
    {
        id: 18,
        name: "Tabnine",
        category: "DevTools",
        description: "The private AI code assistant that runs on your local infrastructure.",
        image: tabnineLogo,
        features: [
            { name: "Private AI", description: "Keep your code 100% private with air-gapped deployments." },
            { name: "Enterprise Ready", description: "Fine-tune on your own codebase for better suggestions." },
            { name: "IDE Support", description: "Works perfectly in VS Code, IntelliJ, and more." }
        ],
        pricing: "Free / Pro",
        link: "https://tabnine.com",
        dateAdded: "2024-01-10",
        popularity: 90
    },
    {
        id: 19,
        name: "Codeium",
        category: "DevTools",
        description: "Lightning-fast AI code completion and search, free for individuals forever.",
        image: codeiumLogo,
        features: [
            { name: "Free Forever", description: "High-quality AI completion without any cost for individuals." },
            { name: "Context Aware", description: "In-depth understanding of your multi-file projects." },
            { name: "Speed", description: "Incredibly low latency for real-time code suggestions." }
        ],
        pricing: "Free / Team",
        link: "https://codeium.com",
        dateAdded: "2024-01-25",
        popularity: 94
    },
    {
        id: 20,
        name: "Bolt.new",
        category: "DevTools",
        description: "Prompt-to-full-stack web apps directly in your browser with StackBlitz.",
        image: boltLogo,
        features: [
            { name: "Browser IDE", description: "Environment with Node.js and shell built right into the browser." },
            { name: "Full-Stack Gen", description: "Generates frontend and backend code with one prompt." },
            { name: "Instant Deploy", description: "Go live with your generated app in seconds." }
        ],
        pricing: "Free Tier",
        link: "https://bolt.new",
        dateAdded: "2024-06-01",
        popularity: 96
    },
    {
        id: 21,
        name: "LangChain",
        category: "Framework",
        description: "The standard framework for building context-aware reasoning applications.",
        image: langchainLogo,
        features: [
            { name: "Chains", description: "Easily link different LLMs and tools together in sequence." },
            { name: "Integrations", description: "Over 500+ integrations with vector DBs and APIs." },
            { name: "LangSmith", description: "Powerful tools for debugging and monitoring AI apps." }
        ],
        pricing: "Open Source",
        link: "https://langchain.com",
        dateAdded: "2024-01-05",
        popularity: 98
    },
    {
        id: 22,
        name: "Flowise AI",
        category: "Framework",
        description: "Drag-and-drop UI to build your customized LLM orchestration apps.",
        image: flowiseLogo,
        features: [
            { name: "Visual Builder", description: "Create complex AI workflows without writing single line of code." },
            { name: "Docker Ready", description: "Deploy anywhere with standard container support." },
            { name: "API endpoints", description: "Convert your visual flows into usable HTTP APIs instantly." }
        ],
        pricing: "Open Source",
        link: "https://flowiseai.com",
        dateAdded: "2024-01-12",
        popularity: 92
    },
    {
        id: 23,
        name: "Pi AI",
        category: "LLM",
        description: "Personal AI designed to be supportive, smart, and always there for you.",
        image: piLogo,
        features: [
            { name: "Emotional Intel", description: "Conversations that feel natural and emotionally resonant." },
            { name: "Voice Mode", description: "Industry-leading natural voice for real-time talking." },
            { name: "Wellbeing", description: "Focuses on supportive dialogue and personal growth." }
        ],
        pricing: "Free",
        link: "https://pi.ai",
        dateAdded: "2024-03-10",
        popularity: 89
    },
    {
        id: 24,
        name: "Character AI",
        category: "Chat",
        description: "Interact with millions of user-created AI characters and personalities.",
        image: characterLogo,
        features: [
            { name: "Creative Roleplay", description: "Talk to historical figures, fictional characters, or bots." },
            { name: "Character Builder", description: "Easy tools to create your own unique AI personalities." },
            { name: "Group Chat", description: "Have multiple AI characters talk to each other and you." }
        ],
        popularity: 95,
        pricing: "Free / Plus",
        link: "https://character.ai",
        dateAdded: "2024-02-10"
    },
    {
        id: 25,
        name: "Qwen AI",
        category: "LLM",
        description: "Powerful language model series from Alibaba Cloud, excelling in multilingual tasks.",
        image: qwenLogo,
        features: [
            { name: "Qwen-72B", description: "State-of-the-art weights with incredible reasoning power." },
            { name: "Multilingual", description: "Experts in Chinese and 20+ other global languages." },
            { name: "Code Support", description: "Strong performance in coding and mathematical reasoning." }
        ],
        pricing: "Free / Open Source",
        link: "https://github.com/QwenLM/Qwen",
        dateAdded: "2024-05-15",
        popularity: 91
    },
    {
        id: 29,
        name: "Blackbox AI",
        category: "DevTools",
        description: "The AI coding assistant that helps you code faster and better.",
        image: blackboxLogo,
        features: [
            { name: "Code Chat", description: "Ask questions about your code and get instant answers." },
            { name: "Code Search", description: "Search for code snippets across millions of public repositories." },
            { name: "Autocomplete", description: "Smart code completion that suggests entire lines or blocks." }
        ],
        pricing: "Free / Pro",
        link: "https://www.blackbox.ai",
        dateAdded: "2024-07-01",
        popularity: 96
    },
    {
        id: 30,
        name: "Visual Studio Code",
        category: "IDE",
        description: "Code editing. Redefined. Free. Built on open source. Runs everywhere.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
        features: [
            { name: "IntelliSense", description: "Go beyond syntax highlighting and autocomplete with smart completions." },
            { name: "Run and Debug", description: "Debug code right from the editor with break points, call stacks, and an interactive console." },
            { name: "Extensions", description: "Add languages, debuggers, and tools to your installation to support your development workflow." }
        ],
        pricing: "Free",
        link: "https://code.visualstudio.com",
        dateAdded: "2024-01-01",
        popularity: 100
    },
    {
        id: 31,
        name: "GitHub Copilot",
        category: "DevTools",
        description: "The world's most widely adopted AI developer tool.",
        image: githubCopilotLogo,
        features: [
            { name: "Code Completion", description: "Get code suggestions based on the context of your comments and code." },
            { name: "Chat", description: "Ask questions about your codebase and get answers in natural language." },
            { name: "Pull Requests", description: "Accelerate code reviews with AI-generated summaries and descriptions." }
        ],
        pricing: "Paid / Free for Students",
        link: "https://github.com/features/copilot",
        dateAdded: "2024-02-01",
        popularity: 99
    },
    {
        id: 32,
        name: "Replit",
        category: "IDE",
        description: "Build software collaboratively from anywhere.",
        image: replitLogo,
        features: [
            { name: "AI Ghostwriter", description: "An AI pair programmer that helps you write code faster." },
            { name: "Multiplayer", description: "Code together in real-time with Google Docs-style collaboration." },
            { name: "Deploy", description: "Instantly host your apps with a single click." }
        ],
        pricing: "Free / Paid",
        link: "https://replit.com",
        dateAdded: "2024-03-01",
        popularity: 94
    },
    {
        id: 33,
        name: "Google Colab",
        category: "IDE",
        description: "Write and execute Python in your browser.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
        features: [
            { name: "Zero Config", description: "Get started quickly without any setup." },
            { name: "Free GPUs", description: "Access powerful GPUs for free to run your machine learning models." },
            { name: "Easy Sharing", description: "Share your notebooks with others just like you modify Google Docs." }
        ],
        pricing: "Free / Paid",
        link: "https://colab.research.google.com",
        dateAdded: "2024-01-05",
        popularity: 95
    },
    {
        id: 34,
        name: "PyCharm Community",
        category: "IDE",
        description: "The Python IDE for professional developers.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/PyCharm_Icon.svg",
        features: [
            { name: "Intelligent Editor", description: "Code completion, on-the-fly error highlighting, and code fixes." },
            { name: "Debugger", description: "A powerful visual debugger for Python, JavaScript, and other languages." },
            { name: "VCS Integration", description: "Seamless integration with Git, GitHub, Mercurial, and other VCS systems." }
        ],
        pricing: "Free",
        link: "https://www.jetbrains.com/pycharm",
        dateAdded: "2024-01-20",
        popularity: 93
    },
    {
        id: 35,
        name: "Jupyter Notebook",
        category: "IDE",
        description: "Open-source web application for creating and sharing documents with live code.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg",
        features: [
            { name: "Interactive", description: "Code, visualize, and explain your data analysis in a single document." },
            { name: "Multi-language", description: "Support for over 40 programming languages including Python, R, and Julia." },
            { name: "Big Data", description: "Integrate with big data tools like Apache Spark." }
        ],
        pricing: "Free",
        link: "https://jupyter.org",
        dateAdded: "2024-01-15",
        popularity: 96
    },
    {
        id: 36,
        name: "IntelliCode",
        category: "DevTools",
        description: "AI-assisted code development.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
        features: [
            { name: "Whole-line Completions", description: "Predicts the next chunk of code based on your current context." },
            { name: "API Usage", description: "See examples of how other developers have used a particular API." },
            { name: "Refactoring", description: "Spot repeated edits and apply them to other places in your code." }
        ],
        pricing: "Free",
        link: "https://visualstudio.microsoft.com/services/intellicode/",
        dateAdded: "2024-01-25",
        popularity: 88
    }
];
