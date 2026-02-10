import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Calendar, User } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import Rating from './Rating';

const ReviewList = ({ toolId, refreshTrigger }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolId, refreshTrigger]);

    const loadReviews = () => {
        setLoading(true);
        try {
            const toolReviews = reviewService.getByToolId(toolId);
            
            // Sort reviews
            const sorted = [...toolReviews].sort((a, b) => {
                if (sortBy === 'newest') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                } else if (sortBy === 'oldest') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                } else if (sortBy === 'highest') {
                    return b.rating - a.rating;
                } else if (sortBy === 'lowest') {
                    return a.rating - b.rating;
                }
                return 0;
            });
            
            setReviews(sorted);
        } catch (error) {
            console.error('Failed to load reviews', error);
        } finally {
            setLoading(false);
        }
    };

    const handleHelpful = (reviewId) => {
        reviewService.markHelpful(reviewId);
        loadReviews();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                <Star className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                    No reviews yet. Be the first to review this tool!
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold dark:text-white">
                    Reviews ({reviews.length})
                </h3>
                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        loadReviews();
                    }}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-accent/50 outline-none"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-700"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {review.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(review.createdAt)}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <Rating
                                        rating={review.rating}
                                        maxRating={5}
                                        size="sm"
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {review.comment}
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleHelpful(review.id)}
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                Helpful ({review.helpful || 0})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;

