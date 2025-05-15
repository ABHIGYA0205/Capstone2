'use client';
import './contact.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 600 });

    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else {
        setReady(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !ready) return null;

  return (
    <div className="contact-container" data-aos="zoom-out">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-text">Have a question or feedback? We'd love to hear from you.</p>

      <form className="contact-form">
        <label>Name:</label>
        <input type="text" placeholder="Your Name" />

        <label>Email:</label>
        <input type="email" placeholder="you@example.com" />

        <label>Message:</label>
        <textarea placeholder="Type your message here..."></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
