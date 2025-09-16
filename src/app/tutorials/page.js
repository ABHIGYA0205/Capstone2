'use client';
import { useEffect, useState } from 'react';
import './tutorial.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore';

const DIFFICULTY_MAP = {
  All: 'fitness tutorial',
  'Getting Started': 'beginner fitness tutorial',
  'Step It Up': 'intermediate fitness tutorial',
  'Beast Mode': 'advanced fitness tutorial',
};

const DIFFICULTIES = Object.keys(DIFFICULTY_MAP);

export default function TutorialsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);

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
    fetchFavorites();
  }, [difficultyFilter, ready]);

  const fetchWorkouts = async (keyword) => {
    const API_KEY =AIzaSyDi0pLrtbLRzc8KqpbucVXXKSqwo7Ke_Ig;
    setIsLoadingVideos(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=12&key=${API_KEY}`
      );
      const data = await res.json();
      setWorkouts(data.items || []);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const favRef = collection(db, 'users', user.uid, 'favorites');
      const snapshot = await getDocs(favRef);
      const favIds = snapshot.docs.map((doc) => doc.id);
      setFavorites(favIds);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
    }
  };

  const toggleFavorite = async (videoId) => {
    const docRef = doc(db, 'users', user.uid, 'favorites', videoId);

    try {
      if (favorites.includes(videoId)) {
        await deleteDoc(docRef);
        setFavorites((prev) => prev.filter((id) => id !== videoId));
      } else {
        await setDoc(docRef, { addedAt: new Date() });
        setFavorites((prev) => [...prev, videoId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
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

      {isLoadingVideos ? (
        <p style={{ textAlign: 'center' }}>Fetching videos...</p>
      ) : (
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
      )}
    </div>
  );
}
ig
