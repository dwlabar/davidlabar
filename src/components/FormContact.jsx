import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "../styles/components/_form.scss";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xpwdqwan");
  if (state.succeeded) {
    return <p>Thanks for reaching out! I'll get back to you soon.</p>;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="email">Email Address</label>
      <input
        className="input-text" 
        id="email"
        type="email"
        name="email"
        required
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />

      <label className="label" htmlFor="message">Message</label>
      <textarea
        className="input-textarea" 
        id="message"
        name="message"
        required
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />

      <button className="bfg-button" type="submit" disabled={state.submitting}>
        Send
      </button>
    </form>
  );
};

export default ContactForm;
