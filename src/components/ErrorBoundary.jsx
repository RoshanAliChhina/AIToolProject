import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { trackReactError } from '../utils/errorTracking';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        // Track error
        trackReactError(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#f9fafb' }}>
                    <div style={{ maxWidth: '28rem', width: '100%', backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '32px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', marginBottom: '16px' }}>
                            <AlertCircle style={{ width: '32px', height: '32px' }} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                            Oops! Something went wrong
                        </h2>
                        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                            We're sorry, but something unexpected happened. Please try again.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </button>
                            <button
                                onClick={() => {
                                    this.handleReset();
                                    window.location.href = '/';
                                }}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Go to Home
                            </button>
                        </div>
                        {import.meta.env.DEV && this.state.error && (
                            <details style={{ marginTop: '24px', textAlign: 'left' }} open>
                                <summary style={{ fontSize: '0.875rem', color: '#9ca3af', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
                                    ⚠️ Error Details (Click to expand)
                                </summary>
                                <pre style={{ marginTop: '8px', fontSize: '0.75rem', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    <strong>Error Message:</strong>
                                    {this.state.error?.toString() || 'Unknown error'}
                                    {this.state.errorInfo && (
                                        <>
                                            {'\n\n'}
                                            <strong>Component Stack:</strong>
                                            {this.state.errorInfo.componentStack}
                                            {'\n\n'}
                                            <strong>Error Stack:</strong>
                                            {this.state.error?.stack || 'No stack trace'}
                                        </>
                                    )}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

