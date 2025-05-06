'use client';
import { useEffect, useState } from 'react';
import './Workout.css'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const getKeyword = (level) => {
    switch (level) {
      case 'Easy': return 'beginner workout';
      case 'Medium': return 'intermediate workout';
      case 'Hard': return 'advanced workout';
      default: return 'fitness workout';
    }
  };

  useEffect(() => {
    fetchWorkouts(getKeyword(difficultyFilter));
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [difficultyFilter]);

  const fetchWorkouts = async (keyword) => {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=12&key=${API_KEY}`
      );
      const data = await res.json();
      console.log('YouTube API response:', data);
      setWorkouts(data.items || []);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const toggleFavorite = (videoId) => {
    const updated = favorites.includes(videoId)
      ? favorites.filter(id => id !== videoId)
      : [...favorites, videoId];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="workout-page">
      <h1 className="title">Workout Tutorials</h1>

      <div className="filters">
        {DIFFICULTIES.map(level => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={difficultyFilter === level ? 'active-filter' : ''}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="workout-grid">
        {workouts.map(({ id, snippet }) => {
          const videoId = id.videoId;
          const isFav = favorites.includes(videoId);
          return (
            <div key={videoId} className="workout-card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={snippet.title}
                allowFullScreen
              />
              <h3>{snippet.title}</h3>
              <button onClick={() => toggleFavorite(videoId)}>
                {isFav ? '★ Remove Favorite' : '☆ Add Favorite'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}