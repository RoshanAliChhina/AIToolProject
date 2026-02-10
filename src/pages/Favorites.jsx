import React from 'react';
import ToolCard from '../components/ToolCard';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="py-12 min-h-screen bg-transparent animate-in fade-in duration-500 relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight dark:text-white">Your <span className="text-accent">Favorites</span></h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto">
                        A collection of your top AI tools.
                    </p>
                </header>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700 shadow-xl max-w-lg mx-auto transform transition-all hover:scale-[1.01]">
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">💔</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">No favorites yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
                            Start exploring our directory and save the AI tools that power your workflow.
                        </p>
                        <Link
                            to="/blog"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-white font-bold rounded-full shadow-lg shadow-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Explore Tools
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
