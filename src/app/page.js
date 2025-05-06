"use client"
import '../app/HomePage.css'
import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Welcome to <span style={{color:'#714CBD'}}>FitSphere</span></h1>
        <p className="hero-subtitle">
          Your all-in-one platform for personalized fitness tutorials and guided workouts.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2 className="feature-title">Browse Workouts</h2>
          <Link href='./workouts'>
          <img src='./image1.jpg'></img>
          </Link>
          <p>Explore curated workouts by category, body part, or fitness level.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Watch Tutorials</h2>
          <Link href='./workouts'>
          <img src='./image2.jpg' style={{padding:'20px',margin:'10px auto'}}></img>
          </Link>
          <p>Follow professional video guides with step-by-step instructions.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Track Favorites</h2>
          <Link href='./favorites'>
          <img src='./image3.webp' style={{padding:'20px',margin:'10px auto'}}></img>
          </Link>
          <p>Save your favorite workouts and easily access them anytime.</p>
        </div>
      </section>

      <section className="cta">
        <h2 className="cta-title">Ready to get started?</h2>
        <p className="cta-subtitle">Sign up now and start your fitness journey with FitSphere.</p>
        <a href="/auth/signup" className="cta-button">
          Join Now
        </a>
      </section>
    </div>
  );
}
