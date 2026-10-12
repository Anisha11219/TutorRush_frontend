import { useState } from 'react';
import {
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  BookOpen,
  Save,
  RotateCcw,
  CheckCircle,
  Camera,
} from 'lucide-react';

import StudentLayout from '../../layouts/StudentLayout.jsx';

const initialProfile = {
  fullName: '',
  email: '',
  phone: '',
  education: '',
  institution: '',
  city: '',
  subjects: '',
  bio: '',
};

function StudentProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Demo only: this saves the profile in the current page state.
    setSaved(true);
  };

  const handleReset = () => {
    setProfile(initialProfile);
    setSaved(false);
  };

  const initials = profile.fullName.trim()
    ? profile.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('')
    : 'ST';

  return (
    <StudentLayout>
      <div className="student-profile-page">
        <div className="student-profile-header">
          <div>
            <span className="student-profile-eyebrow">
              ACCOUNT SETTINGS
            </span>
            <h1>My Profile</h1>
            <p>
              Manage your personal information and learning preferences.
            </p>
          </div>
        </div>

        <div className="student-profile-content">
          <aside className="student-profile-sidebar-card">
            <div className="student-profile-avatar">
              <span>{initials}</span>
              <div className="student-profile-avatar-camera">
                <Camera size={15} />
              </div>
            </div>

            <h2>{profile.fullName || 'Your Name'}</h2>

            <p className="student-profile-role">
              <GraduationCap size={16} />
              Student Account
            </p>

            <div className="student-profile-divider" />

            <div className="student-profile-sidebar-info">
              <div>
                <Mail size={17} />
                <span>{profile.email || 'Add your email'}</span>
              </div>

              <div>
                <Phone size={17} />
                <span>{profile.phone || 'Add your phone number'}</span>
              </div>

              <div>
                <MapPin size={17} />
                <span>{profile.city || 'Add your city'}</span>
              </div>
            </div>

            <div className="student-profile-tip">
              <BookOpen size={20} />
              <div>
                <strong>Personalize your learning</strong>
                <p>
                  Add your subjects and education details to make your
                  learning profile more useful.
                </p>
              </div>
            </div>
          </aside>

          <section className="student-profile-form-card">
            <div className="student-profile-form-heading">
              <div>
                <h2>Personal Information</h2>
                <p>Update the details associated with your account.</p>
              </div>

              <div className="student-profile-form-icon">
                <UserRound size={22} />
              </div>
            </div>

            {saved && (
              <div className="student-profile-success">
                <CheckCircle size={19} />
                <span>
                  Profile details saved in this demo session.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="student-profile-form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={profile.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={profile.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter your 10-digit number"
                    value={profile.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number."
                    maxLength={10}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="education">Current Education</label>
                  <select
                    id="education"
                    name="education"
                    value={profile.education}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your education</option>
                    <option value="School - Class 9-10">
                      School - Class 9-10
                    </option>
                    <option value="School - Class 11-12">
                      School - Class 11-12
                    </option>
                    <option value="Diploma">Diploma</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="institution">School / College</label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Enter school or college name"
                    value={profile.institution}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={profile.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />
                </div>

                <div className="form-group student-profile-full-width">
                  <label htmlFor="subjects">Subjects You Need Help With</label>
                  <input
                    id="subjects"
                    name="subjects"
                    type="text"
                    placeholder="e.g. Mathematics, Physics, Java"
                    value={profile.subjects}
                    onChange={handleChange}
                  />
                  <small>
                    Separate multiple subjects with commas.
                  </small>
                </div>

                <div className="form-group student-profile-full-width">
                  <label htmlFor="bio">About Me</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell tutors about your learning goals..."
                    value={profile.bio}
                    onChange={handleChange}
                    maxLength={500}
                  />
                  <small>{profile.bio.length}/500 characters</small>
                </div>
              </div>

              <div className="student-profile-form-actions">
                <button
                  type="button"
                  className="student-profile-reset-button"
                  onClick={handleReset}
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button
                  type="submit"
                  className="student-profile-save-button"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>

        <p className="student-profile-demo-note">
          <strong>Note:</strong> This is currently a frontend demo. Profile
          information is held in page state and is not stored permanently.
          Backend integration will connect this form to the database.
        </p>
      </div>
    </StudentLayout>
  );
}

export default StudentProfile;