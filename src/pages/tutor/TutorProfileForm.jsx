
import { useState } from 'react';
import {
  UserRound,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  MapPin,
  Save,
  CheckCircle2
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

const initialProfile = {
  fullName: '',
  email: '',
  phone: '',
  qualification: '',
  experience: '',
  subjects: '',
  topics: '',
  teachingMode: 'Both',
  location: '',
  bio: ''
};

function TutorProfileForm() {
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => ({
      ...current,
      [name]: ''
    }));

    setNotice('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profile.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!profile.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(profile.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!profile.qualification.trim()) {
      newErrors.qualification = 'Please enter your qualification.';
    }

    if (
      profile.experience === '' ||
      Number(profile.experience) < 0
    ) {
      newErrors.experience = 'Please enter valid teaching experience.';
    }

    if (!profile.subjects.trim()) {
      newErrors.subjects = 'Enter at least one subject.';
    }

    if (!profile.bio.trim()) {
      newErrors.bio = 'Please add a short professional introduction.';
    } else if (profile.bio.trim().length < 30) {
      newErrors.bio = 'Your introduction should contain at least 30 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setNotice('');
      return;
    }

    setNotice(
      'Profile saved in this demo. Backend integration is required to store your profile permanently.'
    );
  };

  const completionFields = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.qualification,
    profile.experience !== '',
    profile.subjects,
    profile.topics,
    profile.location,
    profile.bio
  ];

  const completedFields = completionFields.filter(
    (field) => field !== '' && field !== false
  ).length;

  const completionPercentage = Math.round(
    (completedFields / completionFields.length) * 100
  );

  return (
    <TutorLayout>
      <div className="tutor-profile-form-page">
        <div className="tutor-form-page-heading">
          <div>
            <span className="tutor-form-eyebrow">YOUR PROFESSIONAL PROFILE</span>
            <h1>My Tutor Profile</h1>
            <p>
              Introduce yourself to students and help them find the right tutor
              for their learning needs.
            </p>
          </div>

          <div className="tutor-form-completion">
            <span>Profile completion</span>
            <strong>{completionPercentage}%</strong>
            <div className="tutor-form-progress-track">
              <div
                className="tutor-form-progress-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {notice && (
          <div className="tutor-form-notice" role="status">
            <CheckCircle2 size={19} />
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}>
              Dismiss
            </button>
          </div>
        )}

        <form className="card tutor-profile-edit-form" onSubmit={handleSubmit}>
          <section className="tutor-form-section">
            <div className="tutor-form-section-heading">
              <div className="tutor-form-section-icon">
                <UserRound size={21} />
              </div>
              <div>
                <h2>Personal information</h2>
                <p>Enter your basic contact details.</p>
              </div>
            </div>

            <div className="tutor-profile-fields-grid">
              <div className="form-group">
                <label htmlFor="tutorFullName">Full name *</label>
                <input
                  id="tutorFullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && (
                  <span className="tutor-field-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tutorEmail">Email address *</label>
                <input
                  id="tutorEmail"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <span className="tutor-field-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tutorPhone">Mobile number *</label>
                <input
                  id="tutorPhone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <span className="tutor-field-error">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tutorLocation">City or location</label>
                <input
                  id="tutorLocation"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="e.g. Lucknow, Uttar Pradesh"
                />
              </div>
            </div>
          </section>

          <section className="tutor-form-section">
            <div className="tutor-form-section-heading">
              <div className="tutor-form-section-icon">
                <GraduationCap size={21} />
              </div>
              <div>
                <h2>Education and experience</h2>
                <p>Share your academic background and teaching experience.</p>
              </div>
            </div>

            <div className="tutor-profile-fields-grid">
              <div className="form-group">
                <label htmlFor="tutorQualification">Highest qualification *</label>
                <select
                  id="tutorQualification"
                  name="qualification"
                  value={profile.qualification}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.qualification)}
                >
                  <option value="">Select qualification</option>
                  <option value="Class 10 Passed">Class 10 Passed</option>
                  <option value="Class 12 Passed">Class 12 Passed</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
                {errors.qualification && (
                  <span className="tutor-field-error">
                    {errors.qualification}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tutorExperience">
                  Teaching experience (years) *
                </label>
                <input
                  id="tutorExperience"
                  name="experience"
                  type="number"
                  min="0"
                  max="60"
                  step="0.5"
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  aria-invalid={Boolean(errors.experience)}
                />
                {errors.experience && (
                  <span className="tutor-field-error">
                    {errors.experience}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="tutor-form-section">
            <div className="tutor-form-section-heading">
              <div className="tutor-form-section-icon">
                <BookOpen size={21} />
              </div>
              <div>
                <h2>Teaching information</h2>
                <p>Tell students what you can teach and how you teach.</p>
              </div>
            </div>

            <div className="tutor-profile-fields-grid">
              <div className="form-group">
                <label htmlFor="tutorSubjects">Subjects you teach *</label>
                <input
                  id="tutorSubjects"
                  name="subjects"
                  value={profile.subjects}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics, Physics"
                  aria-invalid={Boolean(errors.subjects)}
                />
                <span className="tutor-field-help">
                  Separate multiple subjects with commas.
                </span>
                {errors.subjects && (
                  <span className="tutor-field-error">{errors.subjects}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tutorTopics">Topics you specialize in</label>
                <input
                  id="tutorTopics"
                  name="topics"
                  value={profile.topics}
                  onChange={handleChange}
                  placeholder="e.g. Algebra, Calculus"
                />
                <span className="tutor-field-help">
                  Separate multiple topics with commas.
                </span>
              </div>

              <div className="form-group tutor-mode-field">
                <label htmlFor="tutorTeachingMode">Teaching mode *</label>
                <select
                  id="tutorTeachingMode"
                  name="teachingMode"
                  value={profile.teachingMode}
                  onChange={handleChange}
                >
                  <option value="Online">Online only</option>
                  <option value="Offline">Offline only</option>
                  <option value="Both">Online and offline</option>
                </select>
              </div>

              <div className="form-group tutor-bio-field">
                <label htmlFor="tutorBio">Professional introduction *</label>
                <textarea
                  id="tutorBio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Describe your teaching style, strengths, and how you help students..."
                  rows={5}
                  maxLength={600}
                  aria-invalid={Boolean(errors.bio)}
                />
                <span className="tutor-field-help">
                  {profile.bio.length}/600 characters
                </span>
                {errors.bio && (
                  <span className="tutor-field-error">{errors.bio}</span>
                )}
              </div>
            </div>
          </section>

          <div className="tutor-profile-form-footer">
            <p>
              <MapPin size={16} />
              Your information helps students discover suitable tutors.
            </p>

            <button type="submit" className="btn btn-primary">
              <Save size={18} />
              Save profile
            </button>
          </div>
        </form>
      </div>
    </TutorLayout>
  );
}

export default TutorProfileForm;
