import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle, X, Trash2, Scale, Tag, Layers, DollarSign, TrendingUp, AlignLeft, CheckSquare, Calendar } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import SEO from '../components/SEO';

const Compare = () => {
    const { comparisonTools, removeFromComparison, clearComparison } = useComparison();

    if (comparisonTools.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 dark:text-white">No Tools to Compare</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Add tools from the directory to compare their features side by side.
                    </p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                        Browse Tools
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8  bg-transparent animate-in fade-in duration-500 relative overflow-hidden transition-colors">
            <SEO
                title="Compare AI Tools"
                description="Compare AI tools side by side to find the best one for your needs."
            />


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-accent text-sm font-medium mb-4 transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" /> Back to Directory
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight dark:text-white">
                            Compare Tools
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Compare {comparisonTools.length} tool{comparisonTools.length !== 1 ? 's' : ''} side by side
                        </p>
                    </div>
                    <button
                        onClick={clearComparison}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:scale-105 transition-all duration-300"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                    </button>
                </div>

                {/* Comparison Table */}
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="sticky left-0 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md z-10 p-6 text-left border-b border-gray-200 dark:border-gray-700 min-w-[200px]">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <Scale className="w-4 h-4 text-accent" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Feature</span>
                                        </div>
                                    </th>
                                    {comparisonTools.map((tool) => (
                                        <th
                                            key={tool.id}
                                            className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 min-w-[250px] relative"
                                        >
                                            <div className="flex flex-col items-center">
                                                <button
                                                    onClick={() => removeFromComparison(tool.id)}
                                                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-lg p-3 mb-3">
                                                    <img
                                                        src={tool.image}
                                                        alt={tool.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                                    {tool.name}
                                                </h3>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                    {tool.category}
                                                </span>
                                                <a
                                                    href={tool.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-accent hover:underline flex items-center gap-1 mb-2"
                                                >
                                                    Visit <ExternalLink className="w-3 h-3" />
                                                </a>
                                                <Link
                                                    to={`/article/${tool.id}`}
                                                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                                                >
                                                    View Details →
                                                </Link>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Name */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <Tag className="w-4 h-4 text-accent/60" />
                                            <span>Name</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4 text-center text-gray-900 dark:text-white">
                                            {tool.name}
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <Layers className="w-4 h-4 text-accent/60" />
                                            <span>Category</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4 text-center">
                                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                                {tool.category}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Pricing */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <DollarSign className="w-4 h-4 text-accent/60" />
                                            <span>Pricing</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4 text-center text-gray-900 dark:text-white font-medium">
                                            {tool.pricing}
                                        </td>
                                    ))}
                                </tr>

                                {/* Popularity */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp className="w-4 h-4 text-accent/60" />
                                            <span>Popularity</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-3 max-w-[150px]">
                                                    <div
                                                        className="bg-accent h-3 rounded-full"
                                                        style={{ width: `${tool.popularity}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[40px]">
                                                    {tool.popularity}/100
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Description */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 align-top border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <AlignLeft className="w-4 h-4 text-accent/60" />
                                            <span>Description</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                            {tool.description}
                                        </td>
                                    ))}
                                </tr>

                                {/* Key Features */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 align-top border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <CheckSquare className="w-4 h-4 text-accent/60" />
                                            <span>Key Features</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4">
                                            <ul className="text-left space-y-2">
                                                {tool.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                                        <span>{typeof feature === 'string' ? feature : feature.name || feature.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    ))}
                                </tr>

                                {/* Date Added */}
                                <tr>
                                    <td className="p-4 font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 border-r border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-accent/60" />
                                            <span>Date Added</span>
                                        </div>
                                    </td>
                                    {comparisonTools.map((tool) => (
                                        <td key={tool.id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(tool.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Want to compare more tools?
                    </p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                        Browse More Tools
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Compare;

