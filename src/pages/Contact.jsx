import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle
} from 'lucide-react';

import MainLayout from '../layouts/MainLayout.jsx';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <MainLayout>
      <section className="contact-hero">
        <div className="container">
          <span className="section-label">CONTACT US</span>

          <h1>
            Let's start a <span>conversation.</span>
          </h1>

          <p>
            Have a question about TutorRush? We'd love to hear
            from you. Send us a message and let us know how
            we can help.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Get in touch</h2>

            <p className="contact-info-description">
              Whether you're a student looking for a tutor or
              someone interested in teaching, we're here to help.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={22} />
                </div>

                <div>
                  <h3>Email</h3>
                  <p>support@tutorrush.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Phone size={22} />
                </div>

                <div>
                  <h3>Phone</h3>
                  <p>Contact support for assistance</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3>Location</h3>
                  <p>Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            <div className="contact-help-card">
              <MessageCircle size={25} />

              <div>
                <h3>We're happy to help!</h3>
                <p>
                  Share your question with us using the form.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2>Send us a message</h2>

            <p className="contact-form-description">
              Fill in the details below.
            </p>

            {submitted && (
              <div className="contact-success" role="status">
                Thank you! Your form was submitted successfully.
                Please note that this demo does not send messages
                to a server yet.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact-submit"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Contact;