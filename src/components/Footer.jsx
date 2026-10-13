import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Github, Linkedin, Instagram } from "./SocialIcons.jsx";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <GraduationCap size={30} />
              <span>
                Tutor<span className="logo-highlight">Rush</span>
              </span>
            </Link>

            <p>
              Learn what you need, when you need it.
              Connect with tutors and make every learning
              moment count.
            </p>

            <div className="footer-socials">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={19} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={19} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h3>Get Started</h3>
            <Link to="/register">Join as Student</Link>
            <Link to="/register">Become a Tutor</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact Us</h3>
            <p>
              <Mail size={17} />
              support@tutorrush.com
            </p>
            <p>
              <Phone size={17} />
              Contact support
            </p>
            <p>
              <MapPin size={17} />
              Lucknow, Uttar Pradesh
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} TutorRush. All rights reserved.
          </p>
          <p>Built to make learning easier.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;