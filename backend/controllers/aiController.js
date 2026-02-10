// AI Controller - Proxy for external AI services
// This allows the frontend to call our backend instead of external APIs directly

const chatProxy = async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ success: false, message: 'Invalid messages' });
    }

    try {
        const provider = process.env.AI_PROVIDER || 'huggingface';

        // This is a simplified proxy. In a real app, you'd call HuggingFace/OpenAI here.
        // For now, we'll implement a basic logic that delegates to the configured service.

        let responseContent = "";

        if (provider === 'huggingface') {
            const hfKey = process.env.HUGGINGFACE_API_KEY;
            const model = process.env.HUGGING_FACE_MODEL || 'meta-llama/Llama-3.2-3B-Instruct';

            if (!hfKey) {
                return res.status(200).json({
                    content: "AI service not fully configured on backend. Please set HUGGINGFACE_API_KEY in .env"
                });
            }

            // Simple text aggregation for the proxy (HuggingFace format)
            const conversationText = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n') + '\nAssistant:';

            const hfResponse = await fetch(
                `https://api-inference.huggingface.co/models/${model}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${hfKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: conversationText,
                        parameters: { max_new_tokens: 500, temperature: 0.7 }
                    }),
                }
            );

            const data = await hfResponse.json();
            responseContent = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;

            if (responseContent && responseContent.includes('Assistant:')) {
                responseContent = responseContent.split('Assistant:').pop().trim();
            }
        } else {
            // Mock response if no provider configured
            responseContent = "I am the AI proxy service. I received your message but no external provider is configured in the backend .env file.";
        }

        res.status(200).json({ content: responseContent || "No response generated" });
    } catch (error) {
        console.error('AI Proxy Error:', error);
        res.status(500).json({ success: false, message: 'AI service error' });
    }
};

module.exports = {
    chatProxy
};
