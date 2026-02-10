import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toolsData } from '../data/toolsData';
import { Link } from 'react-router-dom';
import { aiService } from '../services/aiService';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your AI assistant. How can I help you find a tool today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const nextId = useRef(2);
    const messagesEndRef = useRef(null);

    // Load chat history from localStorage
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatbot-messages');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                if (parsed.length > 1) {
                    setMessages(parsed);
                    nextId.current = Math.max(...parsed.map(m => m.id)) + 1;
                }
            } catch (error) {
                console.error('Failed to load chat history', error);
            }
        }
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem('chatbot-messages', JSON.stringify(messages));
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userInput = inputValue.trim();
        const userMessage = { id: nextId.current++, text: userInput, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Search for relevant tools first
            const relevantTools = await aiService.searchTools(userInput);
            
            // Build context from relevant tools
            const context = relevantTools.length > 0
                ? `Relevant tools found: ${relevantTools.slice(0, 3).map(t => t.name).join(', ')}. `
                : '';

            // Get AI response
            const botResponse = await aiService.chat(
                [{ role: 'user', content: userInput }],
                context
            );

            // Format response with tool links if tools were found
            let formattedResponse = botResponse;
            if (relevantTools.length > 0) {
                relevantTools.slice(0, 3).forEach(tool => {
                    const regex = new RegExp(tool.name, 'gi');
                    formattedResponse = formattedResponse.replace(
                        regex,
                        `<a href="/article/${tool.id}" class="text-accent underline hover:no-underline font-semibold">${tool.name}</a>`
                    );
                });
            }

            setMessages(prev => [...prev, { 
                id: nextId.current++, 
                text: formattedResponse, 
                sender: 'bot' 
            }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            // Fallback to enhanced mock response
            const fallbackResponse = generateResponse(userInput);
            setMessages(prev => [...prev, { 
                id: nextId.current++, 
                text: fallbackResponse, 
                sender: 'bot' 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const generateResponse = (input) => {
        const lowerInput = input.toLowerCase();
        const tools = toolsData;

        // Greetings
        if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
            return "Hello! 👋 I'm here to help you find the perfect AI tool. You can ask me about:\n\n• Coding tools\n• Design & UI tools\n• Writing assistants\n• Image generation\n• Video tools\n• Or search for a specific tool!";
        }

        // Tool search functionality
        if (lowerInput.includes('find') || lowerInput.includes('search') || lowerInput.includes('tool for') || lowerInput.includes('looking for')) {
            const searchTerms = lowerInput
                .replace(/find|search|tool for|looking for|a |an |the /gi, '')
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 2);

            if (searchTerms.length > 0) {
                const matchingTools = tools.filter(tool => 
                    searchTerms.some(term => 
                        tool.name.toLowerCase().includes(term) ||
                        tool.category.toLowerCase().includes(term) ||
                        tool.description.toLowerCase().includes(term) ||
                        tool.features.some(f => 
                            (typeof f === 'string' ? f : f.name || f.description || '').toLowerCase().includes(term)
                        )
                    )
                ).slice(0, 5);

                if (matchingTools.length > 0) {
                    const toolList = matchingTools.map((t, i) => 
                        `${i + 1}. **${t.name}** - ${t.category}`
                    ).join('\n');
                    return `I found ${matchingTools.length} tool(s) for you:\n\n${toolList}\n\nCheck them out in our directory!`;
                }
            }
        }

        // Category-based recommendations
        const categoryKeywords = {
            'IDE': ['coding', 'code', 'programming', 'developer', 'ide', 'editor'],
            'LLM': ['chat', 'conversation', 'language model', 'llm', 'gpt', 'chatbot'],
            'Image Generation': ['image', 'picture', 'generate image', 'ai art', 'image generation', 'design'],
            'Audio': ['audio', 'music', 'sound', 'voice', 'podcast'],
            'Video': ['video', 'movie', 'animation', 'video generation'],
            'Writing': ['write', 'writing', 'text', 'content', 'article', 'blog']
        };

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => lowerInput.includes(keyword))) {
                const categoryTools = tools.filter(t => t.category === category).slice(0, 3);
                if (categoryTools.length > 0) {
                    const toolNames = categoryTools.map(t => `**${t.name}**`).join(', ');
                    return `For ${category}, I recommend: ${toolNames}. These are some of the best tools in this category! Want to know more about any of them?`;
                }
            }
        }

        // Specific tool mentions
        const mentionedTool = tools.find(tool => 
            lowerInput.includes(tool.name.toLowerCase())
        );
        if (mentionedTool) {
            return `**${mentionedTool.name}** is a great ${mentionedTool.category} tool! ${mentionedTool.description} Check it out in our directory for more details.`;
        }

        // Pricing questions
        if (lowerInput.includes('free') || lowerInput.includes('price') || lowerInput.includes('cost')) {
            const freeTools = tools.filter(t => t.pricing.toLowerCase().includes('free')).slice(0, 3);
            if (freeTools.length > 0) {
                const toolNames = freeTools.map(t => `**${t.name}**`).join(', ');
                return `Here are some free tools: ${toolNames}. Browse our directory to see all free options!`;
            }
        }

        // Help/commands
        if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
            return "I can help you:\n\n• Find tools by category (coding, design, writing, etc.)\n• Search for specific tools\n• Get recommendations\n• Answer questions about tools\n\nJust ask me anything!";
        }

        // Default response with suggestions
        return "I'm here to help you find the perfect AI tool! Try asking me:\n\n• \"Find tools for coding\"\n• \"What are the best design tools?\"\n• \"Show me free tools\"\n• Or browse our directory for all options!";
    };

    return (
        <>
            <motion.div
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]"
                style={{ zIndex: 100 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform hover:shadow-accent/50 group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-w-[56px] min-h-[56px] flex items-center justify-center"
                        aria-label="Open chat"
                    >
                        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </button>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[400px] sm:h-[450px]"
                        style={{ zIndex: 100 }}
                        role="dialog"
                        aria-label="AI Assistant Chat"
                    >
                        {/* Header */}
                        <div className="bg-accent p-4 flex justify-between items-center text-white flex-shrink-0">
                            <div className="flex items-center space-x-2">
                                <Bot className="w-6 h-6" />
                                <span className="font-bold text-base">AI Assistant</span>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="hover:bg-white/20 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[36px] min-h-[36px] flex items-center justify-center"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div 
                            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-950 scroll-smooth"
                            style={{ scrollbarWidth: 'thin' }}
                        >
                            {messages.map((msg) => {
                                // Process message text - convert markdown-style links and bold
                                const processedText = msg.text
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline hover:no-underline font-semibold" target="_blank" rel="noopener noreferrer">$1</a>');
                                
                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                                ? 'bg-accent text-white rounded-br-none'
                                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                                }`}
                                        >
                                            <div 
                                                className="chat-message"
                                                dangerouslySetInnerHTML={{ __html: processedText }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none shadow-sm p-3">
                                        <div className="flex space-x-1.5">
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-2.5 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about tools..."
                                disabled={isTyping}
                                className="flex-1 px-2.5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:ring-2 focus:ring-accent focus:outline-none text-sm dark:text-white disabled:opacity-50 min-h-[40px]"
                                aria-label="Chat input"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="px-2.5 py-2.5 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
