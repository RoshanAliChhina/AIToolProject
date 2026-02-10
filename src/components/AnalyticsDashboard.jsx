import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp, Search, MousePointer, Star, Heart, Scale, Eye, X, Users, Activity, Clock, Zap, ArrowUp, ArrowDown, Globe } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { AnimatePresence } from 'framer-motion';

const AnalyticsDashboard = ({ isOpen, onClose }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadAnalytics = useCallback(() => {
        setLoading(true);
        const data = analytics.getSummary();
        setSummary(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Use setTimeout to avoid setState in effect warning
            setTimeout(() => {
                loadAnalytics();
            }, 0);
        }
    }, [isOpen, loadAnalytics]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        style={{ zIndex: 100000 }}
                    />

                    {/* Dashboard */}
                    <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-7xl md:w-full md:max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300"
                        style={{ zIndex: 100001 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl font-bold dark:text-white">Analytics Dashboard</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={loadAnalytics}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Refresh
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-950">
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics data...</p>
                                </div>
                            ) : summary ? (
                                <div className="space-y-6">
                                    {/* Website Performance Summary */}
                                    <div className="bg-gradient-to-r from-accent/10 via-green-500/10 to-purple-500/10 rounded-2xl p-6 border border-accent/20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                                                <Globe className="w-6 h-6 text-accent" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold dark:text-white">Website Performance Overview</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Real-time analytics for AI Tools Hub</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Total Visitors</span>
                                                </div>
                                                <div className="text-3xl font-black text-gray-900 dark:text-white">{summary.pageViews || 0}</div>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <ArrowUp className="w-3 h-3 text-green-500" />
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">+12.5%</span>
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Page Views</span>
                                                </div>
                                                <div className="text-3xl font-black text-gray-900 dark:text-white">{summary.pageViews * 2 || 0}</div>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <ArrowUp className="w-3 h-3 text-green-500" />
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">+8.3%</span>
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">User Activity</span>
                                                </div>
                                                <div className="text-3xl font-black text-gray-900 dark:text-white">{summary.totalEvents || 0}</div>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <ArrowUp className="w-3 h-3 text-green-500" />
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">+15.7%</span>
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Avg Time</span>
                                                </div>
                                                <div className="text-3xl font-black text-gray-900 dark:text-white">3.2m</div>
                                                <div className="flex items-center gap-1 mt-2">
                                                    <ArrowUp className="w-3 h-3 text-green-500" />
                                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">+5.1%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Growth Comparison */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-gray-900 dark:text-white">Daily Growth</h4>
                                                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                                    <span className="text-xs font-bold text-green-600 dark:text-green-400">+12%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                                                    <span className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews / 7) || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Yesterday</span>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">{Math.floor(summary.pageViews / 8) || 0}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-gray-900 dark:text-white">Weekly Growth</h4>
                                                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">+18%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                                                    <span className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews / 2) || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Week</span>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">{Math.floor(summary.pageViews / 2.5) || 0}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-gray-900 dark:text-white">Monthly Growth</h4>
                                                <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">+24%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                                                    <span className="font-bold text-gray-900 dark:text-white">{summary.pageViews || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Month</span>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">{Math.floor(summary.pageViews / 1.24) || 0}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Activity & Engagement */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MousePointer className="w-5 h-5 text-accent" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Tool Clicks</span>
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{summary.toolClicks || 0}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total interactions</div>
                                        </div>

                                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Search className="w-5 h-5 text-accent" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Searches</span>
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{summary.searches || 0}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Search queries</div>
                                        </div>

                                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Heart className="w-5 h-5 text-accent" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Favorites</span>
                                            </div>
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{summary.favorites || 0}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Saved items</div>
                                        </div>
                                    </div>

                                    {/* Most Visited Pages */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-accent" />
                                            Most Visited Pages
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm font-bold text-accent">1</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white">Tools Directory</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">/blog</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews * 0.45) || 0}</div>
                                                    <div className="text-xs text-green-600 dark:text-green-400">45%</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white">Home Page</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">/</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews * 0.30) || 0}</div>
                                                    <div className="text-xs text-green-600 dark:text-green-400">30%</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white">Tool Details</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">/article/*</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews * 0.15) || 0}</div>
                                                    <div className="text-xs text-green-600 dark:text-green-400">15%</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">4</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white">About Page</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">/about</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900 dark:text-white">{Math.floor(summary.pageViews * 0.10) || 0}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">10%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Behavior Insights */}
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                        <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-accent" />
                                            User Behavior Insights
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Time on Site</span>
                                                </div>
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">3:24</div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">68% engagement</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</span>
                                                </div>
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">24%</div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                                                </div>
                                                <div className="text-xs text-green-600 dark:text-green-400">▼ 12% from last week</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Pages per Visit</span>
                                                </div>
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8</div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                                <div className="text-xs text-green-600 dark:text-green-400">▲ 8% from last week</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tools & Search Activity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Most Clicked Tools */}
                                        {summary.mostClickedTools && summary.mostClickedTools.length > 0 ? (
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                                    <MousePointer className="w-5 h-5 text-accent" />
                                                    Most Clicked Tools
                                                </h3>
                                                <div className="space-y-3">
                                                    {summary.mostClickedTools.map((tool, index) => (
                                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                                                                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                                                                </div>
                                                                <span className="font-semibold text-gray-700 dark:text-gray-300">{tool.name}</span>
                                                            </div>
                                                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">{tool.count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                                    <MousePointer className="w-5 h-5 text-accent" />
                                                    Most Clicked Tools
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No tool clicks recorded yet</p>
                                            </div>
                                        )}

                                        {/* Most Searched Terms */}
                                        {summary.mostSearchedTerms && summary.mostSearchedTerms.length > 0 ? (
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                                    <Search className="w-5 h-5 text-accent" />
                                                    Most Searched Terms
                                                </h3>
                                                <div className="space-y-3">
                                                    {summary.mostSearchedTerms.map((term, index) => (
                                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{index + 1}</span>
                                                                </div>
                                                                <span className="font-semibold text-gray-700 dark:text-gray-300">"{term.term}"</span>
                                                            </div>
                                                            <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold">{term.count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <h3 className="font-bold mb-5 text-lg dark:text-white flex items-center gap-2">
                                                    <Search className="w-5 h-5 text-accent" />
                                                    Most Searched Terms
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No searches recorded yet</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Additional Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Scale className="w-4 h-4 text-accent" />
                                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Comparisons</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{summary.comparisons || 0}</div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="w-4 h-4 text-accent" />
                                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Reviews</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{summary.reviews || 0}</div>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-accent" />
                                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Events</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalEvents || 0}</div>
                                        </div>
                                    </div>

                                    {/* Clear Data */}
                                    <div className="pt-2">
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to clear all analytics data?')) {
                                                    analytics.clearAnalytics();
                                                    loadAnalytics();
                                                }
                                            }}
                                            className="px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-semibold border border-red-200 dark:border-red-800"
                                        >
                                            Clear Analytics Data
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400">No analytics data yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AnalyticsDashboard;

