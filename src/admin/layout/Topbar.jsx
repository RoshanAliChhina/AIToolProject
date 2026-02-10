import React from 'react';
import { Menu, Sun, Moon, User } from 'lucide-react';

const Topbar = ({ onMenuToggle, darkMode, onDarkModeToggle, adminUser }) => {
    return (
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                {/* Left: Mobile Menu Button */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>

                {/* Center: Page Title (hidden on mobile) */}
                <div className="hidden lg:block">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {adminUser?.name || 'Admin'}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your AI tools directory
                    </p>
                </div>

                {/* Right: Admin Info & Dark Mode Toggle */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={onDarkModeToggle}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-700" />
                        )}
                    </button>

                    {/* Admin Avatar */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-md">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {adminUser?.name || 'Admin'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Administrator
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
