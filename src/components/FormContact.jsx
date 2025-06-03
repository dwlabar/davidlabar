import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "../styles/components/_form.scss";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xpwdqwan");

  // State to track email and message field values
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('contact_email');
    const storedMessage = localStorage.getItem('contact_message');
    if (storedEmail) setEmail(storedEmail);
    if (storedMessage) setMessage(storedMessage);
  }, []);

  // Store changes in localStorage
  useEffect(() => {
    localStorage.setItem('contact_email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('contact_message', message);
  }, [message]);

  // Clear saved data on success
  useEffect(() => {
    if (state.succeeded) {
      localStorage.removeItem('contact_email');
      localStorage.removeItem('contact_message');
      setEmail('');
      setMessage('');
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return <div className="thankyou">Thanks for reaching out! I'll get back to you soon.</div>;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="email">Email Address</label>
      <input
        className="input-text"
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label className="label" htmlFor="message">Message</label>
      <textarea
        className="input-textarea"
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button className="bfg-button" type="submit" disabled={state.submitting}>
        Send
      </button>
    </form>
  );
};

export default ContactForm;
