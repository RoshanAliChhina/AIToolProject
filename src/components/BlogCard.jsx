import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ article, variant = 'default' }) => {
    // For related articles in blog detail page, use vertical layout
    const isVertical = variant === 'vertical' || variant === 'related';

    return (
        <Link
            to={`/blog-article/${article.id}`}
            className={`flex ${isVertical ? 'flex-col' : 'flex-col md:flex-row'} gap-6 p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group h-full mb-4`}
        >
            <div className={`${isVertical ? 'w-full' : 'md:w-1/3'} aspect-video rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700 relative`}>
                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.nextElementSibling;
                            if (placeholder) placeholder.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center absolute inset-0"
                    style={{ display: article.image ? 'none' : 'flex' }}
                >
                    <svg className="w-10 h-10 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>

            <div className="flex-1 flex flex-col pt-0">
                <div className="space-y-2 mb-4">
                    {/* Meta Information - Single line to decrease height */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 border-l border-gray-200 dark:border-gray-700 pl-4">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{article.readingTime} min read</span>
                        </div>
                        {article.category && (
                            <span className="px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] dark:bg-green-900/30 dark:text-green-400 rounded-md text-[10px] font-bold uppercase tracking-wider ml-auto">
                                {article.category}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold dark:text-white text-[#1A202E] leading-tight group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {article.excerpt || article.description || 'Read the full article to learn more.'}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 2).map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-1 bg-[#F3F4F6] dark:bg-gray-700 text-[#4B5563] dark:text-gray-300 rounded-lg text-[11px] font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-1.5 px-4 py-2 bg-accent/5 group-hover:bg-accent text-accent group-hover:text-white rounded-xl text-[12px] font-bold transition-all duration-300 border border-accent/10">
                        View Detailed Article
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
