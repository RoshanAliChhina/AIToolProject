import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const AnalyticsProvider = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        try {
            // Track page view on route change
            const title = document.title || 'AI Tools Hub';
            trackPageView(location.pathname, title);
        } catch (error) {
            console.warn('Page view tracking failed:', error);
        }
    }, [location]);

    return <>{children}</>;
};

export default AnalyticsProvider;

