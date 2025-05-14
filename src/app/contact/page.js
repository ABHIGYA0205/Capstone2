'use client'
import './contact.css'
import Aos from 'aos';
import "aos/dist/aos.css"
export default function ContactPage() {
  return (
    <div className="contact-container"
    data-aos="zoom-in">
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
