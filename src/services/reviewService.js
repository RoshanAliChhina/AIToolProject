// Review service - Uses backend adapter (localStorage, Firebase, or Supabase)
import { backend } from '../config/backend';

const COLLECTION_NAME = 'reviews';

export const reviewService = {
    // Get reviews for a tool
    getByToolId: async (toolId) => {
        try {
            const reviews = await backend.get(COLLECTION_NAME, { toolId });
            return reviews.map(review => ({
                ...review,
                // Normalize field names for different backends
                toolId: review.toolId || review.tool_id,
                createdAt: review.createdAt || review.created_at,
            }));
        } catch (error) {
            console.error('Failed to load reviews', error);
            return [];
        }
    },

    // Add new review
    add: async (review) => {
        try {
            const reviewData = {
                toolId: review.toolId.toString(),
                rating: review.rating,
                name: review.name,
                email: review.email || null,
                comment: review.comment || '',
                helpful: 0,
                reported: false,
            };

            const result = await backend.save(COLLECTION_NAME, reviewData);
            
            return { 
                success: true, 
                review: {
                    ...reviewData,
                    id: result.id,
                    createdAt: new Date().toISOString(),
                }
            };
        } catch (error) {
            console.error('Failed to save review', error);
            throw error;
        }
    },

    // Get average rating for a tool
    getAverageRating: async (toolId) => {
        try {
            const reviews = await reviewService.getByToolId(toolId);
            if (reviews.length === 0) return 0;
            
            const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
            return (sum / reviews.length).toFixed(1);
        } catch (error) {
            console.error('Failed to get average rating', error);
            return 0;
        }
    },

    // Get review count
    getReviewCount: async (toolId) => {
        try {
            const reviews = await reviewService.getByToolId(toolId);
            return reviews.length;
        } catch (error) {
            console.error('Failed to get review count', error);
            return 0;
        }
    },

    // Get all reviews (for admin)
    getAll: async () => {
        try {
            const reviews = await backend.get(COLLECTION_NAME);
            return reviews.map(review => ({
                ...review,
                toolId: review.toolId || review.tool_id,
                createdAt: review.createdAt || review.created_at,
            }));
        } catch (error) {
            console.error('Failed to load all reviews', error);
            return [];
        }
    },

    // Delete review (for admin)
    delete: async (reviewId) => {
        try {
            await backend.delete(COLLECTION_NAME, reviewId);
            return { success: true };
        } catch (error) {
            console.error('Failed to delete review', error);
            throw error;
        }
    },

    // Mark review as helpful
    markHelpful: async (reviewId) => {
        try {
            const reviews = await backend.get(COLLECTION_NAME);
            const review = reviews.find(r => r.id === reviewId.toString());
            
            if (review) {
                await backend.update(COLLECTION_NAME, reviewId, {
                    helpful: (review.helpful || 0) + 1
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to mark helpful', error);
            return false;
        }
    }
};

