'use client';
import Link from 'next/link';
import './Navbar.css';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
  const [user, loading] = useAuthState(auth);


  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="navbar-logo" />
      <ul className="navbar-links">
        {user && (
          <>
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/workouts" className="nav-link">Workouts</Link></li>
            <li><Link href="/tutorials" className="nav-link">Tutorials</Link></li>
            <li><Link href="/favorites" className="nav-link">Favorites</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </>
        )}
      </ul>

      <ul className="navbar-links">
        {!user && (
          <>
            <li><Link href="/auth/login" className="nav-link  auth">Login</Link></li>
            <li><Link href="/auth/signup" className="nav-link auth">Signup</Link></li>
          </>
        )}
        {user && (
          <li><button onClick={() => signOut(auth)} className="auth">Log Out</button></li>
        )}
      </ul>
    </nav>
  );
}
