import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';
import Rating from './Rating';
import { reviewService } from '../services/reviewService';
import { trackReview, trackFormSubmission } from '../utils/analytics';

const ReviewForm = ({ toolId, onReviewAdded }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        name: '',
        email: '',
        comment: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!formData.name.trim()) {
            setError('Please enter your name');
            return;
        }

        if (!formData.comment.trim()) {
            setError('Please write a review');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await reviewService.add({
                toolId: toolId.toString(),
                rating: formData.rating,
                name: formData.name,
                email: formData.email || undefined,
                comment: formData.comment
            });

            // Track analytics
            trackReview(toolId, formData.rating);
            trackFormSubmission('review', true);

            setSubmitted(true);
            setFormData({ rating: 0, name: '', email: '', comment: '' });
            
            if (onReviewAdded) {
                onReviewAdded();
            }

            // Reset after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            setError('Failed to submit review. Please try again.');
            console.error('Review submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-3">
                    <Star className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-1">
                    Thank You!
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">
                    Your review has been submitted successfully.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Write a Review</h3>
            
            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Rating <span className="text-red-500">*</span>
                    </label>
                    <Rating
                        rating={formData.rating}
                        onRatingChange={handleRatingChange}
                        size="lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="review-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="review-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="review-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email (Optional)
                        </label>
                        <input
                            type="email"
                            id="review-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="review-comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="review-comment"
                        name="comment"
                        required
                        rows="4"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all dark:text-white resize-none"
                        placeholder="Share your experience with this tool..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Review
                            <Send className="ml-2 w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;

