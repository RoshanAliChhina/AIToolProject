import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { trackWebVitals } from './utils/performance';

// Apply dark mode BEFORE React renders (synchronous)
(function () {
  try {
    const saved = localStorage.getItem('darkMode');
    const html = document.documentElement;
    const body = document.body;

    if (saved === 'true') {
      html.classList.add('dark');
      body.classList.add('dark');
      console.log('🌙 Dark mode applied synchronously from localStorage');
    } else if (saved === null) {
      // Check system preference if no saved preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
        body.classList.add('dark');
        console.log('🌙 Dark mode applied from system preference');
      }
    }
  } catch (error) {
    console.warn('Failed to apply initial dark mode:', error);
  }
})();

// Register Service Worker for PWA (only in production)
if ('serviceWorker' in navigator) {
  if (!import.meta.env.DEV) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  } else {
    // In development, automatically unregister any existing service worker 
    // to prevent caching of index.html and assets which breaks HMR and refresh.
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
        console.log('Service Worker unregistered (Dev Mode)');
      }
    });
  }
}

// Track Web Vitals in development (with error handling)
if (import.meta.env.DEV) {
  try {
    trackWebVitals();
  } catch (error) {
    console.warn('Web Vitals tracking failed:', error);
  }
}

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial; color: red;"><h1>Error: Root element not found!</h1><p>Please check index.html</p></div>';
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h1 style="color: red;">Error Loading App</h1>
        <p>${error.message}</p>
        <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
}
