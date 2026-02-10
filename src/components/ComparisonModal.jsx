import React from 'react';
import { X, ExternalLink, CheckCircle, XCircle, Scale, Tag, Layers, DollarSign, TrendingUp, AlignLeft, CheckSquare, Calendar } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useComparison } from '../context/ComparisonContext';
import { Link } from 'react-router-dom';

const ComparisonModal = ({ isOpen, onClose }) => {
    const { comparisonTools, removeFromComparison, clearComparison } = useComparison();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        aria-hidden="true"
                        style={{ zIndex: 9999 }}
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-4 sm:inset-8 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full md:max-h-[82vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 mt-8 mb-32 shadow-accent/10"
                        style={{ zIndex: 10000 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="comparison-modal-title"
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 gap-3">
                            <div>
                                <h2 id="comparison-modal-title" className="text-xl sm:text-2xl font-bold dark:text-white">Compare Tools</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {comparisonTools.length} tool{comparisonTools.length !== 1 ? 's' : ''} selected
                                </p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                {comparisonTools.length > 0 && (
                                    <button
                                        onClick={clearComparison}
                                        className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:scale-105 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 min-h-[40px]"
                                    >
                                        Clear All
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:scale-105 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 ml-auto sm:ml-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                                    aria-label="Close comparison modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-4 sm:p-6">
                            {comparisonTools.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
                                        No tools selected for comparison
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Add tools from the directory to compare them side by side
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                                    <div className="min-w-full inline-block">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr>
                                                    <th className="sticky left-0 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md z-10 px-6 py-4 text-left border-b-2 border-gray-200 dark:border-gray-800 w-[150px]">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                                                                <Scale className="w-4 h-4 text-accent" />
                                                            </div>
                                                            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Feature</span>
                                                        </div>
                                                    </th>
                                                    {comparisonTools.map((tool) => (
                                                        <th
                                                            key={tool.id}
                                                            className="px-6 py-4 text-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-800 w-[220px] relative"
                                                        >
                                                            <div className="flex flex-col items-center gap-3">
                                                                <button
                                                                    onClick={() => removeFromComparison(tool.id)}
                                                                    className="absolute top-1 right-1 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[32px] min-h-[32px] flex items-center justify-center"
                                                                    aria-label={`Remove ${tool.name} from comparison`}
                                                                >
                                                                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                                </button>
                                                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                                                                    <img
                                                                        src={tool.image}
                                                                        alt=""
                                                                        className="w-full h-full object-contain"
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                </div>
                                                                <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm line-clamp-2">
                                                                    {tool.name}
                                                                </h3>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {tool.category}
                                                                </span>
                                                                <a
                                                                    href={tool.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-accent hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                                                                    aria-label={`Visit ${tool.name} website`}
                                                                >
                                                                    Visit <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Name */}
                                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <Tag className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Name</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 text-center text-gray-900 dark:text-white text-xs sm:text-sm">
                                                            {tool.name}
                                                        </td>
                                                    ))}
                                                </tr>

                                                {/* Category */}
                                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <Layers className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Category</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 text-center">
                                                            <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium inline-block">
                                                                {tool.category}
                                                            </span>
                                                        </td>
                                                    ))}
                                                </tr>

                                                {/* Pricing */}
                                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Pricing</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 text-center text-gray-900 dark:text-white text-xs sm:text-sm font-medium">
                                                            {tool.pricing}
                                                        </td>
                                                    ))}
                                                </tr>

                                                {/* Popularity */}
                                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <TrendingUp className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Popularity</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2 max-w-[80px] sm:max-w-[100px]">
                                                                    <div
                                                                        className="bg-accent h-2 rounded-full transition-all"
                                                                        style={{ width: `${tool.popularity}%` }}
                                                                        aria-label={`${tool.popularity}% popularity`}
                                                                    />
                                                                </div>
                                                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium min-w-[30px]">
                                                                    {tool.popularity}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>

                                                {/* Features */}
                                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 align-top text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <CheckSquare className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Key Features</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 align-top">
                                                            <ul className="text-left space-y-1.5 sm:space-y-2">
                                                                {tool.features.slice(0, 3).map((feature, index) => (
                                                                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent mt-0.5 flex-shrink-0" />
                                                                        <span className="line-clamp-2">{typeof feature === 'string' ? feature : feature.name || feature.description}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    ))}
                                                </tr>

                                                {/* Description */}
                                                <tr>
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 align-top text-xs sm:text-sm border-r border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2">
                                                            <AlignLeft className="w-3.5 h-3.5 text-accent/60" />
                                                            <span>Description</span>
                                                        </div>
                                                    </td>
                                                    {comparisonTools.map((tool) => (
                                                        <td key={tool.id} className="px-6 py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                                            {tool.description}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {comparisonTools.length > 0 && (
                            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    You can compare up to 4 tools at once
                                </p>
                                <Link
                                    to="/compare"
                                    onClick={onClose}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm sm:text-base min-h-[44px] flex items-center justify-center w-full sm:w-auto hover:scale-105 active:scale-95"
                                >
                                    View Full Comparison
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ComparisonModal;

