import React, { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;
        setStatus('loading');
        // Simulate API
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            // Reset after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        }, 1500);
    };
    return (
        <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 pt-20 pb-12 px-8 sm:px-12 lg:px-16 xl:px-20 overflow-hidden">
            {/* Decorative Background Elements - Triple Gradient Orbs */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                {/* Radial dot grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand - 3D Card Effect */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center mb-6 relative group">
                            <div className="relative">
                                <span className="text-4xl font-black tracking-tight bg-gradient-to-r from-accent via-green-500 to-accent bg-clip-text text-transparent animate-gradient bg-size-200 drop-shadow-[0_4px_12px_rgba(76,175,80,0.3)] hover:drop-shadow-[0_6px_16px_rgba(76,175,80,0.5)] transition-all duration-500 hover:scale-105 inline-block">
                                    AI<span className="text-black dark:text-gray-900">Tools</span>Hub
                                </span>
                            </div>
                            <div className="flex gap-3 mt-5">
                                <span className="px-4 py-1.5 bg-gradient-to-r from-accent/20 to-accent/10 text-accent text-xs font-bold rounded-full shadow-md border border-accent/30 hover:shadow-lg hover:scale-105 transition-all duration-300">100+ Tools</span>
                                <span className="px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-600 dark:text-green-500 text-xs font-bold rounded-full shadow-md border border-green-500/30 hover:shadow-lg hover:scale-105 transition-all duration-300">Free Forever</span>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs text-center">
                            Curating the best free AI tools to supercharge your development workflow today and beyond. <span className="font-bold text-accent drop-shadow-sm">Innovate faster.</span>
                        </p>
                    </div>

                    {/* Quick Links - Enhanced */}
                    <div>
                        <h4 className="text-lg font-extrabold mb-6 relative inline-block">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Quick Links</span>
                            <span className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-accent to-green-500 rounded-full opacity-70"></span>
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Tools List
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal - Enhanced */}
                    <div>
                        <h4 className="text-lg font-extrabold mb-6 relative inline-block">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Legal</span>
                            <span className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-70"></span>
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/privacy" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-accent rounded">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-accent rounded">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-accent rounded">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter - Enhanced */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-lg font-extrabold mb-6 relative inline-block">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Newsletter</span>
                            <span className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70"></span>
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center max-w-xs leading-relaxed">
                            Stay updated with latest AI tool launches. <span className="font-semibold text-purple-500">Exclusive insights!</span>
                        </p>
                        {status === 'success' ? (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 p-5 rounded-2xl text-sm font-semibold animate-in fade-in zoom-in-95 text-center w-full max-w-xs border-2 border-green-200 dark:border-green-800 shadow-lg">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <span className="text-xl">✓</span>
                                    <span>Thanks for subscribing!</span>
                                </div>
                                <span className="text-xs text-green-600 dark:text-green-500">You're all set! 🎉</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email for updates..."
                                        disabled={status === 'loading'}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none text-sm transition-all disabled:opacity-50 shadow-md group-hover:border-accent/50"
                                        aria-label="Email address for newsletter"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || !email}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-accent to-green-600 hover:from-accent/90 hover:to-green-500 text-white rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-105 active:scale-95 relative overflow-hidden group"
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Subscribing...
                                        </span>
                                    ) : (
                                        <>
                                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></span>
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Join Newsletter <Sparkles className="w-4 h-4" />
                                            </span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom - Enhanced */}
                <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center">
                    <div className="flex space-x-4 mb-8">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-blue-500/10 hover:to-blue-600/10 transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 overflow-hidden"
                            aria-label="Follow us on Twitter"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></span>
                            <Twitter className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors relative z-10" />
                        </a>
                        <a
                            href="https://github.com/RoshanAliChhina"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-gray-500/10 hover:to-gray-600/10 transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 overflow-hidden"
                            aria-label="Visit our GitHub"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></span>
                            <Github className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-500 transition-colors relative z-10" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/roshan-ali-770247371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-blue-700/10 hover:to-blue-800/10 transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-lg hover:shadow-xl hover:shadow-blue-700/20 overflow-hidden"
                            aria-label="Connect on LinkedIn"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></span>
                            <Linkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-700 transition-colors relative z-10" />
                        </a>
                        <a
                            href="mailto:roshansenew@gmail.com"
                            className="group relative p-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-accent/10 hover:to-green-600/10 transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg hover:shadow-xl hover:shadow-accent/20 overflow-hidden"
                            aria-label="Send us an email"
                        >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></span>
                            <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors relative z-10" />
                        </a>
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap justify-center">
                            <span>© 2025</span>
                            <span className="font-bold bg-gradient-to-r from-accent via-green-500 to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">AI Tools Hub</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                Crafted with
                                <Heart className="w-4 h-4 text-red-500 animate-pulse-slow" fill="currentColor" />
                                by
                                <span className="font-black text-blue-500 dark:text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]">
                                    Roshan Ali Chheena
                                </span>
                            </span>
                            <span>•</span>
                            <span>All rights reserved</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
