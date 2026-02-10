import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle, DollarSign, Star, Users, Clock, Sparkles } from 'lucide-react';
import { toolsData } from '../data/toolsData';
import ComparisonTable from '../components/ComparisonTable';
import CTASection from '../components/CTASection';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { reviewService } from '../services/reviewService';

const Article = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // Memoize the tool object to ensure reference stability
    const tool = React.useMemo(() => {
        return toolsData.find(t => t.id === parseInt(id)) || toolsData[0];
    }, [id]);

    const { addToRecentlyViewed } = useRecentlyViewed();
    const [refreshReviews, setRefreshReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    // Scroll to top when tool changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Track recently viewed - only runs when tool ID changes
    // Using tool.id instead of the whole tool object for better dependency tracking
    useEffect(() => {
        if (tool) {
            addToRecentlyViewed(tool);
        }
    }, [tool?.id, addToRecentlyViewed]);

    // Load review stats - runs when tool or refreshReviews changes
    useEffect(() => {
        if (tool) {
            const loadReviewStats = async () => {
                try {
                    const avg = await reviewService.getAverageRating(tool.id);
                    const count = await reviewService.getReviewCount(tool.id);

                    // Only update if the values actually changed to minimize re-renders
                    setAverageRating(prev => {
                        const newAvg = parseFloat(avg);
                        return prev === newAvg ? prev : newAvg;
                    });
                    setReviewCount(prev => prev === count ? prev : count);
                } catch (error) {
                    console.error('Failed to load review stats:', error);
                }
            };
            loadReviewStats();
        }
    }, [tool?.id, refreshReviews]); // Only re-fetch when tool changes or manual refresh is triggered

    const handleReviewAdded = () => {
        setRefreshReviews(prev => prev + 1);
    };

    // JSON-LD Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "applicationCategory": tool.category,
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": tool.description,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "120"
        }
    };

    return (
        <div className="min-h-screen bg-transparent transition-colors">
            <SEO
                title={`${tool.name} Review`}
                description={`Is ${tool.name} worth it? Full review, pricing, and features of this ${tool.category} AI tool.`}
                image={tool.image}
            />
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            {/* HERO SECTION - Fits in First Viewport */}
            <section className="pt-4 pb-8 md:pt-8 md:pb-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 relative">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-gray-500 hover:text-accent text-sm font-bold transition-all group py-2 px-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 hover:border-accent/30 hover:shadow-sm relative"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Directory
                        </Link>
                    </div>

                    {/* Hero Card - Tool Logo + Info + CTA */}
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700 shadow-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            {/* Tool Logo */}
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10 flex-shrink-0">
                                <img
                                    src={tool.image}
                                    alt={tool.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Tool Info */}
                            <div className="flex-grow text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider border border-accent/20">
                                        {tool.category}
                                    </span>
                                    <span className="flex items-center text-gray-400 text-xs">
                                        <Clock className="w-3 h-3 mr-1" /> Updated Dec 2025
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight dark:text-white text-gray-900">
                                    {tool.name}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                                    {tool.description}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="flex-shrink-0">
                                <a
                                    href={tool.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-xl font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 hover:-translate-y-0.5"
                                >
                                    Try It Free <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Stats - Inline */}
                        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2 text-green-600">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">Pricing</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{tool.pricing}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-2 text-yellow-600">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">Rating</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                                        {averageRating > 0 ? `${averageRating}/5.0` : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2 text-purple-600">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">Reviews</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{reviewCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION - Scrollable */}
            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Key Features */}
                <section className="mb-10">
                    <h2 className="text-xl md:text-2xl font-bold dark:text-white mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-accent" /> Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tool.features.map((feature, i) => (
                            <div key={i} className="flex flex-col p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-accent/40 transition-all hover:shadow-lg group">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mr-3 text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white text-base">{feature.name}</span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <AdBanner />

                {/* Comparison Table */}
                <section className="mb-10">
                    <h2 className="text-xl md:text-2xl font-bold dark:text-white mb-4">How it Compares</h2>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <ComparisonTable tools={toolsData} />
                    </div>
                </section>

                {/* CTA Banner */}
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-center text-white shadow-xl relative overflow-hidden mb-10">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-[60px] -mr-12 -mt-12"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to try {tool.name}?</h3>
                        <p className="text-gray-300 text-sm mb-4 max-w-md mx-auto">Get started with the free plan today.</p>
                        <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-xl font-bold text-sm hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
                        >
                            Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mb-10">
                    <h2 className="text-xl md:text-2xl font-bold dark:text-white mb-6 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-accent" /> Reviews & Ratings
                    </h2>

                    <div className="space-y-6">
                        <ReviewForm toolId={tool.id} onReviewAdded={handleReviewAdded} />
                        <ReviewList toolId={tool.id} refreshTrigger={refreshReviews} />
                    </div>
                </section>

                {/* Related Tools */}
                {
                    toolsData.filter(t => t.category === tool.category && t.id !== tool.id).length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl md:text-2xl font-bold dark:text-white">
                                    More {tool.category} Tools
                                </h2>
                                <Link to="/blog" className="text-accent font-bold text-sm hover:underline">View All</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {toolsData
                                    .filter(t => t.category === tool.category && t.id !== tool.id)
                                    .slice(0, 3)
                                    .map(related => (
                                        <ToolCard key={related.id} tool={related} />
                                    ))
                                }
                            </div>
                        </section>
                    )
                }
            </article>

            <CTASection />
        </div>
    );
};

export default Article;
