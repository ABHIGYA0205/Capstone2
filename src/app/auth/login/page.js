"use client"
import Link from 'next/link';
import './login.css'
import Aos from 'aos';
import "aos/dist/aos.css"

const Login = () => {
  return (
    <div className='authContainer'
    data-aos="fade-in"
     data-aos-easing="linear"
     data-aos-duration="500">
      <div className='authForm'>
        <h2>Login</h2>
        <form>
          <div className='formGroup'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className='formGroup'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className='authButton'>Login</button>
        </form>
        <p>Don't have an account? <Link href="./signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
