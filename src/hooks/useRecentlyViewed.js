import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'recently-viewed-tools';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                // Use setTimeout to avoid setState in effect warning
                setTimeout(() => {
                    setRecentlyViewed(JSON.parse(stored));
                }, 0);
            }
        } catch (error) {
            console.error('Failed to load recently viewed', error);
        }
    }, []);

    const addToRecentlyViewed = useCallback((tool) => {
        setRecentlyViewed(prev => {
            // Remove if already exists
            const filtered = prev.filter(t => t.id !== tool.id);
            // Add to beginning
            const updated = [tool, ...filtered].slice(0, MAX_ITEMS);

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save recently viewed', error);
            }

            return updated;
        });
    }, []);

    const clearRecentlyViewed = useCallback(() => {
        setRecentlyViewed([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear recently viewed', error);
        }
    }, []);

    return {
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed
    };
};

