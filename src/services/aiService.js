// AI Service - Supports Hugging Face (FREE), Groq (FREE), OpenAI, and Claude
// Automatically falls back to mock responses if API keys not configured
// Hugging Face is the recommended FREE option (100% free, no credit card needed)

class AIService {
  constructor() {
    // Default to Hugging Face (best free option)
    this.provider = import.meta.env.VITE_AI_PROVIDER || 'huggingface';
    this.huggingfaceKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    this.groqKey = import.meta.env.VITE_GROQ_API_KEY;
    this.openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.claudeKey = import.meta.env.VITE_CLAUDE_API_KEY;
    this.apiUrl = import.meta.env.VITE_CHATBOT_API_URL; // Proxy URL (recommended)
  }

  async chat(messages, context = '') {
    // Use proxy if available (recommended for production)
    if (this.apiUrl) {
      return this.chatViaProxy(messages, context);
    }

    // Priority order: Hugging Face (FREE) > Groq (FREE) > OpenAI > Claude
    // Check provider first, then auto-detect if no provider specified
    
    // If provider is explicitly set, use it
    if (this.provider === 'huggingface' && this.huggingfaceKey) {
      return this.chatWithHuggingFace(messages, context);
    }
    if (this.provider === 'groq' && this.groqKey) {
      return this.chatWithGroq(messages, context);
    }
    if (this.provider === 'openai' && this.openaiKey) {
      return this.chatWithOpenAI(messages, context);
    }
    if (this.provider === 'claude' && this.claudeKey) {
      return this.chatWithClaude(messages, context);
    }

    // Auto-detect: Try free options first (Hugging Face > Groq), then paid
    if (this.huggingfaceKey) {
      return this.chatWithHuggingFace(messages, context);
    }
    if (this.groqKey) {
      return this.chatWithGroq(messages, context);
    }
    if (this.openaiKey) {
      return this.chatWithOpenAI(messages, context);
    }
    if (this.claudeKey) {
      return this.chatWithClaude(messages, context);
    }

    // Fallback to enhanced mock response
    return this.getMockResponse(messages[messages.length - 1]?.content || '');
  }

  async chatViaProxy(messages, context) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant for an AI tools directory. Help users find the best AI tools for their needs. ${context ? `Context: ${context}` : ''} Be concise and helpful.`
            },
            ...messages
          ],
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return data.content || data.message || data.text;
    } catch (error) {
      console.error('Proxy API error:', error);
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  async chatWithOpenAI(messages, context) {
    try {
      // Try dynamic import - will fail gracefully if package not installed
      let OpenAI;
      try {
        // Use dynamic string to avoid static analysis
        const moduleName = 'openai';
        const openaiModule = await import(/* @vite-ignore */ moduleName);
        OpenAI = openaiModule.default;
      } catch {
        console.warn('OpenAI package not installed. Install with: npm install openai');
        return this.getMockResponse(messages[messages.length - 1]?.content || '');
      }

      const openai = new OpenAI({
        apiKey: this.openaiKey,
        dangerouslyAllowBrowser: true, // Only for development
      });

      const completion = await openai.chat.completions.create({
        model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for an AI tools directory. Help users find the best AI tools for their needs. ${context ? `Context: ${context}` : ''} Be concise and helpful.`
          },
          ...messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        ],
        max_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS || '500'),
        temperature: parseFloat(import.meta.env.VITE_AI_TEMPERATURE || '0.7'),
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  async chatWithClaude(messages, context) {
    try {
      // Try dynamic import - will fail gracefully if package not installed
      let Anthropic;
      try {
        // Use dynamic string to avoid static analysis
        const moduleName = '@anthropic-ai/sdk';
        const anthropicModule = await import(/* @vite-ignore */ moduleName);
        Anthropic = anthropicModule.default;
      } catch {
        console.warn('Anthropic package not installed. Install with: npm install @anthropic-ai/sdk');
        return this.getMockResponse(messages[messages.length - 1]?.content || '');
      }

      const anthropic = new Anthropic({
        apiKey: this.claudeKey,
      });

      const message = await anthropic.messages.create({
        model: import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
        max_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS || '500'),
        system: `You are a helpful assistant for an AI tools directory. Help users find the best AI tools for their needs. ${context ? `Context: ${context}` : ''} Be concise and helpful.`,
        messages: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      });

      return message.content[0].text;
    } catch (error) {
      console.error('Claude API error:', error);
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  async chatWithHuggingFace(messages, context) {
    try {
      const model = import.meta.env.VITE_HUGGINGFACE_MODEL || 'meta-llama/Llama-3.2-3B-Instruct';
      const userMessage = messages[messages.length - 1]?.content || '';
      
      // Build conversation history for better context
      let conversationText = `You are a helpful assistant for an AI tools directory. Help users find the best AI tools for their needs. ${context ? `Context: ${context}` : ''}\n\n`;
      
      // Add conversation history (last 3 messages for context)
      const recentMessages = messages.slice(-3);
      recentMessages.forEach(msg => {
        if (msg.role === 'user') {
          conversationText += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          conversationText += `Assistant: ${msg.content}\n`;
        }
      });
      
      conversationText += 'Assistant:';
      
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.huggingfaceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: conversationText,
            parameters: {
              max_new_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS || '500'),
              temperature: parseFloat(import.meta.env.VITE_AI_TEMPERATURE || '0.7'),
              return_full_text: false,
              top_p: 0.9,
              repetition_penalty: 1.1,
            },
          }),
        }
      );

      // Handle model loading (first request might take time)
      if (response.status === 503) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.error?.includes('loading')) {
          // Model is loading, wait a bit and retry
          await new Promise(resolve => setTimeout(resolve, 5000));
          return this.chatWithHuggingFace(messages, context);
        }
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMsg = error.error || error.message || 'Hugging Face API error';
        console.warn('Hugging Face API error:', errorMsg);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      
      // Handle different response formats
      let generatedText = '';
      if (Array.isArray(data) && data[0]?.generated_text) {
        generatedText = data[0].generated_text;
      } else if (data.generated_text) {
        generatedText = data.generated_text;
      } else if (data[0]?.summary_text) {
        generatedText = data[0].summary_text;
      }
      
      // Clean up the response (remove the prompt if included)
      if (generatedText.includes('Assistant:')) {
        generatedText = generatedText.split('Assistant:').pop().trim();
      }
      
      return generatedText || this.getMockResponse(userMessage);
    } catch (error) {
      console.error('Hugging Face API error:', error);
      // Fallback to mock response
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  async chatWithGroq(messages, context) {
    try {
      const model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant';
      
      // Build messages array with system prompt
      const chatMessages = [
        {
          role: 'system',
          content: `You are a helpful assistant for an AI tools directory. Help users find the best AI tools for their needs. ${context ? `Context: ${context}` : ''} Be concise and helpful.`
        },
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ];
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: chatMessages,
          max_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS || '500'),
          temperature: parseFloat(import.meta.env.VITE_AI_TEMPERATURE || '0.7'),
          top_p: 0.9,
          stream: false,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        const errorMsg = error.error?.message || error.message || 'Groq API error';
        console.warn('Groq API error:', errorMsg);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response from Groq API');
      }
      
      return content;
    } catch (error) {
      console.error('Groq API error:', error);
      // Fallback to mock response
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  getMockResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Enhanced mock responses with tool search
    if (lowerInput.includes('coding') || lowerInput.includes('code') || lowerInput.includes('developer')) {
      return "For coding, I recommend checking out tools like Cursor AI, GitHub Copilot, or v0.dev. They are excellent for code generation and debugging. You can find them in the 'IDE' category on our tools list.";
    }
    
    if (lowerInput.includes('design') || lowerInput.includes('ui') || lowerInput.includes('designer')) {
      return "If you're looking for design tools, consider Adobe Firefly, Midjourney, or v0.dev. They are great for generating UI components and images. Check the 'Image Generation' or 'Generative UI' categories.";
    }
    
    if (lowerInput.includes('write') || lowerInput.includes('writing') || lowerInput.includes('content')) {
      return "For writing, tools like ChatGPT, Claude, or Gemini are top-tier assistants. They can help with content creation, editing, and brainstorming. Look in the 'LLM' category.";
    }
    
    if (lowerInput.includes('video') || lowerInput.includes('audio') || lowerInput.includes('media')) {
      return "For video and audio, check out Descript or other media editing tools. They can help with editing, transcription, and generation. Explore the 'Video' or 'Audio' categories.";
    }
    
    if (lowerInput.includes('free tools')) {
      return "Yes, many tools offer free plans! You can filter by 'Free' pricing on our tools list page. Most tools have free tiers or trials available.";
    }
    
    if (lowerInput.includes('categories')) {
      return "We have tools in categories like: IDE, LLM, Image Generation, Generative UI, Video, Audio, and more. You can use the filters on the Tools List page to explore by category.";
    }
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm here to help you find the perfect AI tool. What are you looking for? You can ask about coding, design, writing, or any specific tool category!";
    }
    
    if (lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with? Feel free to browse our tools directory or ask me more questions!";
    }
    
    // Default response
    return `I can help you find AI tools! Try asking about:
- Coding and development tools
- Design and image generation
- Writing and content creation
- Video and audio editing
- Or browse our full directory on the Tools List page

What would you like to explore?`;
  }

  async searchTools(query) {
    try {
      // Use static import since toolsData is already imported statically in other components
      const { toolsData } = await import(/* @vite-ignore */ '../data/toolsData');
      const lowerQuery = query.toLowerCase();
      
      return toolsData.filter(tool =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.features.some(feature => 
          (feature.name || feature).toLowerCase().includes(lowerQuery)
        )
      );
    } catch (error) {
      console.error('Error searching tools:', error);
      return [];
    }
  }
}

// Export singleton instance
export const aiService = new AIService();

// Helper function
export const chatWithAI = async (messages, context) => {
  return await aiService.chat(messages, context);
};

