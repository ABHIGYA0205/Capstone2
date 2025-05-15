"use client"
import Link from 'next/link';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config';


import './signup.css';

const Signup = () => {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({ res })
      sessionStorage.setItem('user', true)
      setEmail("")
      setPassword("")
    }
    catch (e) {
      console.error(e)
    }
  }
  return (
    <div className='authContainer'
      data-aos="fade-in"
      data-aos-easing="linear"
      data-aos-duration="500"
    >
      <div className='authForm' >
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className='formGroup'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className='formGroup'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className='authButton'>Sign Up</button>
        </form>

        <p>Already have an account? <Link href="./login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
