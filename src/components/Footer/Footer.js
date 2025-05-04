"use client"
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3 className="footer-title">FitSphere</h3>
        <p className="footer-desc">Empowering your fitness journey, one workout at a time.</p>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FitSphere. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
