import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import ToolForm from '../components/ToolForm';
import { getBackendAdapter } from '../../config/backend';

const Tools = () => {
    const [isToolFormOpen, setIsToolFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const [editingTool, setEditingTool] = useState(null);

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const adapter = getBackendAdapter();

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        setLoading(true);
        try {
            const data = await adapter.get('tools');
            setTools(data);
        } catch (error) {
            console.error('Error fetching tools:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            label: 'Tool Name',
            key: 'name',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{row.name}</span>
                    {row.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                </div>
            )
        },
        {
            label: 'Category',
            key: 'category',
            render: (row) => (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {row.category}
                </span>
            )
        },
        {
            label: 'Pricing',
            key: 'pricing'
        },
        {
            label: 'Status',
            key: 'status',
            render: (row) => {
                const statusColors = {
                    'Pending': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
                    'Approved': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                    'Featured': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
                };
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[row.status]}`}>
                        {row.status}
                    </span>
                );
            }
        }
    ];

    const handleEdit = (tool) => {
        setEditingTool(tool);
        setIsToolFormOpen(true);
        // Backend: Load full tool data for editing
    };

    const handleDelete = (tool) => {
        setSelectedTool(tool);
        setIsDeleteModalOpen(true);
    };

    const handleFeature = async (tool) => {
        try {
            const newFeaturedStatus = !tool.featured;
            await adapter.update('tools', tool.id, {
                featured: newFeaturedStatus,
                status: newFeaturedStatus ? 'Featured' : 'Approved'
            });
            fetchTools();
        } catch (error) {
            console.error('Error toggling feature:', error);
        }
    };

    const confirmDelete = async () => {
        try {
            await adapter.delete('tools', selectedTool.id);
            setIsDeleteModalOpen(false);
            fetchTools();
        } catch (error) {
            console.error('Error deleting tool:', error);
        }
    };

    const handleToolSubmit = async (data) => {
        try {
            if (editingTool) {
                await adapter.update('tools', editingTool.id, data);
            } else {
                await adapter.save('tools', { ...data, status: 'Approved' });
            }
            setIsToolFormOpen(false);
            setEditingTool(null);
            fetchTools();
        } catch (error) {
            console.error('Error saving tool:', error);
        }
    };

    const actions = (row) => (
        <>
            <button
                onClick={() => handleFeature(row)}
                className="p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 transition-colors"
                title={row.featured ? 'Unfeature' : 'Feature'}
            >
                <Star className={`w-4 h-4 ${row.featured ? 'fill-yellow-500' : ''}`} />
            </button>
            <button
                onClick={() => handleEdit(row)}
                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                title="Edit"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={() => handleDelete(row)}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                        Tools Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage AI tools in your directory
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingTool(null);
                        setIsToolFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#48AE4F] text-white rounded-2xl font-black text-[14px] uppercase tracking-wider hover:bg-[#3d9443] transition-all shadow-xl shadow-[#48AE4F]/20 active:scale-95"
                >
                    <Plus className="w-5 h-5 stroke-[3]" />
                    Add New Tool
                </button>
            </div>

            {/* Tools Table */}
            <AdminTable
                columns={columns}
                data={tools}
                actions={actions}
            />

            {/* Tool Form Modal */}
            <ToolForm
                isOpen={isToolFormOpen}
                onClose={() => {
                    setIsToolFormOpen(false);
                    setEditingTool(null);
                }}
                onSubmit={handleToolSubmit}
                initialData={editingTool}
                title={editingTool ? 'Edit Tool' : 'Add New Tool'}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Tool"
                message={`Are you sure you want to delete "${selectedTool?.name}"? This action cannot be undone.`}
                confirmText="Delete"
            />
        </div>
    );
};

export default Tools;
