import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';
import { articlesData } from '../data/articlesData';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO';
import ShareBar from '../components/ShareBar';

const BlogArticle = () => {
    const { id } = useParams();
    const article = articlesData.find(a => a.id === parseInt(id));

    // Scroll to top when article changes
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Link to="/" className="text-accent hover:underline">
                        Go back to home
                    </Link>
                </div>
            </div>
        );
    }

    // Get related articles (same category or random)
    const relatedArticles = articlesData
        .filter(a => a.id !== article.id && (a.category === article.category || !article.category))
        .slice(0, 3);

    // Format content with markdown-like formatting
    const formatContent = (content) => {
        if (!content) return null;

        return content
            .split('\n\n')
            .map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                // Handle headings
                if (trimmed.startsWith('## ')) {
                    const headingText = trimmed.replace('## ', '');
                    return (
                        <h2
                            key={index}
                            className="text-lg md:text-xl font-medium mt-10 mb-5 dark:text-white text-gray-900 leading-tight scroll-mt-20"
                            id={`heading-${index}`}
                        >
                            {headingText}
                        </h2>
                    );
                }
                if (trimmed.startsWith('### ')) {
                    const headingText = trimmed.replace('### ', '');
                    return (
                        <h3
                            key={index}
                            className="text-base md:text-lg font-medium mt-8 mb-4 dark:text-white text-gray-900 leading-tight scroll-mt-20"
                            id={`heading-${index}`}
                        >
                            {headingText}
                        </h3>
                    );
                }
                // Handle bold text
                if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.split('**').length === 3) {
                    return (
                        <p key={index} className="font-medium text-base md:text-lg mb-6 text-accent leading-relaxed">
                            {trimmed.replace(/\*\*/g, '')}
                        </p>
                    );
                }
                // Handle lists
                if (trimmed.startsWith('- ') || trimmed.match(/^\d+\./)) {
                    const items = trimmed.split('\n').filter(item => item.trim());
                    if (items.length === 0) return null;
                    return (
                        <ul key={index} className="mb-6 space-y-3">
                            {items.map((item, i) => (
                                <li key={i} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed pl-8 relative">
                                    <span className="absolute left-0 top-0.125rem w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                                    <span>{item.replace(/^[-*]\s*|\d+\.\s*/, '')}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }
                // Handle regular paragraphs
                if (trimmed.length > 0) {
                    return (
                        <p
                            key={index}
                            className="mb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed"
                        >
                            {trimmed}
                        </p>
                    );
                }
                return null;
            })
            .filter(Boolean);
    };

    return (
        <div className="min-h-screen bg-transparent transition-colors">
            <SEO
                title={article.title}
                description={article.excerpt}
                image={article.image}
            />

            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Back Navigation */}
                <div className="max-w-3xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-accent text-sm font-medium mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>
                </div>

                {/* Article Header */}
                <header className="max-w-3xl mx-auto mb-10 md:mb-12">
                    {article.category && (
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold mb-4">
                            {article.category}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight dark:text-white text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.01em' }}>
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-accent font-semibold">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                        {article.readingTime && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>{article.readingTime} min read</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {article.image && (
                    <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-auto object-cover"
                            loading="eager"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="max-w-3xl mx-auto article-content mb-12 mt-8">
                    {formatContent(article.content)}
                </div>

                {/* Share Bar */}
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <ShareBar />
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mt-20 pt-16 border-t border-gray-100 dark:border-gray-800">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 dark:text-white text-[#1A202E] tracking-tight text-center">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedArticles.map(relatedArticle => (
                                <BlogCard key={relatedArticle.id} article={relatedArticle} variant="related" />
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
};

export default BlogArticle;

