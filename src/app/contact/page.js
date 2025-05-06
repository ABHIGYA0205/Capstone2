'use client'
import './contact.css'
export default function ContactPage() {
  return (
    <div className="contact-container">
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
