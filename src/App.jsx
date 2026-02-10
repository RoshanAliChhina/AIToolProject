import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import BlogArticle from './pages/BlogArticle';
import About from './pages/About';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import Submit from './pages/Submit';
import { FavoritesProvider } from './context/FavoritesContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { AuthProvider } from './context/AuthContext';
import PageTransition from './components/PageTransition';
import Chatbot from './components/Chatbot';
import ShareBar from './components/ShareBar';
import NewsletterModal from './components/NewsletterModal';
import ComparisonModal from './components/ComparisonModal';
import ErrorBoundary from './components/ErrorBoundary';
import AnalyticsProvider from './components/AnalyticsProvider';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ScrollToTop from './components/ScrollToTop';

// Admin imports
import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminTools from './admin/pages/Tools';
import AdminReviews from './admin/pages/Reviews';
import AdminUsers from './admin/pages/Users';

import ProtectedRoute from './components/ProtectedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/article/:id" element={<PageTransition><Article /></PageTransition>} />
        <Route path="/blog-article/:id" element={<PageTransition><BlogArticle /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/submit" element={<PageTransition><Submit /></PageTransition>} />
        <Route path="/compare" element={<PageTransition><Compare /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

        {/* Admin Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tools" element={<AdminTools />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isComparisonOpen, setIsComparisonOpen] = React.useState(false);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <FavoritesProvider>
            <ComparisonProvider>
              <Router>
                <ScrollToTop />
                <AnalyticsProvider>
                  <ConditionalLayout isComparisonOpen={isComparisonOpen} setIsComparisonOpen={setIsComparisonOpen} />
                </AnalyticsProvider>
              </Router>
            </ComparisonProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

// Separate component to access useLocation hook
const ConditionalLayout = ({ isComparisonOpen, setIsComparisonOpen }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen transition-colors w-full relative" style={{ background: 'transparent' }}>
      <main id="main-content" className={`flex-grow w-full transition-colors ${isAdminRoute ? '' : 'pt-20'}`} role="main">
        <AnimatedRoutes />
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
      <ComparisonModal isOpen={isComparisonOpen} onClose={() => setIsComparisonOpen(false)} />
      {!isAdminRoute && <Header onComparisonClick={() => setIsComparisonOpen(true)} />}
    </div>
  );
};

export default App;
