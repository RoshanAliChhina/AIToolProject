import React, { useState, useEffect } from 'react';
import { Share2, ArrowUp, Zap } from 'lucide-react';

const ShareBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#111]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 p-3 md:hidden animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center max-w-sm mx-auto space-x-3">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>

                <button className="flex-1 flex items-center justify-center space-x-2 bg-accent text-white font-bold py-3 rounded-xl shadow-lg shadow-accent/20 active:scale-95 transition-transform">
                    <Share2 className="w-4 h-4" />
                    <span>Share This</span>
                </button>

                <button className="p-3 rounded-full bg-yellow-400/20 text-yellow-600 dark:text-yellow-400">
                    <Zap className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ShareBar;
