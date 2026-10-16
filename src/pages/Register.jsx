import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout.jsx';
import { useAuth, ROLE_HOME } from '../context/AuthContext.jsx';
import { ROLES } from '../constants/schema.js';

const MIN_PASSWORD_LENGTH = 8;

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please enter your name and email address.');
      return;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    // Demo only: nothing is saved to a server. Connect to the backend API later.
    const user = login({
      name: formData.name,
      email: formData.email,
      role: ROLES[formData.role.toUpperCase()]
    });

    navigate(ROLE_HOME[user.role], { replace: true });
  };

  return (
    <MainLayout>
      <section className="auth-section">
        <div className="container auth-container">
          <div className="auth-illustration">
            <div className="auth-illustration-content">
              <div className="auth-icon-large">
                <GraduationCap size={48} />
              </div>

              <h1>Join TutorRush today!</h1>

              <p>
                Create an account to find tutors for the exact topic you
                need, or share your knowledge as a tutor.
              </p>

              <div className="auth-benefit">
                <span><BookOpen size={20} /></span>
                <div>
                  <h3>Learn your way</h3>
                  <p>Find help for the exact topic you need.</p>
                </div>
              </div>

              <div className="auth-benefit">
                <span><GraduationCap size={20} /></span>
                <div>
                  <h3>Teach what you know</h3>
                  <p>Help students understand difficult topics.</p>
                </div>
              </div>
            </div>

            <div className="auth-decoration auth-decoration-one"></div>
            <div className="auth-decoration auth-decoration-two"></div>
          </div>

          <div className="auth-form-wrapper">
            <div className="auth-form-card">
              <div className="auth-mobile-logo">
                <GraduationCap size={30} />
                <span>Tutor<span className="logo-highlight">Rush</span></span>
              </div>

              <div className="auth-heading">
                <span className="section-label">GET STARTED</span>
                <h2>Create your account</h2>
                <p>Fill in your details to join TutorRush.</p>
              </div>

              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="register-role">I want to join as</label>
                  <select
                    id="register-role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="register-name">Full Name</label>

                  <div className="auth-input-wrapper">
                    <User size={19} className="auth-input-icon" />
                    <input
                      id="register-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">Email Address</label>

                  <div className="auth-input-wrapper">
                    <Mail size={19} className="auth-input-icon" />
                    <input
                      id="register-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">Password</label>

                  <div className="auth-input-wrapper">
                    <Lock size={19} className="auth-input-icon" />

                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={MIN_PASSWORD_LENGTH}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm">Confirm Password</label>

                  <div className="auth-input-wrapper">
                    <Lock size={19} className="auth-input-icon" />
                    <input
                      id="register-confirm"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Create Account'}
                  {!loading && <ArrowRight size={19} />}
                </button>
              </form>

              <div className="auth-divider">
                <span>ALREADY A MEMBER?</span>
              </div>

              <p className="auth-switch">
                Already have an account?{' '}
                <Link to="/login">Login</Link>
              </p>

              <p className="auth-demo-note">
                Demo mode: your account is not saved on a server. Real sign-up
                will need backend authentication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Register;
