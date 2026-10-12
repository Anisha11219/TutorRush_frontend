
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Clock,
  Video,
  MessageCircle,
  Phone,
  CalendarDays,
  BookOpen,
  BadgeCheck
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout.jsx';

const sampleTutors = [
  {
    id: '1',
    name: 'Priya Sharma',
    subject: 'Mathematics',
    qualification: 'M.Sc. Mathematics',
    experience: '5 years',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 500,
    mode: 'Both',
    location: 'Lucknow, Uttar Pradesh',
    bio: 'I help students understand mathematical concepts through practical examples, interactive sessions, and structured practice.',
    topics: ['Algebra', 'Calculus', 'Trigonometry', 'Coordinate Geometry'],
    languages: ['English', 'Hindi']
  },
  {
    id: '2',
    name: 'Rahul Verma',
    subject: 'Computer Science',
    qualification: 'B.Tech in Computer Science',
    experience: '3 years',
    rating: 4.8,
    reviews: 86,
    hourlyRate: 600,
    mode: 'Online',
    location: 'Lucknow, Uttar Pradesh',
    bio: 'I teach programming and computer science concepts with hands-on examples, coding exercises, and step-by-step explanations.',
    topics: ['C Programming', 'Java', 'Data Structures', 'DBMS'],
    languages: ['English', 'Hindi']
  },
  {
    id: '3',
    name: 'Neha Singh',
    subject: 'Physics',
    qualification: 'M.Sc. Physics',
    experience: '4 years',
    rating: 4.7,
    reviews: 72,
    hourlyRate: 450,
    mode: 'Both',
    location: 'Lucknow, Uttar Pradesh',
    bio: 'My teaching approach focuses on building strong fundamentals and making difficult physics concepts easier to understand.',
    topics: ['Mechanics', 'Optics', 'Electricity', 'Modern Physics'],
    languages: ['English', 'Hindi']
  }
];

function TutorProfile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');

  const passedTutor = location.state?.tutor;
  const tutor =
    passedTutor ||
    sampleTutors.find((item) => item.id === id) ||
    sampleTutors[0];

  const handleContact = (method) => {
    setNotice(
      `${method} request selected. Live calling and messaging will be available after backend integration.`
    );
  };

  const handleBooking = () => {
    navigate('/student/bookings', {
      state: {
        selectedTutor: tutor,
        message: `You selected ${tutor.name}. Booking functionality will be connected during backend integration.`
      }
    });
  };

  return (
    <StudentLayout>
      <div className="tutor-profile-page">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back to tutors
        </button>

        {notice && (
          <div className="profile-notice" role="status">
            {notice}
            <button type="button" onClick={() => setNotice('')}>
              Dismiss
            </button>
          </div>
        )}

        <section className="tutor-profile-header card">
          <div className="tutor-profile-avatar">
            {tutor.name?.charAt(0)?.toUpperCase() || 'T'}
          </div>

          <div className="tutor-profile-heading">
            <div className="tutor-name-line">
              <h1>{tutor.name}</h1>
              <BadgeCheck size={21} className="verified-icon" />
            </div>

            <p className="tutor-profile-subtitle">{tutor.subject} Tutor</p>

            <div className="tutor-profile-rating">
              <Star size={17} fill="currentColor" />
              <strong>{tutor.rating ?? 'New'}</strong>
              <span>({tutor.reviews ?? 0} reviews)</span>
            </div>

            <p className="tutor-profile-location">
              <MapPin size={17} />
              {tutor.location || 'Location not specified'}
            </p>
          </div>

          <div className="tutor-profile-price">
            <span>Starting from</span>
            <strong>₹{tutor.hourlyRate ?? tutor.price ?? 500}</strong>
            <span>per hour</span>
          </div>
        </section>

        <div className="tutor-profile-grid">
          <div className="tutor-profile-main">
            <section className="card tutor-detail-card">
              <h2>About the tutor</h2>
              <p>
                {tutor.bio ||
                  `${tutor.name} helps students understand ${tutor.subject} through clear explanations and topic-focused learning sessions.`}
              </p>
            </section>

            <section className="card tutor-detail-card">
              <h2>Teaching details</h2>

              <div className="tutor-detail-list">
                <div className="tutor-detail-item">
                  <GraduationCap size={21} />
                  <div>
                    <span>Qualification</span>
                    <strong>{tutor.qualification || 'Not specified'}</strong>
                  </div>
                </div>

                <div className="tutor-detail-item">
                  <BriefcaseBusiness size={21} />
                  <div>
                    <span>Teaching experience</span>
                    <strong>{tutor.experience || 'Not specified'}</strong>
                  </div>
                </div>

                <div className="tutor-detail-item">
                  <Clock size={21} />
                  <div>
                    <span>Class duration</span>
                    <strong>Flexible session duration</strong>
                  </div>
                </div>

                <div className="tutor-detail-item">
                  <BookOpen size={21} />
                  <div>
                    <span>Subject</span>
                    <strong>{tutor.subject}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="card tutor-detail-card">
              <h2>Topics covered</h2>
              <div className="tutor-topic-list">
                {(tutor.topics || [tutor.subject]).map((topic) => (
                  <span className="tutor-topic-tag" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </section>

            <section className="card tutor-detail-card">
              <h2>Languages</h2>
              <div className="tutor-topic-list">
                {(tutor.languages || ['English', 'Hindi']).map((language) => (
                  <span className="tutor-topic-tag" key={language}>
                    {language}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="tutor-profile-sidebar">
            <section className="card tutor-booking-card">
              <h2>Learn with {tutor.name?.split(' ')[0]}</h2>
              <p>Choose a contact option or proceed to request a learning session.</p>

              <div className="tutor-mode-info">
                {tutor.mode === 'Online' ? (
                  <Video size={19} />
                ) : (
                  <MapPin size={19} />
                )}
                <div>
                  <span>Teaching mode</span>
                  <strong>{tutor.mode || 'Online / Offline'}</strong>
                </div>
              </div>

              <button
                className="btn btn-primary tutor-action-button"
                type="button"
                onClick={handleBooking}
              >
                <CalendarDays size={18} />
                Request a session
              </button>

              <button
                className="btn btn-outline tutor-action-button"
                type="button"
                onClick={() => handleContact('Video call')}
              >
                <Video size={18} />
                Contact by video
              </button>

              <button
                className="btn btn-outline tutor-action-button"
                type="button"
                onClick={() => handleContact('Voice call')}
              >
                <Phone size={18} />
                Contact by voice
              </button>

              <button
                className="btn btn-outline tutor-action-button"
                type="button"
                onClick={() => handleContact('Message')}
              >
                <MessageCircle size={18} />
                Send a message
              </button>

              <p className="tutor-booking-note">
                Contact and booking actions are currently frontend demos.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
}

export default TutorProfile;
