import React, { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
        if (!formData.message.trim()) return "Message is required";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            setStatus({ type: 'error', message: error });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiBaseUrl}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (err) {
            let errorMessage = err.message || 'Something went wrong. Please try again later.';
            if (err.message === 'Failed to fetch') {
                errorMessage = 'Backend server is not responding. Please run "npm run dev" to start both frontend and backend.';
            }
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center py-8 bg-transparent animate-in fade-in duration-700 relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-24 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Info */}
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight dark:text-white">Get in <span className="text-accent">Touch</span></h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
                            Have a tool you'd like us to feature? Or just want to say hello? Drop us a message and we'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white text-sm">Email Us</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">roshanalee5110@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white text-sm">Live Chat</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Mon-Fri, 9am - 5pm EST</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold dark:text-white text-sm">Office</h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">123 AI Boulevard, Tech City</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/20 dark:border-gray-700 shadow-2xl">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-extrabold mb-1 uppercase tracking-wide text-accent">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border-none rounded-lg focus:ring-2 focus:ring-accent transition-all text-sm disabled:opacity-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-extrabold mb-1 uppercase tracking-wide text-accent">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border-none rounded-lg focus:ring-2 focus:ring-accent transition-all text-sm disabled:opacity-50"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-extrabold mb-1 uppercase tracking-wide text-accent">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-none rounded-lg focus:ring-2 focus:ring-accent transition-all text-sm disabled:opacity-50"
                                >
                                    <option>General Inquiry</option>
                                    <option>Suggest a Tool</option>
                                    <option>Business Collaboration</option>
                                    <option>Bug Report</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-extrabold mb-1 uppercase tracking-wide text-accent">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="How can we help?"
                                    disabled={loading}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border-none rounded-lg focus:ring-2 focus:ring-accent transition-all resize-none text-sm disabled:opacity-50"
                                    required
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {status.type === 'success' ? <span className="font-bold">✓</span> : <span className="font-bold">⚠</span>}
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
                <AdBanner />
            </div>
        </div>
    );
};

export default Contact;
