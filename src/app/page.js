'use client';
import '../app/HomePage.css';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image'; 

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (!loading && !user && !userSession) {
      router.push('/auth/signup');
    } else {
      setReady(true);
    }
  }, [user, loading, router]);

  if (!ready) return null;

  return (
    <div className="home">
      <section className="hero" data-aos="fade-in">
        <h1 className="hero-title">
          Welcome to <span style={{ color: '#714CBD' }}>FitSphere</span>
        </h1>
        <p className="hero-subtitle">
          Your all-in-one platform for personalized fitness tutorials and guided workouts.
        </p>
      </section>

      <section className="features">
        <div className="feature-card" data-aos="fade-right">
          <h2 className="feature-title">Browse Workouts</h2>
          <Link href="./workouts">
            <div className="imagebackgorund">
              <Image
                src="/image1.jpg"
                alt="Browse workouts"
                width={400}
                height={300}
                className="imageCards"
              />
            </div>
          </Link>
          <p>Explore curated workouts by category, body part, or fitness level.</p>
        </div>

        <div className="feature-card" data-aos="fade-up">
          <h2 className="feature-title">Watch Tutorials</h2>
          <Link href="./tutorials">
            <div className="imagebackgorund">
              <Image
                src="/image2.jpg"
                alt="Watch tutorials"
                width={400}
                height={300}
                className="imageCards"
              />
            </div>
          </Link>
          <p>Follow professional video guides with step-by-step instructions.</p>
        </div>

        <div className="feature-card" data-aos="fade-left">
          <h2 className="feature-title">Track Favorites</h2>
          <Link href="./favorites">
            <div className="imagebackgorund">
              <Image
                src="/image3.webp"
                alt="Track favorites"
                width={400}
                height={300}
                className="imageCards"
              />
            </div>
          </Link>
          <p>Save your favorite workouts and easily access them anytime.</p>
        </div>
      </section>

      <section className="cta">
        <h2 className="cta-title">Ready to get started?</h2>
        <p className="cta-subtitle">
          Sign up now and start your fitness journey with FitSphere.
        </p>
        <a href="/auth/signup" className="cta-button">
          Join Now
        </a>
      </section>
    </div>
  );
}
