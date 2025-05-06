"use client"

import Link from 'next/link';
import './signup.css'; 

const Signup = () => {
  return (
    <div className='authContainer'>
      <div className='authForm'>
        <h2>Sign Up</h2>
        <form>
          <div className='formGroup'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className='formGroup'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className='formGroup'>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit" className='authButton'>Sign Up</button>
        </form>
        <p>Already have an account? <Link href="./login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
