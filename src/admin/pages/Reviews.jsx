import React, { useState, useEffect } from 'react';
import { EyeOff, Trash2, Star } from 'lucide-react';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import { getBackendAdapter } from '../../config/backend';
import { toolsData } from '../../data/toolsData';

const Reviews = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const adapter = getBackendAdapter();

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await adapter.get('reviews');
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                ))}
            </div>
        );
    };

    const columns = [
        {
            label: 'User',
            key: 'userName',
            render: (row) => (
                <div>
                    <p className="font-semibold text-sm">{row.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                </div>
            )
        },
        {
            label: 'Rating',
            key: 'rating',
            render: (row) => renderStars(row.rating)
        },
        {
            label: 'Review',
            key: 'comment',
            render: (row) => (
                <p className="text-sm max-w-md truncate" title={row.comment}>
                    {row.comment}
                </p>
            )
        },
        {
            label: 'Tool',
            key: 'toolName',
            render: (row) => {
                const toolFromData = toolsData.find(t => t.id.toString() === row.toolId?.toString());
                return (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                        {row.toolName || toolFromData?.name || row.toolId || 'Pending...'}
                    </span>
                );
            }
        },
        {
            label: 'Status',
            key: 'visible',
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.visible
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                    }`}>
                    {row.visible ? 'Visible' : 'Hidden'}
                </span>
            )
        }
    ];

    const handleHide = async (review) => {
        try {
            await adapter.update('reviews', review.id, { visible: !review.visible });
            fetchReviews();
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleDelete = (review) => {
        setSelectedReview(review);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedReview) return;
        try {
            await adapter.delete('reviews', selectedReview.id);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const actions = (row) => (
        <>
            <button
                onClick={() => handleHide(row)}
                className="p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400 transition-colors"
                title={row.visible ? 'Hide review' : 'Show review'}
            >
                <EyeOff className="w-4 h-4" />
            </button>
            <button
                onClick={() => handleDelete(row)}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                title="Delete review"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    Reviews Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Moderate and manage user reviews
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-blue-500">
                        Total Reviews
                    </p>
                    <h3 className="text-4xl font-black text-blue-600 dark:text-blue-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {reviews.length}
                    </h3>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-emerald-500">
                        Visible Reviews
                    </p>
                    <h3 className="text-4xl font-black text-emerald-600 dark:text-emerald-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {reviews.filter(r => r.visible).length}
                    </h3>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-amber-500">
                        Average Rating
                    </p>
                    <h3 className="text-4xl font-black text-amber-600 dark:text-amber-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                    </h3>
                </div>
            </div>

            {/* Reviews Table */}
            <AdminTable
                columns={columns}
                data={reviews}
                actions={actions}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Review"
                message={`Are you sure you want to delete this review by ${selectedReview?.name}? This action cannot be undone.`}
                confirmText="Delete"
            />
        </div>
    );
};

export default Reviews;
