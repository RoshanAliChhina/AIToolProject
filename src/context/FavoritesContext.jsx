import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

 
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavorites = localStorage.getItem('ai-tools-favorites');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error("Failed to load favorites", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('ai-tools-favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites", error);
        }
    }, [favorites]);

    const addFavorite = (tool) => {
        setFavorites((prev) => {
            if (!prev.some(fav => fav.id === tool.id)) {
                return [...prev, tool];
            }
            return prev;
        });
    };

    const removeFavorite = (toolId) => {
        setFavorites((prev) => prev.filter(tool => tool.id !== toolId));
    };

    const isFavorite = (toolId) => {
        return favorites.some(tool => tool.id === toolId);
    };

    const toggleFavorite = (tool) => {
        if (isFavorite(tool.id)) {
            removeFavorite(tool.id);
        } else {
            addFavorite(tool);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
