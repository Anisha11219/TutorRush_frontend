import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import MainLayout from '../layouts/MainLayout.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(formData.email.trim(), formData.password);
      const home = `/${String(user.role).toLowerCase()}/dashboard`;
      navigate(location.state?.from?.pathname || home, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
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

              <h1>Welcome back to TutorRush!</h1>

              <p>
                Your next learning breakthrough is just one step away.
                Log in to connect with tutors and continue your learning journey.
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
                  <h3>Connect with tutors</h3>
                  <p>Choose learning support that suits you.</p>
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
                <span className="section-label">WELCOME BACK</span>
                <h2>Login to your account</h2>
                <p>Enter your details to access your account.</p>
              </div>

              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="login-role">Login as</label>
                  <select
                    id="login-role"
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
                  <label htmlFor="login-email">Email Address</label>

                  <div className="auth-input-wrapper">
                    <Mail size={19} className="auth-input-icon" />
                    <input
                      id="login-email"
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
                  <div className="auth-label-row">
                    <label htmlFor="login-password">Password</label>
                    <Link to="/forgot-password" className="auth-small-link">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="auth-input-wrapper">
                    <Lock size={19} className="auth-input-icon" />

                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
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

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Login to Account'}
                  {!loading && <ArrowRight size={19} />}
                </button>
              </form>

              <div className="auth-divider">
                <span>NEW TO TUTORRUSH?</span>
              </div>

              <p className="auth-switch">
                Don't have an account?{' '}
                <Link to="/register">Create an account</Link>
              </p>

              <p className="auth-demo-note">
                This is the frontend login page. Real login requires backend
                authentication and role verification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Login;
