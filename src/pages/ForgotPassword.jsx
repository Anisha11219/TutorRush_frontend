import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout.jsx';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    // Demo only. Connect this form to the backend password reset API later.
    setNotice(
      'Password reset is not connected to a backend yet, so no email was sent.'
    );
  };

  return (
    <MainLayout>
      <section className="auth-section">
        <div className="container auth-container">
          <div className="auth-form-wrapper">
            <div className="auth-form-card">
              <div className="auth-mobile-logo">
                <GraduationCap size={30} />
                <span>Tutor<span className="logo-highlight">Rush</span></span>
              </div>

              <div className="auth-heading">
                <span className="section-label">RESET PASSWORD</span>
                <h1>Forgot your password?</h1>
                <p>Enter your email and we will help you get back in.</p>
              </div>

              {notice && (
                <div className="auth-error" role="status">
                  {notice}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="forgot-email">Email Address</label>

                  <div className="auth-input-wrapper">
                    <Mail size={19} className="auth-input-icon" />
                    <input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setNotice('');
                      }}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary auth-submit">
                  Send Reset Link <ArrowRight size={19} />
                </button>
              </form>

              <p className="auth-switch">
                Remembered it? <Link to="/login">Back to login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ForgotPassword;
