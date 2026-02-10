import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wrench, MessageSquare, Users, LogOut, X } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const Sidebar = ({ isOpen, onClose, onLogout }) => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
    const navItems = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/tools', icon: Wrench, label: 'Tools' },
        { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
        { to: '/admin/users', icon: Users, label: 'Users' },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64 bg-white/80 dark:bg-gray-900/80 
                    backdrop-blur-xl border-r border-gray-200 dark:border-gray-800
                    shadow-xl z-50 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-xl flex items-center justify-center shadow-md shadow-accent/20">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-gray-900 dark:text-white  tracking-tight">
                                    Admin Panel
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-500">
                                    AI Tools Hub
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Close sidebar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={onClose}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl
                                    font-medium transition-all duration-200
                                    ${isActive
                                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                                text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                                font-medium transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            <ConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={onLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out? You will need to sign in again to access the admin panel."
                confirmText="Logout"
            />
        </>
    );
};

export default Sidebar;
