"use client";
import Link from 'next/link';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './signup.css';

const Signup = () => {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [
    createUserWithEmailAndPassword,
    userCredential,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res && res.user) {
        sessionStorage.setItem('user', 'true');
        setEmail("");
        setPassword("");
        Swal.fire({
          title: "Success!",
          text: "Your have been successfully registered!",
          icon: "success",
        })
        router.push('/auth/login');
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div
      className="authContainer"
      data-aos="fade-in"
      data-aos-easing="linear"
      data-aos-duration="500"
    >
      <div className="authForm">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="authButton" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem' }}>
            {error.message.includes('email-already-in-use')
              ? 'This email is already registered.'
              : error.message}
          </p>
        )}

        <p>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
