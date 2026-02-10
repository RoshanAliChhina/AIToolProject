import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Search, Cpu, Scale, Shield, LogIn, LogOut, User } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Import comparison context
import { useComparison } from '../context/ComparisonContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ onComparisonClick }) => {
    // Load dark mode from localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        try {
            // Check localStorage first
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return saved === 'true';
            }
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return true;
            }
            return false;
        } catch (error) {
            console.warn('Error reading dark mode preference:', error);
            return false;
        }
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Safe useComparison with fallback
    let comparisonCount = 0;
    try {
        const comparison = useComparison();
        comparisonCount = comparison?.comparisonCount || 0;
    } catch (error) {
        console.warn('Comparison context not available:', error);
        comparisonCount = 0;
    }

    // Always call useAuth hook (React Hooks rules)
    const { user, logout, isAdmin } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const isAuthenticated = !!user;

    // Toggle dark mode handler
    const handleDarkModeToggle = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        // Apply immediately
        const html = document.documentElement;
        const body = document.body;
        if (newDarkMode) {
            html.classList.add('dark');
            body.classList.add('dark');
        } else {
            html.classList.remove('dark');
            body.classList.remove('dark');
        }

        // Save to localStorage
        try {
            localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
        } catch (error) {
            // Silently fail in case of storage issues
        }
    };

    // Apply dark mode class on mount and state changes
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (darkMode) {
            html.classList.add('dark');
            body.classList.add('dark');
        } else {
            html.classList.remove('dark');
            body.classList.remove('dark');
        }

        // Save to localStorage
        try {
            localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
        } catch (error) {
            // Silently fail
        }
    }, [darkMode]);

    return (
        <nav className="nav-on-top top-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.15)_0%,rgba(167,243,208,0.1)_30%,rgba(167,243,208,0.05)_50%,transparent_70%),#fafafa]/80 dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(5,150,105,0.08)_30%,rgba(5,150,105,0.04)_50%,transparent_70%),#020617]/80 backdrop-blur-md" role="navigation" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group" aria-label="AI Tools Hub Home">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-xl flex items-center justify-center shadow-md shadow-accent/20 group-hover:shadow-lg group-hover:shadow-accent/30 group-hover:scale-105 transition-all duration-300">
                                <Cpu className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-xl font-bold font-sans tracking-tight text-gray-900 dark:text-white">
                                AI<span className="text-accent">Tools</span>Hub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6 relative z-50">
                        <NavLink to="/" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-all duration-300 font-bold text-base tracking-wide border-b-2 pb-1 ${isActive ? 'text-accent border-accent' : 'border-transparent hover:border-accent'}`}>Home</NavLink>
                        <NavLink to="/blog" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-all duration-300 font-bold text-base tracking-wide border-b-2 pb-1 ${isActive ? 'text-accent border-accent' : 'border-transparent hover:border-accent'}`}>Tools List</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-all duration-300 font-bold text-base tracking-wide border-b-2 pb-1 ${isActive ? 'text-accent border-accent' : 'border-transparent hover:border-accent'}`}>About</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-all duration-300 font-bold text-base tracking-wide border-b-2 pb-1 ${isActive ? 'text-accent border-accent' : 'border-transparent hover:border-accent'}`}>Contact</NavLink>
                        {comparisonCount > 0 && (
                            <button
                                onClick={onComparisonClick}
                                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
                                title="View Comparison"
                                aria-label={`View comparison with ${comparisonCount} tool${comparisonCount !== 1 ? 's' : ''}`}
                            >
                                <Scale className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
                                    {comparisonCount > 9 ? '9+' : comparisonCount}
                                </span>
                            </button>
                        )}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-purple-600 dark:text-purple-400 cursor-pointer"
                                aria-label="Admin Panel"
                                title="Admin Panel"
                            >
                                <Shield className="w-5 h-5" />
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400 hidden xl:inline truncate max-w-[120px]">
                                    {user?.name || user?.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
                                    aria-label="Logout"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[40px] cursor-pointer"
                                aria-label="Login"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        )}
                        <button
                            onClick={handleDarkModeToggle}
                            type="button"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" aria-hidden="true" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3 relative z-50">
                        <button
                            onClick={handleDarkModeToggle}
                            type="button"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-[linear-gradient(135deg,rgba(16,185,129,0.15)_0%,rgba(167,243,208,0.1)_30%,rgba(167,243,208,0.05)_50%,transparent_70%),#fafafa] dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(5,150,105,0.08)_30%,rgba(5,150,105,0.04)_50%,transparent_70%),#020617] animate-in fade-in slide-in-from-top-4 z-[140]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className={({ isActive }) => `block px-3 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center font-medium ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/blog" className={({ isActive }) => `block px-3 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center font-medium ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>Tools List</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `block px-3 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center font-medium ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>About</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `block px-3 py-2.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center font-medium ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                        {comparisonCount > 0 && (
                            <button
                                onClick={() => {
                                    onComparisonClick();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center gap-2"
                            >
                                <Scale className="w-4 h-4" />
                                Compare ({comparisonCount})
                            </button>
                        )}
                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link to="/admin" className="block px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-purple-600 dark:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px] flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                        <Shield className="w-4 h-4" />
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[44px] flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px] flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;

