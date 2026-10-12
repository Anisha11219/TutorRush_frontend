import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  UserRound,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout.jsx';

function Register() {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError('');
    setSuccess('');
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (formData.fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Your password must contain at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setSuccess(
      `Your ${role} registration form is valid! Backend registration is not connected yet.`
    );

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <MainLayout>
      <section className="register-section">
        <div className="container register-container">
          <div className="register-intro">
            <div className="register-brand-icon">
              <GraduationCap size={42} />
            </div>

            <span className="section-label">JOIN TUTORRUSH</span>

            <h1>Your learning journey starts here.</h1>

            <p>
              Join a community where students find the right guidance and
              passionate tutors share their knowledge.
            </p>

            <div className="register-benefit">
              <BookOpen size={22} />
              <div>
                <h3>Learn by topic</h3>
                <p>Get help with the exact topic you find difficult.</p>
              </div>
            </div>

            <div className="register-benefit">
              <BriefcaseBusiness size={22} />
              <div>
                <h3>Teach your strengths</h3>
                <p>Share your knowledge and connect with learners.</p>
              </div>
            </div>

            <div className="register-trust-note">
              <span className="register-trust-dot"></span>
              A smarter way to connect learning with teaching.
            </div>
          </div>

          <div className="register-form-wrapper">
            <div className="register-form-card">
              <div className="register-mobile-logo">
                <GraduationCap size={30} />
                <span>
                  Tutor<span className="logo-highlight">Rush</span>
                </span>
              </div>

              <div className="register-heading">
                <h2>Create your account</h2>
                <p>Fill in your details to get started.</p>
              </div>

              <div className="register-role-label">I want to join as a</div>

              <div className="register-role-options">
                <button
                  type="button"
                  className={`register-role-card ${
                    role === 'student' ? 'selected' : ''
                  }`}
                  onClick={() => handleRoleChange('student')}
                  aria-pressed={role === 'student'}
                >
                  <span className="register-role-icon">
                    <BookOpen size={23} />
                  </span>
                  <span className="register-role-text">
                    <strong>Student</strong>
                    <small>Find a tutor</small>
                  </span>
                  <span className="register-role-radio"></span>
                </button>

                <button
                  type="button"
                  className={`register-role-card ${
                    role === 'tutor' ? 'selected' : ''
                  }`}
                  onClick={() => handleRoleChange('tutor')}
                  aria-pressed={role === 'tutor'}
                >
                  <span className="register-role-icon">
                    <GraduationCap size={23} />
                  </span>
                  <span className="register-role-text">
                    <strong>Tutor</strong>
                    <small>Teach students</small>
                  </span>
                  <span className="register-role-radio"></span>
                </button>
              </div>

              {error && (
                <div className="register-message register-error" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="register-message register-success" role="status">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="register-name">Full Name</label>
                  <div className="register-input-wrapper">
                    <UserRound size={19} />
                    <input
                      id="register-name"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">Email Address</label>
                  <div className="register-input-wrapper">
                    <Mail size={19} />
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
                  <label htmlFor="register-phone">Mobile Number</label>
                  <div className="register-input-wrapper">
                    <Phone size={19} />
                    <input
                      id="register-phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel-national"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <div className="register-input-wrapper">
                    <Lock size={19} />
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm-password">
                    Confirm Password
                  </label>
                  <div className="register-input-wrapper">
                    <Lock size={19} />
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Enter your password again"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="register-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary register-submit"
                >
                  Create Account <ArrowRight size={19} />
                </button>
              </form>

              <p className="register-login-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>

              <p className="register-demo-note">
                By creating an account, you agree to follow TutorRush's
                platform guidelines. Account creation will work after
                backend integration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Register;