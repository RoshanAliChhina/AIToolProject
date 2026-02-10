import React, { useState, useEffect } from 'react';
import { Wrench, MessageSquare, Users, Clock, PlusCircle, CheckCircle2, UserPlus, Star, ChevronRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { getBackendAdapter } from '../../config/backend';

const Dashboard = () => {
    const [statsData, setStatsData] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const adapter = getBackendAdapter();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const statsResponse = await adapter.get('admin/stats');
                const activityResponse = await adapter.get('admin/activity');

                // If it's the express adapter, it might return { success, stats }
                const stats = statsResponse.stats || statsResponse;
                const activity = activityResponse.activity || activityResponse;

                setStatsData(stats);
                setRecentActivity(activity);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        {
            icon: Wrench,
            title: 'Total Tools',
            value: statsData?.totalTools?.value || '0',
            change: statsData?.totalTools?.change || 0,
            colorClass: 'text-blue-600'
        },
        {
            icon: MessageSquare,
            title: 'Total Reviews',
            value: statsData?.totalReviews?.value || '0',
            change: statsData?.totalReviews?.change || 0,
            colorClass: 'text-purple-600'
        },
        {
            icon: Users,
            title: 'Total Users',
            value: statsData?.totalUsers?.value || '0',
            change: statsData?.totalUsers?.change || 0,
            colorClass: 'text-green-600'
        },
        {
            icon: Clock,
            title: 'Pending Tools',
            value: statsData?.pendingTools?.value || '0',
            change: statsData?.pendingTools?.change || 0,
            colorClass: 'text-orange-600'
        }
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'tool': return PlusCircle;
            case 'review': return MessageSquare;
            case 'user': return UserPlus;
            default: return CheckCircle2;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'tool': return 'text-blue-500';
            case 'review': return 'text-indigo-500';
            case 'user': return 'text-amber-500';
            default: return 'text-emerald-500';
        }
    };

    const getActivityBg = (type) => {
        switch (type) {
            case 'tool': return 'bg-blue-50 dark:bg-blue-900/20';
            case 'review': return 'bg-indigo-50 dark:bg-indigo-900/20';
            case 'user': return 'bg-amber-50 dark:bg-amber-900/20';
            default: return 'bg-emerald-50 dark:bg-emerald-900/20';
        }
    };

    const formatTime = (date) => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.round(diffMs / 60000);
        const diffHours = Math.round(diffMins / 60);
        const diffDays = Math.round(diffHours / 24);

        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Real-time overview of your AI tools directory.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        colorClass={stat.colorClass}
                    />
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
                <div className="px-10 py-8 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Recent Activity
                            </h2>
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Live Feed</p>
                    </div>
                    <button className="px-6 py-2.5 rounded-2xl text-[13px] font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 transition-all active:scale-95">
                        View All
                    </button>
                </div>

                <div className="p-8 relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[63px] top-12 bottom-12 w-px bg-slate-100 dark:bg-slate-800" />

                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="relative flex items-center justify-between p-4 rounded-[24px] transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 group"
                            >
                                <div className="flex items-center gap-8">
                                    {/* Icon Column */}
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-full ${getActivityBg(activity.type)} flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}>
                                            {React.createElement(getActivityIcon(activity.type), { className: `w-5 h-5 ${getActivityColor(activity.type)} transition-transform duration-500 group-hover:rotate-12` })}
                                        </div>
                                        {/* Subtle Glow behind icon */}
                                        <div className={`absolute inset-0 rounded-full ${getActivityBg(activity.type)} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-[16px] mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {activity.action}
                                        </h4>
                                        {activity.tool !== 'N/A' && (
                                            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-0">
                                                {activity.tool}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-700/50 shadow-sm transition-colors group-hover:bg-white dark:group-hover:bg-slate-800">
                                    <span className="text-[12px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">
                                        {formatTime(activity.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-bold mb-2">Manage Tools</h3>
                    <p className="text-blue-100 text-sm mb-4">
                        Add, edit, or remove AI tools from the directory
                    </p>
                    <a
                        href="/admin/tools"
                        className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors"
                    >
                        Go to Tools →
                    </a>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-bold mb-2 ">Review Management</h3>
                    <p className="text-purple-100 text-sm mb-4">
                        Moderate and manage user reviews
                    </p>
                    <a
                        href="/admin/reviews"
                        className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors"
                    >
                        Go to Reviews →
                    </a>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-bold mb-2">User Management</h3>
                    <p className="text-green-100 text-sm mb-4">
                        Manage users and their permissions
                    </p>
                    <a
                        href="/admin/users"
                        className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-semibold transition-colors"
                    >
                        Go to Users →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
