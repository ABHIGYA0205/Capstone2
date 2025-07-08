'use client';
import { useEffect, useState } from 'react';
import './Favorites.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  doc,
  deleteDoc
} from 'firebase/firestore';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 600 });
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
    if (ready && user) {
      const fetchFavorites = async () => {
        try {
          const favRef = collection(db, 'users', user.uid, 'favorites');
          const snapshot = await getDocs(favRef);
          const vids = snapshot.docs.map(doc => doc.id);
          setFavorites(vids);
        } catch (error) {
          console.error('Error fetching favorites from Firestore:', error);
        }
      };
      fetchFavorites();
    }
  }, [ready, user]);

  const removeFromFavorites = async (videoIdToRemove) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', videoIdToRemove));
      const updated = favorites.filter((id) => id !== videoIdToRemove);
      setFavorites(updated);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading || !ready) return null;

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Workouts</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">You haven&apos;t added any workouts to favorites yet.</p>
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
