'use client';
import { useEffect, useState } from 'react';
import './tutorial.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

const DIFFICULTY_MAP = {
  All: 'fitness tutorial',
  'Getting Started': 'beginner tutorial',
  'Step It Up': 'intermediate tutorial',
  'Beast Mode': 'advanced tutorial',
};

const DIFFICULTIES = Object.keys(DIFFICULTY_MAP);

export default function TutorialsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Aos.init({});
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else {
        setReady(true);
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!ready) return;

    const keyword = DIFFICULTY_MAP[difficultyFilter];
    fetchWorkouts(keyword);
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [difficultyFilter, ready]);

  const fetchWorkouts = async (keyword) => {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=12&key=${API_KEY}`
      );
      const data = await res.json();
      setWorkouts(data.items || []);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const toggleFavorite = (videoId) => {
    const updated = favorites.includes(videoId)
      ? favorites.filter((id) => id !== videoId)
      : [...favorites, videoId];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (loading || !ready) return <p>Loading...</p>;

  return (
    <div className="tutorial-page" data-aos="fade-up">
      <h1 className="title">Tutorials</h1>

      <div className="filters" data-aos="zoom-out">
        {DIFFICULTIES.map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={difficultyFilter === level ? 'active-filter' : ''}
          >
            {level}
          </button>
        ))}
      </div>

      <div
        className="tutorial-grid"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1000"
      >
        {workouts.map(({ id, snippet }) => {
          const videoId = id.videoId;
          const isFav = favorites.includes(videoId);
          return (
            <div key={videoId} className="tutorial-card" data-aos="zoom-in">
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
