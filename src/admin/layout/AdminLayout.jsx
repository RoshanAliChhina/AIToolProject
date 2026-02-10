import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return saved === 'true';
            }
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    });

    const navigate = useNavigate();
    const auth = useAuth();
    const { user, logout } = auth;

    // Apply dark mode
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

        try {
            localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
        } catch (error) {
            // Silently fail
        }
    }, [darkMode]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                onLogout={handleLogout}
            />

            {/* Mobile Menu Button - Only visible on mobile when sidebar is closed */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Main Content Area */}
            <div className="lg:pl-64 min-h-screen">

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
