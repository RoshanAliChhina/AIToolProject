import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { toolsData } from '../data/toolsData';
import { trackSearch } from '../utils/analytics';

const SearchBar = ({ onSearch, showSuggestions = true }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestionsList, setShowSuggestionsList] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (searchTerm.trim().length > 0 && showSuggestions) {
            const matches = toolsData
                .filter(tool =>
                    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5);
            setSuggestions(matches);
            setShowSuggestionsList(matches.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestionsList(false);
        }
    }, [searchTerm, showSuggestions]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
        setSelectedIndex(-1);
    };

    const handleSuggestionClick = (tool) => {
        setSearchTerm(tool.name);
        setShowSuggestionsList(false);
        onSearch(tool.name);
        trackSearch(tool.name, 1);
        inputRef.current?.blur();
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (!showSuggestionsList || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[selectedIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestionsList(false);
        }
    };

    useEffect(() => {
        if (selectedIndex >= 0 && suggestionsRef.current) {
            const selectedElement = suggestionsRef.current.children[selectedIndex];
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);



    return (
        <div className="relative w-full z-[9999]" style={{ overflow: 'visible' }}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-accent" />
            </div>
            <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                className="block w-full pl-11 pr-10 h-[44px] border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-accent transition-all text-sm placeholder:text-gray-400 focus:outline-none relative z-10"
                placeholder="Search for tools like 'Cursor', 'Claude', 'React'..."
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (searchTerm && suggestions.length > 0) {
                        setShowSuggestionsList(true);
                    }
                }}
                onBlur={() => setTimeout(() => setShowSuggestionsList(false), 250)}
                aria-label="Search for AI tools"
                aria-autocomplete="list"
                aria-expanded={showSuggestionsList}
                aria-controls="search-suggestions"
            />
            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-20 focus:outline-none focus:ring-2 focus:ring-accent rounded"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                </button>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestionsList && suggestions.length > 0 && (
                <div
                    id="search-suggestions"
                    ref={suggestionsRef}
                    role="listbox"
                    className="absolute top-full w-full mt-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl max-h-[400px] overflow-y-auto z-[9999]"
                >
                    {suggestions.map((tool, index) => (
                        <button
                            key={tool.id}
                            onClick={() => handleSuggestionClick(tool)}
                            role="option"
                            aria-selected={index === selectedIndex}
                            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 ${index === selectedIndex
                                    ? 'bg-accent/10 text-accent'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={tool.image}
                                    alt=""
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">{tool.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                    {tool.category} • {tool.description}
                                </div>
                            </div>
                            <TrendingUp className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

