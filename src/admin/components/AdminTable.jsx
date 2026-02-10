import React from 'react';

const AdminTable = ({ columns, data, actions }) => {
    return (
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-5 text-left text-[13px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.15em] transition-colors"
                                >
                                    {column.label}
                                </th>
                            ))}
                            {actions && (
                                <th className="px-6 py-5 text-right text-[13px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.15em]">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors"
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                                    >
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right text-sm">
                                        <div className="flex items-center justify-end gap-2">
                                            {actions(row)}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="p-4 space-y-3">
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="flex justify-between items-start">
                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                    {column.label}:
                                </span>
                                <span className="text-sm text-gray-900 dark:text-gray-100 text-right">
                                    {column.render ? column.render(row) : row[column.key]}
                                </span>
                            </div>
                        ))}
                        {actions && (
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                {actions(row)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No data available
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
