import { ExternalLink, ArrowRight, Heart, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useComparison } from '../context/ComparisonContext';
import { trackToolClick, trackComparison, trackFavorite } from '../utils/analytics';
import LazyImage from './LazyImage';

const ToolCard = ({ tool }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToComparison, isInComparison, canAddMore } = useComparison();
    const favorite = isFavorite(tool.id);
    const inComparison = isInComparison(tool.id);

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full shadow-md">
            <div className="relative h-[180px] overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6 flex items-center justify-center">
                {tool.image ? (
                    <LazyImage
                        src={tool.image}
                        alt={`${tool.name} logo`}
                        className="w-[96px] h-[96px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                ) : (
                    <div className="w-[96px] h-[96px] bg-accent/10 rounded-lg flex items-center justify-center drop-shadow-md">
                        <svg className="w-12 h-12 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-accent text-white px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                    {tool.category}
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(tool);
                        trackFavorite(favorite ? 'remove' : 'add', tool.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full transition-all duration-300 shadow-md min-w-[32px] min-h-[32px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${favorite
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                        }`}
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
                </button>
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors dark:text-white line-clamp-1">
                    {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-grow leading-relaxed">
                    {tool.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.features.slice(0, 3).map((feature, index) => (
                        <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 line-clamp-1"
                        >
                            {feature.name || feature}
                        </span>
                    ))}
                    {tool.features.length > 3 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300">
                            +{tool.features.length - 3}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between mt-auto gap-2">
                    <span className="text-sm font-semibold text-accent flex-shrink-0">{tool.pricing}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (canAddMore && !inComparison) {
                                    addToComparison(tool);
                                    trackComparison('add', [tool.id]);
                                }
                            }}
                            disabled={inComparison || !canAddMore}
                            className={`p-1.5 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${inComparison
                                    ? 'bg-accent text-white cursor-default'
                                    : canAddMore
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-accent hover:text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                                }`}
                            title={inComparison ? 'Already in comparison' : canAddMore ? 'Add to comparison' : 'Maximum 4 tools can be compared'}
                            aria-label={inComparison ? 'Already in comparison' : canAddMore ? 'Add to comparison' : 'Maximum 4 tools can be compared'}
                        >
                            <Scale className="w-4 h-4" />
                        </button>
                        <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            onClick={() => trackToolClick(tool.id, tool.name, tool.category)}
                            aria-label={`Visit ${tool.name} website`}
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                            to={`/article/${tool.id}`}
                            className="flex items-center text-sm font-semibold hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded px-2 py-0.5"
                            onClick={() => trackToolClick(tool.id, tool.name, tool.category)}
                        >
                            <span className="hidden sm:inline">Details</span>
                            <ArrowRight className="w-4 h-4 sm:ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
