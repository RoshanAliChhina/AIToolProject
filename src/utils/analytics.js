// Analytics utility - Can be easily integrated with Google Analytics, Plausible, etc.

class Analytics {
    constructor() {
        this.enabled = import.meta.env.PROD || localStorage.getItem('analytics-enabled') === 'true';
        this.events = [];
        this.maxEvents = 100; // Store last 100 events
    }

    // Track page view
    trackPageView(path, title) {
        if (!this.enabled) return;

        const event = {
            type: 'pageview',
            path,
            title,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);

        // Here you can send to Google Analytics, Plausible, etc.
        // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
    }

    // Track tool click
    trackToolClick(toolId, toolName, category) {
        if (!this.enabled) return;

        const event = {
            type: 'tool_click',
            toolId,
            toolName,
            category,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track search query
    trackSearch(query, resultsCount, filters = {}) {
        if (!this.enabled) return;

        const event = {
            type: 'search',
            query,
            resultsCount,
            filters,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track comparison action
    trackComparison(action, toolIds = []) {
        if (!this.enabled) return;

        const event = {
            type: 'comparison',
            action, // 'add', 'remove', 'view'
            toolIds,
            toolCount: toolIds.length,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track review submission
    trackReview(toolId, rating) {
        if (!this.enabled) return;

        const event = {
            type: 'review',
            toolId,
            rating,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track favorite action
    trackFavorite(action, toolId) {
        if (!this.enabled) return;

        const event = {
            type: 'favorite',
            action, // 'add', 'remove'
            toolId,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track form submission
    trackFormSubmission(formType, success = true) {
        if (!this.enabled) return;

        const event = {
            type: 'form_submission',
            formType, // 'submit_tool', 'review', 'newsletter'
            success,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track user flow
    trackUserFlow(step, data = {}) {
        if (!this.enabled) return;

        const event = {
            type: 'user_flow',
            step,
            data,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Track custom event
    trackEvent(eventName, properties = {}) {
        if (!this.enabled) return;

        const event = {
            type: 'custom',
            eventName,
            properties,
            timestamp: new Date().toISOString(),
        };

        this.logEvent(event);
        this.saveToStorage(event);
    }

    // Log event (for debugging)
    logEvent(event) {
        if (import.meta.env.DEV) {
            console.log('[Analytics]', event);
        }
    }

    // Save to localStorage
    saveToStorage(event) {
        try {
            const stored = localStorage.getItem('analytics-events');
            const events = stored ? JSON.parse(stored) : [];
            events.push(event);

            // Keep only last maxEvents
            if (events.length > this.maxEvents) {
                events.shift();
            }

            localStorage.setItem('analytics-events', JSON.stringify(events));
        } catch (error) {
            console.error('Failed to save analytics event', error);
        }
    }

    // Get analytics data
    getAnalytics() {
        try {
            const stored = localStorage.getItem('analytics-events');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load analytics', error);
            return [];
        }
    }

    // Get analytics summary
    getSummary() {
        const events = this.getAnalytics();
        const summary = {
            totalEvents: events.length,
            pageViews: events.filter(e => e.type === 'pageview').length,
            toolClicks: events.filter(e => e.type === 'tool_click').length,
            searches: events.filter(e => e.type === 'search').length,
            comparisons: events.filter(e => e.type === 'comparison').length,
            reviews: events.filter(e => e.type === 'review').length,
            favorites: events.filter(e => e.type === 'favorite').length,
        };

        // Most clicked tools
        const toolClicks = events.filter(e => e.type === 'tool_click');
        const toolCounts = {};
        toolClicks.forEach(e => {
            toolCounts[e.toolName] = (toolCounts[e.toolName] || 0) + 1;
        });
        summary.mostClickedTools = Object.entries(toolCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, count]) => ({ name, count }));

        // Most searched terms
        const searches = events.filter(e => e.type === 'search');
        const searchTerms = {};
        searches.forEach(e => {
            if (e.query) {
                searchTerms[e.query] = (searchTerms[e.query] || 0) + 1;
            }
        });
        summary.mostSearchedTerms = Object.entries(searchTerms)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([term, count]) => ({ term, count }));

        return summary;
    }

    // Clear analytics data
    clearAnalytics() {
        localStorage.removeItem('analytics-events');
    }

    // Enable/disable analytics
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('analytics-enabled', enabled.toString());
    }
}

// Export singleton instance
export const analytics = new Analytics();

// Auto-track page views on route change
export const trackPageView = (path, title) => {
    analytics.trackPageView(path, title);
};

// Helper functions
export const trackToolClick = (toolId, toolName, category) => {
    analytics.trackToolClick(toolId, toolName, category);
};

export const trackSearch = (query, resultsCount, filters) => {
    analytics.trackSearch(query, resultsCount, filters);
};

export const trackComparison = (action, toolIds) => {
    analytics.trackComparison(action, toolIds);
};

export const trackReview = (toolId, rating) => {
    analytics.trackReview(toolId, rating);
};

export const trackFavorite = (action, toolId) => {
    analytics.trackFavorite(action, toolId);
};

export const trackFormSubmission = (formType, success) => {
    analytics.trackFormSubmission(formType, success);
};

export const trackUserFlow = (step, data) => {
    analytics.trackUserFlow(step, data);
};

export const trackEvent = (eventName, properties) => {
    analytics.trackEvent(eventName, properties);
};

