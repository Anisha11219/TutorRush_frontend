import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Clock,
  IndianRupee,
  MapPin,
  Video,
  CalendarDays,
  CheckCircle,
  ArrowLeft,
  Send,
  Lightbulb,
  FileText,
} from 'lucide-react';

import StudentLayout from '../../layouts/StudentLayout.jsx';

const initialForm = {
  subject: '',
  topic: '',
  description: '',
  difficulty: 'Intermediate',
  classMode: 'Online',
  preferredDate: '',
  preferredTime: '',
  duration: '60',
  budget: '300',
  location: '',
};

function CreateRequirement() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.classMode === 'Offline' && !form.location.trim()) {
      setError('Please enter your preferred location for offline classes.');
      return;
    }

    setError('');

    // Demo only: no requirement is sent to a backend yet.
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setError('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <StudentLayout>
        <div className="requirement-success-page">
          <div className="requirement-success-icon">
            <CheckCircle size={48} />
          </div>

          <span className="requirement-eyebrow">REQUIREMENT CREATED</span>

          <h1>Your learning requirement is ready!</h1>

          <p>
            Your demo requirement for <strong>{form.subject}</strong> on{' '}
            <strong>{form.topic}</strong> has been prepared successfully.
          </p>

          <div className="requirement-success-summary">
            <div>
              <span>Subject</span>
              <strong>{form.subject}</strong>
            </div>

            <div>
              <span>Topic</span>
              <strong>{form.topic}</strong>
            </div>

            <div>
              <span>Learning Mode</span>
              <strong>{form.classMode}</strong>
            </div>

            <div>
              <span>Difficulty</span>
              <strong>{form.difficulty}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>{form.duration} minutes</strong>
            </div>

            <div>
              <span>Budget</span>
              <strong>₹{form.budget} / hour</strong>
            </div>
          </div>

          <div className="requirement-success-note">
            <Lightbulb size={19} />
            <p>
              <strong>Demo preview:</strong> This requirement has not been
              stored or sent to tutors. Backend integration will enable
              requirement submission and tutor matching.
            </p>
          </div>

          <div className="requirement-success-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/student/tutors')}
            >
              Find Tutors
            </button>

            <button
              type="button"
              className="requirement-secondary-button"
              onClick={handleReset}
            >
              Create Another Requirement
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="requirement-page">
        <div className="requirement-page-header">
          <div>
            <Link
              to="/student/dashboard"
              className="requirement-back-link"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <span className="requirement-eyebrow">
              PERSONALIZED LEARNING
            </span>

            <h1>What do you need help with?</h1>

            <p>
              Tell us which topic you want to understand. TutorRush will
              help you find a suitable tutor.
            </p>
          </div>

          <div className="requirement-header-illustration">
            <GraduationCap size={65} strokeWidth={1.5} />
          </div>
        </div>

        <div className="requirement-layout">
          <section className="requirement-form-card">
            <div className="requirement-form-title">
              <div className="requirement-title-icon">
                <FileText size={23} />
              </div>

              <div>
                <h2>Learning Requirement</h2>
                <p>Complete the details below.</p>
              </div>
            </div>

            {error && (
              <div className="requirement-error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="requirement-form-grid">
                <div className="form-group">
                  <label htmlFor="subject">
                    Subject <span>*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Programming">Programming</option>
                    <option value="English">English</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="topic">
                    Topic Name <span>*</span>
                  </label>

                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    placeholder="e.g. Data Structures, Calculus"
                    value={form.topic}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="form-group requirement-full-width">
                  <label htmlFor="description">
                    Describe Your Problem
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Explain what you find difficult or what you want the tutor to teach..."
                    value={form.description}
                    onChange={handleChange}
                    maxLength={1000}
                  />

                  <small>
                    {form.description.length}/1000 characters
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="difficulty">
                    Difficulty Level <span>*</span>
                  </label>

                  <select
                    id="difficulty"
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duration">
                    Session Duration <span>*</span>
                  </label>

                  <select
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>
              </div>

              <div className="requirement-section-divider" />

              <div className="requirement-subsection-heading">
                <div className="requirement-title-icon">
                  <Video size={22} />
                </div>

                <div>
                  <h2>Class Preferences</h2>
                  <p>Choose how and when you want to learn.</p>
                </div>
              </div>

              <div className="requirement-mode-options">
                <label
                  className={`requirement-mode-card ${
                    form.classMode === 'Online' ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="classMode"
                    value="Online"
                    checked={form.classMode === 'Online'}
                    onChange={handleChange}
                  />

                  <div className="requirement-mode-icon online">
                    <Video size={24} />
                  </div>

                  <div>
                    <strong>Online Class</strong>
                    <span>Learn through video calls.</span>
                  </div>

                  <span className="requirement-mode-check">
                    {form.classMode === 'Online' && (
                      <CheckCircle size={19} />
                    )}
                  </span>
                </label>

                <label
                  className={`requirement-mode-card ${
                    form.classMode === 'Offline' ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="classMode"
                    value="Offline"
                    checked={form.classMode === 'Offline'}
                    onChange={handleChange}
                  />

                  <div className="requirement-mode-icon offline">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <strong>Offline Class</strong>
                    <span>Meet your tutor in person.</span>
                  </div>

                  <span className="requirement-mode-check">
                    {form.classMode === 'Offline' && (
                      <CheckCircle size={19} />
                    )}
                  </span>
                </label>
              </div>

              {form.classMode === 'Offline' && (
                <div className="form-group requirement-location-field">
                  <label htmlFor="location">
                    Preferred Location <span>*</span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Enter your area or preferred meeting location"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="requirement-form-grid requirement-schedule-grid">
                <div className="form-group">
                  <label htmlFor="preferredDate">
                    <CalendarDays size={15} />
                    Preferred Date
                  </label>

                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={new Date().toLocaleDateString('en-CA')}
                    value={form.preferredDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredTime">
                    <Clock size={15} />
                    Preferred Time
                  </label>

                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="">Choose a time</option>
                    <option value="Morning">Morning (6 AM - 12 PM)</option>
                    <option value="Afternoon">
                      Afternoon (12 PM - 4 PM)
                    </option>
                    <option value="Evening">Evening (4 PM - 8 PM)</option>
                    <option value="Night">Night (8 PM - 10 PM)</option>
                  </select>
                </div>

                <div className="form-group requirement-full-width">
                  <label htmlFor="budget">
                    <IndianRupee size={15} />
                    Maximum Budget per Hour <span>*</span>
                  </label>

                  <div className="requirement-budget-input">
                    <span>₹</span>

                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      min="50"
                      max="10000"
                      step="50"
                      value={form.budget}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <small>
                    Set your preferred maximum hourly budget.
                  </small>
                </div>
              </div>

              <div className="requirement-form-actions">
                <button
                  type="button"
                  className="requirement-secondary-button"
                  onClick={handleReset}
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  className="btn btn-primary requirement-submit-button"
                >
                  <Send size={17} />
                  Submit Requirement
                </button>
              </div>
            </form>
          </section>

          <aside className="requirement-help-card">
            <div className="requirement-help-icon">
              <Lightbulb size={28} />
            </div>

            <h2>How it works</h2>

            <p>
              Follow these simple steps to find the right tutor for your
              learning needs.
            </p>

            <div className="requirement-help-step">
              <span>1</span>
              <div>
                <strong>Describe your topic</strong>
                <p>Tell us the subject and concept you need help with.</p>
              </div>
            </div>

            <div className="requirement-help-step">
              <span>2</span>
              <div>
                <strong>Set your preferences</strong>
                <p>Choose the class mode, timing, difficulty, and budget.</p>
              </div>
            </div>

            <div className="requirement-help-step">
              <span>3</span>
              <div>
                <strong>Explore suitable tutors</strong>
                <p>Review tutor profiles and choose one that suits you.</p>
              </div>
            </div>

            <div className="requirement-help-tip">
              <BookOpen size={19} />
              <p>
                <strong>Helpful tip</strong>
                <span>
                  Be specific about the topic you are struggling with so
                  tutors can better understand your needs.
                </span>
              </p>
            </div>
          </aside>
        </div>

        <p className="requirement-demo-note">
          <strong>Frontend demo:</strong> Submitting this form shows a
          confirmation preview. The requirement is not saved to the database
          or sent to tutors until backend integration is completed.
        </p>
      </div>
    </StudentLayout>
  );
}

export default CreateRequirement;