// Error tracking utility - Can be easily integrated with Sentry, LogRocket, etc.

class ErrorTracker {
    constructor() {
        this.enabled = true;
        this.errors = [];
        this.maxErrors = 50; // Store last 50 errors
    }

    // Track JavaScript error
    trackError(error, errorInfo = {}) {
        const errorData = {
            message: error?.message || 'Unknown error',
            stack: error?.stack,
            name: error?.name,
            ...errorInfo,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
        };

        this.logError(errorData);
        this.saveToStorage(errorData);

        // Here you can send to Sentry, LogRocket, etc.
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    // Track API error
    trackAPIError(endpoint, method, status, error) {
        const errorData = {
            type: 'api_error',
            endpoint,
            method,
            status,
            error: error?.message || error,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        };

        this.logError(errorData);
        this.saveToStorage(errorData);
    }

    // Track React error boundary error
    trackReactError(error, errorInfo) {
        const errorData = {
            type: 'react_error',
            message: error?.message || 'React component error',
            stack: error?.stack,
            componentStack: errorInfo?.componentStack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        };

        this.logError(errorData);
        this.saveToStorage(errorData);
    }

    // Track unhandled promise rejection
    trackUnhandledRejection(reason) {
        const errorData = {
            type: 'unhandled_rejection',
            reason: reason?.message || String(reason),
            stack: reason?.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        };

        this.logError(errorData);
        this.saveToStorage(errorData);
    }

    // Log error (for debugging)
    logError(errorData) {
        if (import.meta.env.DEV) {
            console.error('[Error Tracker]', errorData);
        }
    }

    // Save to localStorage
    saveToStorage(errorData) {
        try {
            const stored = localStorage.getItem('error-logs');
            const errors = stored ? JSON.parse(stored) : [];
            errors.push(errorData);

            // Keep only last maxErrors
            if (errors.length > this.maxErrors) {
                errors.shift();
            }

            localStorage.setItem('error-logs', JSON.stringify(errors));
        } catch (error) {
            console.error('Failed to save error log', error);
        }
    }

    // Get error logs
    getErrors() {
        try {
            const stored = localStorage.getItem('error-logs');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load error logs', error);
            return [];
        }
    }

    // Get error summary
    getSummary() {
        const errors = this.getErrors();
        const summary = {
            totalErrors: errors.length,
            recentErrors: errors.slice(-10),
            errorTypes: {},
        };

        errors.forEach(error => {
            const type = error.type || 'unknown';
            summary.errorTypes[type] = (summary.errorTypes[type] || 0) + 1;
        });

        return summary;
    }

    // Clear error logs
    clearErrors() {
        localStorage.removeItem('error-logs');
    }

    // Setup global error handlers
    setupGlobalHandlers() {
        // Track unhandled errors
        window.addEventListener('error', (event) => {
            this.trackError(event.error || new Error(event.message), {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            });
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackUnhandledRejection(event.reason, event.promise);
        });
    }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

// Setup global handlers on import
if (typeof window !== 'undefined') {
    errorTracker.setupGlobalHandlers();
}

// Helper functions
export const trackError = (error, errorInfo) => {
    errorTracker.trackError(error, errorInfo);
};

export const trackAPIError = (endpoint, method, status, error) => {
    errorTracker.trackAPIError(endpoint, method, status, error);
};

export const trackReactError = (error, errorInfo) => {
    errorTracker.trackReactError(error, errorInfo);
};

