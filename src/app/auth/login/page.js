import Link from 'next/link';
import './login.css'

const Login = () => {
  return (
    <div className='authContainer'>
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
