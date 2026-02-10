import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const NewsletterModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
        if (hasSeenModal) return;

        // Show after 10 seconds
        const timer = setTimeout(() => setIsOpen(true), 15000);

        // Exit intent (desktop only)
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0) setIsOpen(true);
        };
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenNewsletterModal', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            localStorage.setItem('hasSeenNewsletterModal', 'true');
            setTimeout(() => setIsOpen(false), 2000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[210] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-[#111] rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full z-10">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Visual Side */}
                            <div className="hidden md:flex w-1/3 bg-accent/10 items-center justify-center p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent" />
                                <Sparkles className="w-12 h-12 text-accent relative z-10" />
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 p-8 md:p-10 text-center md:text-left">
                                <h3 className="text-2xl font-extrabold mb-2 dark:text-white">Wait! Don't Miss Out</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                                    Join 10,000+ developers getting the latest AI tools delivered to their inbox weekly. No spam, ever.
                                </p>

                                {status === 'success' ? (
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl font-bold flex items-center justify-center animate-in fade-in">
                                        <Sparkles className="w-5 h-5 mr-2" /> You're in! Welcome aboard.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-accent rounded-xl outline-none dark:text-white transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-accent/25"
                                        >
                                            {status === 'loading' ? 'Joining...' : 'Get Free Updates'}
                                        </button>
                                        <p className="text-xs text-center text-gray-400">
                                            Unsubscribe at any time.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NewsletterModal;
