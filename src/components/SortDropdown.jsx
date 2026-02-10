import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, TrendingUp, Calendar, ArrowUpAZ } from 'lucide-react';

const SortDropdown = ({ value, onChange, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { value: 'newest', label: 'Newest', icon: Calendar, color: 'from-gray-500 to-gray-600' },
        { value: 'popular', label: 'Popular', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
        { value: 'alphabetical', label: 'A-Z', icon: ArrowUpAZ, color: 'from-purple-500 to-purple-600' }
    ];

    const selectedOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];
    const SelectedIcon = selectedOption.icon;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when dropdown is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div 
            ref={dropdownRef}
            className={`relative z-[50] ${className}`}
            style={{ overflow: 'visible' }}
        >
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-44 px-4 py-3 pr-10 rounded-xl bg-gradient-to-r from-accent via-accent/95 to-accent/90 hover:from-accent/90 hover:via-accent/85 hover:to-accent/80 border-2 border-transparent hover:border-accent/30 focus:ring-2 focus:ring-accent/50 focus:outline-none shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 text-white transition-all cursor-pointer font-semibold tracking-wide text-sm sm:text-base h-[48px] flex items-center justify-between group relative overflow-hidden"
                aria-label="Sort tools"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <div className="flex items-center gap-2 relative z-10">
                    <SelectedIcon className="w-4 h-4" />
                    <span className="text-sm sm:text-base">{selectedOption.label}</span>
                </div>
                <ChevronDown 
                    className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="sort-dropdown-menu absolute top-full left-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden z-[50]"
                    style={{ 
                        width: '100%',
                        minWidth: '176px',
                        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(76, 175, 80, 0.1)',
                        animation: 'fadeInScale 0.2s ease-out'
                    }}
                    role="listbox"
                    onClick={(e) => e.stopPropagation()}
                >
                        {sortOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = option.value === value;
                            
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 text-left group relative overflow-hidden ${
                                        isSelected
                                            ? `bg-gradient-to-r ${option.color} text-white shadow-md`
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-accent/5 dark:hover:bg-gray-700/50'
                                    }`}
                                    role="option"
                                    aria-selected={isSelected}
                                >
                                    {/* Hover effect */}
                                    {!isSelected && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    )}
                                    
                                    <Icon className={`w-4 h-4 relative z-10 ${isSelected ? 'text-white' : 'text-accent'}`} />
                                    <span className={`font-semibold text-sm relative z-10 ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {option.label}
                                    </span>
                                    {isSelected && (
                                        <Sparkles className="w-4 h-4 ml-auto relative z-10 text-white animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;

