import Link from 'next/link';
import '../app/HomePage.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="navbar-logo" />
      <ul className="navbar-links">
        <li><Link href="/" className="nav-link">Home</Link></li>
        <li><Link href="/workouts" className="nav-link">Workouts</Link></li>
        <li><Link href="/favorites" className="nav-link">Favorites</Link></li>
        <li><Link href="/about" className="nav-link">About</Link></li>
        <li><Link href="/contact" className="nav-link">Contact</Link></li>
        <li><Link href="/auth/login" className="nav-link">Login</Link></li>
      </ul>
    </nav>
  );
}
