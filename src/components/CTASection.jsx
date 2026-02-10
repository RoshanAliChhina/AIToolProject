import React, { useState } from 'react';
import { getBackendAdapter } from '../config/backend';

const CTASection = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const adapter = getBackendAdapter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await adapter.post('newsletter/subscribe', { email });

            setMessage({
                type: 'success',
                text: response.message || 'Successfully subscribed! Check your inbox.'
            });
            setEmail('');
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.message || 'Failed to subscribe. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-8 px-4">
            <div className="max-w-5xl mx-auto bg-accent rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-accent/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">Stay Ahead of the AI Curve</h2>
                    <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
                        Get weekly updates on new free AI tools and tutorials delivered straight to your inbox. No spam, just pure value.
                    </p>

                    {message.text && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${message.type === 'success'
                                ? 'bg-white text-emerald-600'
                                : 'bg-red-500 text-white'
                            }`}>
                            {message.type === 'success' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            {message.text}
                        </div>
                    )}

                    <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="flex-1 px-5 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white text-sm disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-white text-accent px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Subscribing...' : 'Subscribe Now'}
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-white/60">Join 5,000+ developers receiving our updates.</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
