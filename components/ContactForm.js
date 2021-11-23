import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="component-contact-form">
      <h2>Contact form</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="column">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="contact-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="contact-message"
            cols="30"
            rows="10"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>
          Thank you {name} for your message. We will get back to you as soon as
          we can!
        </p>
      )}
    </section>
  )
}
