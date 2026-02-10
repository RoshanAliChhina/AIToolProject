import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

const ComparisonTable = ({ tools }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tool</th>
                        <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
                        <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center">Free</th>
                        <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map((tool, index) => (
                        <tr
                            key={tool.id}
                            className={`hover:bg-accent/5 transition-colors ${index !== tools.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                        >
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <img src={tool.image} alt={tool.name} className="w-8 h-8 object-contain" />
                                    <span className="font-semibold text-sm dark:text-white">{tool.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    {tool.category}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                                {tool.pricing.toLowerCase().includes('free') && (
                                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-4 h-4 text-accent" />
                                    </div>
                                )}
                            </td>
                            <td className="py-4 px-4 text-center">
                                <a
                                    href={tool.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
