import React, { useState, useEffect } from 'react';
import { Shield, Ban } from 'lucide-react';
import AdminTable from '../components/AdminTable';
import ConfirmModal from '../components/ConfirmModal';
import { getBackendAdapter } from '../../config/backend';

const Users = () => {
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(null);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const adapter = getBackendAdapter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adapter.get('admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            label: 'Name',
            key: 'name',
            render: (row) => (
                <div>
                    <p className="font-bold text-[13px] text-slate-900 dark:text-white uppercase tracking-tight">{row.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                </div>
            )
        },
        {
            label: 'Role',
            key: 'role',
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.role === 'admin'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                    {row.role === 'admin' ? 'Admin' : 'User'}
                </span>
            )
        },
        {
            label: 'Status',
            key: 'status',
            render: (row) => {
                const status = row.status || 'Active';
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                        {status}
                    </span>
                );
            }
        },
        {
            label: 'Join Date',
            key: 'createdAt',
            render: (row) => {
                const date = row.createdAt || row.joinDate;
                if (!date) return <span className="text-sm text-gray-400">N/A</span>;

                try {
                    return (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    );
                } catch (error) {
                    return <span className="text-sm text-gray-400">N/A</span>;
                }
            }
        }
    ];

    const handleBlock = (user) => {
        setSelectedUser(user);
        setActionType('block');
        setIsBlockModalOpen(true);
    };

    const handleMakeAdmin = (user) => {
        setSelectedUser(user);
        setActionType('admin');
        setIsAdminModalOpen(true);
    };

    const confirmBlock = async () => {
        try {
            const newStatus = selectedUser.status === 'Blocked' ? 'Active' : 'Blocked';
            await adapter.update('admin/users', selectedUser.id, { status: newStatus });
            setIsBlockModalOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Error toggling block:', error);
        }
    };

    const confirmMakeAdmin = async () => {
        try {
            const newRole = selectedUser.role === 'Admin' ? 'user' : 'admin';
            await adapter.update('admin/users', selectedUser.id, { role: newRole });
            setIsAdminModalOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Error toggling admin role:', error);
        }
    };

    const actions = (row) => (
        <>
            <button
                onClick={() => handleMakeAdmin(row)}
                className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 transition-colors"
                title={row.role === 'Admin' ? 'Remove Admin' : 'Make Admin'}
            >
                <Shield className="w-4 h-4" />
            </button>
            <button
                onClick={() => handleBlock(row)}
                className={`p-2 rounded-lg transition-colors ${row.status === 'Blocked'
                    ? 'hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}
                title={row.status === 'Blocked' ? 'Unblock User' : 'Block User'}
            >
                <Ban className="w-4 h-4" />
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                    Users Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage users and their permissions
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-blue-500">
                        Total Users
                    </p>
                    <h3 className="text-4xl font-black text-blue-600 dark:text-blue-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {users.length}
                    </h3>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-emerald-500">
                        Active Users
                    </p>
                    <h3 className="text-4xl font-black text-emerald-600 dark:text-emerald-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {users.filter(u => (u.status || 'Active') === 'Active').length}
                    </h3>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-purple-500">
                        Admins
                    </p>
                    <h3 className="text-4xl font-black text-purple-600 dark:text-purple-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {users.filter(u => u.role === 'admin').length}
                    </h3>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/50 dark:border-slate-800 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] py-6 px-8 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 hover:scale-[1.02] group cursor-default">
                    <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 transition-colors group-hover:text-red-500">
                        Blocked Users
                    </p>
                    <h3 className="text-4xl font-black text-red-600 dark:text-red-500 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-left">
                        {users.filter(u => u.status === 'Blocked').length}
                    </h3>
                </div>
            </div>

            {/* Users Table */}
            <AdminTable
                columns={columns}
                data={users}
                actions={actions}
            />

            {/* Block/Unblock Confirmation Modal */}
            <ConfirmModal
                isOpen={isBlockModalOpen}
                onClose={() => setIsBlockModalOpen(false)}
                onConfirm={confirmBlock}
                title={selectedUser?.status === 'Blocked' ? 'Unblock User' : 'Block User'}
                message={`Are you sure you want to ${selectedUser?.status === 'Blocked' ? 'unblock' : 'block'} ${selectedUser?.name}?`}
                confirmText={selectedUser?.status === 'Blocked' ? 'Unblock' : 'Block'}
                confirmColor={selectedUser?.status === 'Blocked' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            />

            {/* Make Admin Confirmation Modal */}
            <ConfirmModal
                isOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
                onConfirm={confirmMakeAdmin}
                title={selectedUser?.role === 'Admin' ? 'Remove Admin Role' : 'Make Admin'}
                message={`Are you sure you want to ${selectedUser?.role === 'Admin' ? 'remove admin role from' : 'make'} ${selectedUser?.name} ${selectedUser?.role === 'Admin' ? '' : 'an admin'}?`}
                confirmText={selectedUser?.role === 'Admin' ? 'Remove Admin' : 'Make Admin'}
                confirmColor="bg-purple-600 hover:bg-purple-700"
            />
        </div>
    );
};

export default Users;
