import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import BlogCard from '../components/BlogCard';
import CTASection from '../components/CTASection';
import { toolsData } from '../data/toolsData';
import { articlesData } from '../data/articlesData';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const Home = () => {
    const { recentlyViewed } = useRecentlyViewed();

    return (
        <div className="animate-in fade-in duration-700 relative overflow-hidden bg-transparent transition-colors min-h-screen">
            <SEO title="Home" description="Discover the best free AI tools for developers and designers today." />

            {/* Hero Section */}
            <section className="relative pt-10 pb-10 md:pt-14 md:pb-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-bold mb-6 animate-bounce">
                        <Sparkles className="w-4 h-4" />
                        <span>Top AI Tools for Today</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight dark:text-white">
                        Supercharge Your Workflow <br className="hidden sm:block" /> With <span className="text-accent">Free AI Tools</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
                        Curated list of the most powerful free AI tools for developers, designers, and creators today. Ship faster, code smarter, and build the future.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/blog"
                            className="w-full sm:w-auto px-8 py-3 bg-accent text-white rounded-lg font-semibold text-base hover:bg-accent/90 hover:scale-105 transition-all shadow-lg shadow-accent/30 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[48px] flex items-center justify-center"
                        >
                            Explore Tools
                        </Link>
                        <Link
                            to="/about"
                            className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-semibold text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[48px] flex items-center justify-center"
                        >
                            Read Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Tools */}
            <section className="py-12 bg-gray-50/50 dark:bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-accent transition-colors duration-300">Featured Tools</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg transition-colors duration-300">Our hand-picked selection of the most impactful tools.</p>
                        </div>
                        <Link
                            to="/blog"
                            className="flex items-center font-semibold text-accent hover:text-accent/80 hover:underline text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded px-2"
                        >
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {toolsData.slice(0, 3).map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad Banner */}
            <AdBanner className="max-w-7xl px-4 sm:px-6 lg:px-8" />

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent transition-colors duration-300">Recently Viewed</h2>
                            </div>
                            <Link
                                to="/blog"
                                className="flex items-center font-semibold text-accent hover:text-accent/80 hover:underline text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded px-2"
                            >
                                View All <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {recentlyViewed.slice(0, 3).map(tool => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-accent">Latest from Blog</h2>
                    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                        {articlesData.map(article => (
                            <BlogCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </div >
    );
};

export default Home;
