import React, { createContext, useState, useContext, useEffect } from 'react';
import { trackComparison } from '../utils/analytics';

const ComparisonContext = createContext();

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within ComparisonProvider');
    }
    return context;
};

export const ComparisonProvider = ({ children }) => {
    const [comparisonTools, setComparisonTools] = useState(() => {
        try {
            const stored = localStorage.getItem('comparison-tools');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load comparison tools', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('comparison-tools', JSON.stringify(comparisonTools));
        } catch (error) {
            console.error('Failed to save comparison tools', error);
        }
    }, [comparisonTools]);

    const addToComparison = (tool) => {
        setComparisonTools(prev => {
            // Max 4 tools can be compared
            if (prev.length >= 4) {
                return prev;
            }
            // Don't add if already exists
            if (prev.some(t => t.id === tool.id)) {
                return prev;
            }
            const updated = [...prev, tool];
            trackComparison('add', updated.map(t => t.id));
            return updated;
        });
    };

    const removeFromComparison = (toolId) => {
        setComparisonTools(prev => {
            const updated = prev.filter(tool => tool.id !== toolId);
            trackComparison('remove', updated.map(t => t.id));
            return updated;
        });
    };

    const clearComparison = () => {
        setComparisonTools([]);
        trackComparison('clear', []);
    };

    const isInComparison = (toolId) => {
        return comparisonTools.some(tool => tool.id === toolId);
    };

    const canAddMore = comparisonTools.length < 4;

    return (
        <ComparisonContext.Provider
            value={{
                comparisonTools,
                addToComparison,
                removeFromComparison,
                clearComparison,
                isInComparison,
                canAddMore,
                comparisonCount: comparisonTools.length
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};

