import React from 'react';

const AdBanner = ({ className = "" }) => {
    return (
        <div className={`w-full my-12 ${className}`}>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 absolute top-4">Advertisement</span>
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="text-center z-10 mt-4">
                    <p className="text-gray-400 dark:text-gray-600 font-medium">Space available for ad placement</p>
                    <p className="text-xs text-gray-300 dark:text-gray-700 mt-1">728x90 • Responsive</p>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
