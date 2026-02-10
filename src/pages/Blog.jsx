import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, DollarSign, TrendingUp, Sparkles, Zap, Gift, Gem, Rocket, Star, Flame, BarChart3, Trophy } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import SortDropdown from '../components/SortDropdown';
import { toolsData } from '../data/toolsData';
import { trackSearch } from '../utils/analytics';
import AdBanner from '../components/AdBanner';

const Blog = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Load saved state from localStorage
    const getInitialValue = (key, defaultValue, urlParam) => {
        try {
            const saved = localStorage.getItem(`blogFilter_${key}`);
            if (saved !== null) return saved;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
        }
        return urlParam || defaultValue;
    };

    const [searchTerm, setSearchTerm] = useState(getInitialValue('searchTerm', '', searchParams.get('search')));
    const [selectedCategory, setSelectedCategory] = useState(getInitialValue('selectedCategory', 'All', searchParams.get('category')));
    const [sortBy, setSortBy] = useState(getInitialValue('sortBy', 'newest', searchParams.get('sort')));
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [loading, setLoading] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedPricing, setSelectedPricing] = useState(getInitialValue('selectedPricing', 'All', searchParams.get('pricing')));
    const [selectedPopularity, setSelectedPopularity] = useState(getInitialValue('selectedPopularity', 'All', searchParams.get('popularity')));
    const filterDropdownRef = useRef(null);
    const itemsPerPage = 12;

    // Save state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('blogFilter_searchTerm', searchTerm);
        } catch (error) {
            console.error('Error saving searchTerm to localStorage:', error);
        }
    }, [searchTerm]);

    useEffect(() => {
        try {
            localStorage.setItem('blogFilter_selectedCategory', selectedCategory);
        } catch (error) {
            console.error('Error saving selectedCategory to localStorage:', error);
        }
    }, [selectedCategory]);

    useEffect(() => {
        try {
            localStorage.setItem('blogFilter_sortBy', sortBy);
        } catch (error) {
            console.error('Error saving sortBy to localStorage:', error);
        }
    }, [sortBy]);

    useEffect(() => {
        try {
            localStorage.setItem('blogFilter_selectedPricing', selectedPricing);
        } catch (error) {
            console.error('Error saving selectedPricing to localStorage:', error);
        }
    }, [selectedPricing]);

    useEffect(() => {
        try {
            localStorage.setItem('blogFilter_selectedPopularity', selectedPopularity);
        } catch (error) {
            console.error('Error saving selectedPopularity to localStorage:', error);
        }
    }, [selectedPopularity]);

    // Close filter dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    // Extract unique categories
    const categories = ['All', ...new Set(toolsData.map(tool => tool.category))];
    const categoryList = categories.filter(c => c !== 'All');

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory !== 'All') params.set('category', selectedCategory);
        if (selectedPricing !== 'All') params.set('pricing', selectedPricing);
        if (selectedPopularity !== 'All') params.set('popularity', selectedPopularity);
        if (sortBy !== 'newest') params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', currentPage.toString());
        setSearchParams(params, { replace: true });
    }, [searchTerm, selectedCategory, selectedPricing, selectedPopularity, sortBy, currentPage, setSearchParams]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedPricing, selectedPopularity, sortBy]);

    const filteredTools = useMemo(() => {
        return toolsData.filter(tool => {
            // Search match - only apply if search term exists
            let matchesSearch = true;
            if (searchTerm && searchTerm.trim()) {
                matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (tool.features && tool.features.some(f => {
                        const featureName = typeof f === 'string' ? f : f.name;
                        return featureName.toLowerCase().includes(searchTerm.toLowerCase());
                    }));
            }

            // Category match
            const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;

            // Pricing match
            let matchesPricing = true;
            if (selectedPricing !== 'All') {
                const pricingLower = tool.pricing ? tool.pricing.toLowerCase() : '';
                if (selectedPricing === 'Free') {
                    matchesPricing = pricingLower.includes('free') && !pricingLower.includes('paid');
                } else if (selectedPricing === 'Paid') {
                    matchesPricing = pricingLower.includes('paid') || pricingLower.includes('premium') ||
                        pricingLower.includes('pro') || pricingLower.includes('plus');
                } else if (selectedPricing === 'Freemium') {
                    matchesPricing = pricingLower.includes('free') && pricingLower.includes('paid');
                }
            }

            // Popularity match
            let matchesPopularity = true;
            if (selectedPopularity !== 'All') {
                const pop = tool.popularity || 0;
                if (selectedPopularity === 'Trending') {
                    matchesPopularity = pop >= 95;
                } else if (selectedPopularity === 'Popular') {
                    matchesPopularity = pop >= 90 && pop < 95;
                } else if (selectedPopularity === 'Rising') {
                    matchesPopularity = pop >= 85 && pop < 90;
                }
            }

            return matchesSearch && matchesCategory && matchesPricing && matchesPopularity;
        }).sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            } else if (sortBy === 'popular') {
                return (b.popularity || 0) - (a.popularity || 0);
            } else if (sortBy === 'alphabetical') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    }, [searchTerm, selectedCategory, selectedPricing, selectedPopularity, sortBy]);

    // Side effects for tracking and loading state
    useEffect(() => {
        if (!searchTerm.trim()) {
            setLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(false);
            trackSearch(searchTerm, filteredTools.length, {
                category: selectedCategory,
                pricing: selectedPricing,
                popularity: selectedPopularity,
                sortBy
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory, selectedPricing, selectedPopularity, sortBy, filteredTools.length]);

    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const paginatedTools = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTools.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTools, currentPage, itemsPerPage]);

    // Filter options with Lucide icons
    const pricingOptions = [
        { value: 'All', label: 'All Tools', icon: Sparkles, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { value: 'Free', label: 'Free', icon: Gift, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20' },
        { value: 'Paid', label: 'Paid', icon: Gem, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { value: 'Freemium', label: 'Freemium', icon: Rocket, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-900/20' }
    ];

    const popularityOptions = [
        { value: 'All', label: 'All Levels', icon: Trophy, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { value: 'Trending', label: 'Trending', subtitle: '95+', icon: Flame, color: 'from-red-500 to-orange-500', bg: 'bg-red-50 dark:bg-red-900/20' },
        { value: 'Popular', label: 'Popular', subtitle: '90-94', icon: Star, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { value: 'Rising', label: 'Rising', subtitle: '85-89', icon: BarChart3, color: 'from-green-500 to-teal-500', bg: 'bg-green-50 dark:bg-green-900/20' }
    ];

    const activeFiltersCount = (selectedPricing !== 'All' ? 1 : 0) + (selectedPopularity !== 'All' ? 1 : 0);

    const handleClearFilters = () => {
        setSelectedPricing('All');
        setSelectedPopularity('All');
        try {
            localStorage.removeItem('blogFilter_selectedPricing');
            localStorage.removeItem('blogFilter_selectedPopularity');
        } catch (error) {
            console.error('Error clearing filter localStorage:', error);
        }
    };

    return (
        <div className="py-6 min-h-screen bg-transparent animate-in fade-in duration-500 relative transition-colors" style={{ overflow: 'visible' }}>
            {/* Background Decorations */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
                <header className="text-center mb-4 mt-6">
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight dark:text-white">Directory of <span className="text-accent">AI Tools</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
                        Explore 100+ free AI tools for developers, designers, and data scientists.
                    </p>
                </header>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-3 sm:p-4 mb-8 max-w-4xl mx-auto relative" style={{ overflow: 'visible', zIndex: 100 }}>
                    <div className="flex flex-col md:flex-row items-center gap-2.5" style={{ overflow: 'visible' }}>
                        <div className="w-full md:flex-1" style={{ overflow: 'visible', position: 'relative', zIndex: 9999 }}>
                            <SearchBar onSearch={setSearchTerm} />
                        </div>
                        <div className="w-full md:w-auto flex items-center gap-2 flex-shrink-0" style={{ overflow: 'visible', position: 'relative', zIndex: 50 }}>
                            <div className="relative flex-shrink-0" ref={filterDropdownRef}>
                                <button
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-md h-[48px] whitespace-nowrap ${activeFiltersCount > 0
                                        ? 'bg-accent text-white'
                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span className="hidden sm:inline">Filters</span>
                                    {activeFiltersCount > 0 && (
                                        <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-accent rounded-full">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>

                                {/* Filter Modal - Professional & Elegant */}
                                {showFilterDropdown && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            onClick={() => setShowFilterDropdown(false)}
                                            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                                            style={{ zIndex: 100000 }}
                                            aria-hidden="true"
                                        />

                                        {/* Modal */}
                                        <div
                                            className="absolute top-full right-0 mt-2 w-[90vw] sm:w-[480px] max-h-[85vh] bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col"
                                            style={{ zIndex: 100001 }}
                                            role="dialog"
                                            aria-modal="true"
                                            aria-labelledby="filter-modal-title"
                                        >
                                            {/* Modal Header */}
                                            <div className="bg-gradient-to-r from-accent to-green-600 text-white px-6 py-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                                        <Filter className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 id="filter-modal-title" className="font-bold text-base">Advanced Filters</h3>
                                                        <p className="text-xs text-white/90">Refine your results</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setShowFilterDropdown(false)}
                                                    className="hover:bg-white/20 rounded-lg p-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
                                                    aria-label="Close filter modal"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Modal Content */}
                                            <div className="p-6 space-y-6 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 flex-1">
                                                {/* Pricing Filter */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center">
                                                            <DollarSign className="w-4 h-4 text-accent" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Pricing Model</h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Choose your budget preference</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2.5">
                                                        {pricingOptions.map(option => {
                                                            const IconComponent = option.icon;
                                                            return (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => setSelectedPricing(option.value)}
                                                                    className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${selectedPricing === option.value
                                                                        ? `${option.bg} border-2 border-accent shadow-md`
                                                                        : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                                                        }`}
                                                                >
                                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${selectedPricing === option.value
                                                                        ? `bg-gradient-to-br ${option.color}`
                                                                        : 'bg-white dark:bg-gray-600'
                                                                        }`}>
                                                                        <IconComponent className={`w-5 h-5 ${selectedPricing === option.value ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                                                            }`} />
                                                                    </div>
                                                                    <span className={`text-sm font-semibold ${selectedPricing === option.value
                                                                        ? 'text-gray-900 dark:text-white'
                                                                        : 'text-gray-700 dark:text-gray-300'
                                                                        }`}>
                                                                        {option.label}
                                                                    </span>
                                                                    {selectedPricing === option.value && (
                                                                        <div className="absolute top-2 right-2">
                                                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="relative py-2">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                                    </div>
                                                    <div className="relative flex justify-center">
                                                        <span className="bg-white dark:bg-gray-800 px-3 text-xs font-semibold text-gray-400">
                                                            AND
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Popularity Filter */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                                            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Popularity Level</h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Filter by community rating</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2.5">
                                                        {popularityOptions.map(option => {
                                                            const IconComponent = option.icon;
                                                            return (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => setSelectedPopularity(option.value)}
                                                                    className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${selectedPopularity === option.value
                                                                        ? `${option.bg} border-2 border-purple-500 shadow-md`
                                                                        : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                                                        }`}
                                                                >
                                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${selectedPopularity === option.value
                                                                        ? `bg-gradient-to-br ${option.color}`
                                                                        : 'bg-white dark:bg-gray-600'
                                                                        }`}>
                                                                        <IconComponent className={`w-5 h-5 ${selectedPopularity === option.value ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                                                            }`} />
                                                                    </div>
                                                                    <div className="flex flex-col items-start">
                                                                        <span className={`text-sm font-semibold ${selectedPopularity === option.value
                                                                            ? 'text-gray-900 dark:text-white'
                                                                            : 'text-gray-700 dark:text-gray-300'
                                                                            }`}>
                                                                            {option.label}
                                                                        </span>
                                                                        {option.subtitle && (
                                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {option.subtitle}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    {selectedPopularity === option.value && (
                                                                        <div className="absolute top-2 right-2">
                                                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Footer */}
                                            {activeFiltersCount > 0 && (
                                                <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 flex-shrink-0">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                                                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleClearFilters}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Clear All Filters
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <SortDropdown
                                value={sortBy}
                                onChange={setSortBy}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${selectedCategory === category
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                            aria-pressed={selectedCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <LoadingSpinner text="Loading tools..." />
                ) : filteredTools.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {paginatedTools.map(tool => (
                                <ToolCard key={tool.id} tool={tool} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredTools.length}
                        />
                    </>
                ) : (
                    <div className="text-center py-16 sm:py-20">
                        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-4">No tools found matching your criteria</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                                setSelectedPricing('All');
                                setSelectedPopularity('All');
                                setSortBy('newest');
                                setCurrentPage(1);
                                // Clear localStorage
                                try {
                                    localStorage.removeItem('blogFilter_searchTerm');
                                    localStorage.removeItem('blogFilter_selectedCategory');
                                    localStorage.removeItem('blogFilter_selectedPricing');
                                    localStorage.removeItem('blogFilter_selectedPopularity');
                                    localStorage.removeItem('blogFilter_sortBy');
                                } catch (error) {
                                    console.error('Error clearing localStorage:', error);
                                }
                            }}
                            className="px-6 py-2.5 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[44px]"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                <AdBanner />
            </div>
        </div>
    );
};

export default Blog;
