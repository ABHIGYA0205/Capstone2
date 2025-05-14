import './about.css'
import Aos from 'aos';
import "aos/dist/aos.css"

export default function AboutPage() {
  return (
    <div className="about-container" data-aos="zoom-out">
      <h1 className="about-title">About <span style={{color:'#714CBD'}}>FitSphere</span></h1>
      <p className="about-text">
        FitSphere is your personalized fitness companion built to guide you on your journey to better health and well-being. Whether you're just starting out or already on your fitness path, FitSphere provides structured video workouts, customized routines, and expert tutorials for all levels.
      </p>
      <p className="about-text">
        Our mission is to make fitness accessible, motivating, and fun for everyone. We believe that a healthy body fosters a powerful mind and a balanced lifestyle.
      </p>
      <p className="about-text">
        Join our growing community of fitness enthusiasts, and start your transformation today — at your pace, on your terms.
      </p>
    </div>
  );
}
