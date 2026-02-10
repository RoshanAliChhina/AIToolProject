// Submission service - Uses backend adapter (localStorage, Firebase, or Supabase)
import { backend } from '../config/backend';

const COLLECTION_NAME = 'submissions';

export const submissionService = {
    // Get all submissions
    getAll: async (filters = {}) => {
        try {
            const submissions = await backend.get(COLLECTION_NAME, filters);
            return submissions.map(sub => ({
                ...sub,
                // Normalize field names
                createdAt: sub.createdAt || sub.created_at,
                updatedAt: sub.updatedAt || sub.updated_at,
            }));
        } catch (error) {
            console.error('Failed to load submissions', error);
            return [];
        }
    },

    // Add new submission
    add: async (submission) => {
        try {
            const submissionData = {
                name: submission.name,
                url: submission.url,
                description: submission.description,
                category: submission.category,
                image: submission.image || null,
                status: 'pending',
                reviewed: false,
            };

            const result = await backend.save(COLLECTION_NAME, submissionData);
            
            return { success: true, id: result.id };
        } catch (error) {
            console.error('Failed to save submission', error);
            throw error;
        }
    },

    // Get submission by ID
    getById: async (id) => {
        try {
            const submissions = await submissionService.getAll();
            return submissions.find(s => s.id === id.toString());
        } catch (error) {
            console.error('Failed to get submission', error);
            return null;
        }
    },

    // Update submission status (for admin)
    updateStatus: async (id, status) => {
        try {
            await backend.update(COLLECTION_NAME, id, {
                status,
                reviewed: status !== 'pending',
            });
            return true;
        } catch (error) {
            console.error('Failed to update submission', error);
            return false;
        }
    }
};

