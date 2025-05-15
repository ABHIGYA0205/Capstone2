"use client"
import Link from 'next/link';
import Aos from 'aos';
import "aos/dist/aos.css"
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config';
import './login.css'
import { useRouter } from 'next/navigation';

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

const handleLogin=async (e)=>{
  e.preventDefault();
  try {
    const res = await signInWithEmailAndPassword(email, password)
    console.log({res})
    sessionStorage.setItem('user',true)
    setEmail("")
    setPassword("")
    router.push('/');
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
      <div className='authForm'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className='authButton'>Login</button>
        </form>
        <p>Don't have an account? <Link href="./signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
