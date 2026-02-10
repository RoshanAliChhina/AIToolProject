import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { submissionService } from '../services/submissionService';
import { reviewService } from '../services/reviewService';
import { Shield, CheckCircle, XCircle, Eye, Trash2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('submissions');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subs, revs] = await Promise.all([
        submissionService.getAll(),
        reviewService.getAll(),
      ]);
      setSubmissions(subs.filter(s => s.status === 'pending'));
      setReviews(revs);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSubmission = async (id) => {
    try {
      await submissionService.updateStatus(id, 'approved');
      setSubmissions(submissions.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to approve submission:', error);
    }
  };

  const handleRejectSubmission = async (id) => {
    try {
      await submissionService.updateStatus(id, 'rejected');
      setSubmissions(submissions.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to reject submission:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await reviewService.delete(id);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner fullScreen text="Loading admin panel..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEO title="Admin Panel - AI Tools Directory" description="Admin dashboard for managing submissions and reviews" />
      <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-accent" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Manage submissions and reviews</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`px-6 py-4 font-medium text-sm ${activeTab === 'submissions'
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  Submissions ({submissions.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 font-medium text-sm ${activeTab === 'reviews'
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  {submissions.length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No pending submissions</p>
                    </div>
                  ) : (
                    submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                              {submission.toolName}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Submitted by {submission.name} ({submission.email})
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {new Date(submission.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">{submission.description}</p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveSubmission(submission.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectSubmission(submission.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                              <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Tool ID: {review.toolId}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete review"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;

