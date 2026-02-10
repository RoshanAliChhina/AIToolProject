import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({ 
    rating = 0, 
    maxRating = 5, 
    size = 'md', 
    readonly = false, 
    onRatingChange,
    showLabel = false 
}) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(rating);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    };

    const handleClick = (value) => {
        if (readonly) return;
        setCurrentRating(value);
        if (onRatingChange) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (readonly) return;
        setHoveredRating(value);
    };

    const handleMouseLeave = () => {
        if (readonly) return;
        setHoveredRating(0);
    };

    const displayRating = hoveredRating || currentRating;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: maxRating }).map((_, index) => {
                    const value = index + 1;
                    const isFilled = value <= displayRating;
                    
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleClick(value)}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onMouseLeave={handleMouseLeave}
                            disabled={readonly}
                            className={`${sizeClasses[size]} transition-colors ${
                                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                            }`}
                            aria-label={`Rate ${value} out of ${maxRating}`}
                        >
                            <Star
                                className={`${sizeClasses[size]} transition-colors ${
                                    isFilled
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            {showLabel && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentRating > 0 ? `${currentRating.toFixed(1)} / ${maxRating}` : 'Not rated'}
                </span>
            )}
        </div>
    );
};

export default Rating;

