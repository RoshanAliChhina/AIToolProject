// Performance monitoring utilities

export const performanceUtils = {
    // Measure component render time
    measureRender: (componentName, callback) => {
        if (import.meta.env.DEV) {
            const start = performance.now();
            const result = callback();
            const end = performance.now();
            console.log(`[Performance] ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
            return result;
        }
        return callback();
    },

    // Track page load time
    trackPageLoad: () => {
        if (typeof window !== 'undefined' && window.performance) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`[Performance] Page loaded in ${pageLoadTime}ms`);
            });
        }
    },

    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }
};

// Web Vitals tracking
export const trackWebVitals = () => {
    if (typeof window !== 'undefined' && window.PerformanceObserver) {
        try {
            // Track Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                const lcp = lastEntry.renderTime || lastEntry.loadTime;
                if (lcp) {
                    console.log('[Web Vitals] LCP:', lcp.toFixed(2), 'ms');
                    // Store in localStorage for analytics
                    localStorage.setItem('web-vitals-lcp', lcp.toString());
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Track First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('[Web Vitals] FID:', fid.toFixed(2), 'ms');
                    localStorage.setItem('web-vitals-fid', fid.toString());
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Track Cumulative Layout Shift (CLS)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('[Web Vitals] CLS:', clsValue.toFixed(4));
                localStorage.setItem('web-vitals-cls', clsValue.toString());
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('Web Vitals tracking not supported', error);
        }
    }
};

