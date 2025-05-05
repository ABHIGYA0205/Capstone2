"use client"
import { useEffect, useState } from 'react';
import './Favorites.css'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const removeFromFavorites = (videoIdToRemove) => {
    const updatedFavorites = favorites.filter((id) => id !== videoIdToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Workouts</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">You haven't added any workouts to favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((videoId) => (
            <div key={videoId} className="favorite-card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
                title={`Workout ${videoId}`}
              />
              <button
                className="remove-button"
                onClick={() => removeFromFavorites(videoId)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
