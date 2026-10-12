
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  Clock,
  IndianRupee,
  Star,
  Users,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Video,
  MapPin,
  GraduationCap
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

const initialRequests = [
  {
    id: 1,
    studentName: 'Aarav Singh',
    subject: 'Mathematics',
    topic: 'Calculus',
    date: '2026-10-15',
    time: '10:00 AM',
    mode: 'Online',
    duration: '1 hour',
    status: 'Pending'
  },
  {
    id: 2,
    studentName: 'Meera Gupta',
    subject: 'Mathematics',
    topic: 'Algebra',
    date: '2026-10-16',
    time: '04:00 PM',
    mode: 'Offline',
    duration: '1 hour',
    status: 'Pending'
  },
  {
    id: 3,
    studentName: 'Rohan Verma',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    date: '2026-10-12',
    time: '11:00 AM',
    mode: 'Online',
    duration: '1.5 hours',
    status: 'Accepted'
  }
];

const upcomingSessions = [
  {
    id: 1,
    studentName: 'Rohan Verma',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    date: '2026-10-12',
    time: '11:00 AM',
    mode: 'Online'
  },
  {
    id: 2,
    studentName: 'Aarav Singh',
    subject: 'Mathematics',
    topic: 'Calculus',
    date: '2026-10-15',
    time: '10:00 AM',
    mode: 'Online'
  }
];

function TutorDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [notice, setNotice] = useState('');

  const pendingCount = requests.filter(
    (request) => request.status === 'Pending'
  ).length;

  const acceptRequest = (requestId) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, status: 'Accepted' }
          : request
      )
    );

    setNotice('Booking request accepted in this demo.');
  };

  const rejectRequest = (requestId) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, status: 'Rejected' }
          : request
      )
    );

    setNotice('Booking request rejected in this demo.');
  };

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

  return (
    <TutorLayout>
      <div className="tutor-dashboard-page">
        <div className="tutor-dashboard-heading">
          <div>
            <span className="tutor-dashboard-eyebrow">
              TUTOR WORKSPACE
            </span>
            <h1>Welcome back, Tutor!</h1>
            <p>Manage your teaching sessions and student requests.</p>
          </div>

          <Link
            to="/tutor/availability"
            className="btn btn-primary tutor-dashboard-primary-action"
          >
            <CalendarDays size={18} />
            Manage availability
          </Link>
        </div>

        {notice && (
          <div className="tutor-dashboard-notice" role="status">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}>
              Dismiss
            </button>
          </div>
        )}

        <section className="tutor-dashboard-stats">
          <div className="card tutor-stat-card">
            <div className="tutor-stat-icon tutor-stat-purple">
              <CalendarDays size={23} />
            </div>
            <div>
              <span>Total sessions</span>
              <strong>48</strong>
              <small>Sample statistics</small>
            </div>
          </div>

          <div className="card tutor-stat-card">
            <div className="tutor-stat-icon tutor-stat-green">
              <Users size={23} />
            </div>
            <div>
              <span>Students taught</span>
              <strong>32</strong>
              <small>Sample statistics</small>
            </div>
          </div>

          <div className="card tutor-stat-card">
            <div className="tutor-stat-icon tutor-stat-orange">
              <IndianRupee size={23} />
            </div>
            <div>
              <span>Total earnings</span>
              <strong>₹24,500</strong>
              <small>Sample statistics</small>
            </div>
          </div>

          <div className="card tutor-stat-card">
            <div className="tutor-stat-icon tutor-stat-blue">
              <Star size={23} />
            </div>
            <div>
              <span>Average rating</span>
              <strong>4.8 / 5</strong>
              <small>From student feedback</small>
            </div>
          </div>
        </section>

        <section className="tutor-dashboard-main-grid">
          <div className="card tutor-dashboard-section">
            <div className="tutor-dashboard-section-heading">
              <div>
                <h2>Booking requests</h2>
                <p>Review requests from students.</p>
              </div>

              <span className="tutor-pending-count">
                {pendingCount} pending
              </span>
            </div>

            <div className="tutor-request-list">
              {requests.map((request) => (
                <article className="tutor-request-card" key={request.id}>
                  <div className="tutor-request-avatar">
                    {request.studentName.charAt(0)}
                  </div>

                  <div className="tutor-request-content">
                    <div className="tutor-request-title">
                      <h3>{request.studentName}</h3>
                      <span
                        className={`tutor-request-status tutor-request-status-${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <p>
                      {request.subject} · {request.topic}
                    </p>

                    <div className="tutor-request-meta">
                      <span>
                        <CalendarDays size={14} />
                        {formatDate(request.date)}
                      </span>
                      <span>
                        <Clock size={14} />
                        {request.time}
                      </span>
                      <span>
                        {request.mode === 'Online' ? (
                          <Video size={14} />
                        ) : (
                          <MapPin size={14} />
                        )}
                        {request.mode}
                      </span>
                    </div>

                    {request.status === 'Pending' && (
                      <div className="tutor-request-actions">
                        <button
                          type="button"
                          className="tutor-accept-button"
                          onClick={() => acceptRequest(request.id)}
                        >
                          <CheckCircle2 size={16} />
                          Accept
                        </button>

                        <button
                          type="button"
                          className="tutor-reject-button"
                          onClick={() => rejectRequest(request.id)}
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}

              {requests.length === 0 && (
                <div className="tutor-dashboard-empty">
                  No booking requests available.
                </div>
              )}
            </div>

            <Link
              to="/tutor/bookings"
              className="tutor-dashboard-view-all"
            >
              View all requests <ArrowRight size={16} />
            </Link>
          </div>

          <div className="tutor-dashboard-right-column">
            <div className="card tutor-dashboard-section">
              <div className="tutor-dashboard-section-heading">
                <div>
                  <h2>Upcoming sessions</h2>
                  <p>Your scheduled classes.</p>
                </div>
              </div>

              <div className="tutor-upcoming-list">
                {upcomingSessions.map((session) => (
                  <article
                    className="tutor-upcoming-session"
                    key={session.id}
                  >
                    <div className="tutor-session-date-icon">
                      <CalendarDays size={20} />
                    </div>

                    <div className="tutor-session-content">
                      <h3>{session.studentName}</h3>
                      <p>{session.topic}</p>
                      <span>
                        {formatDate(session.date)} · {session.time}
                      </span>
                      <small>
                        {session.mode === 'Online' ? (
                          <Video size={13} />
                        ) : (
                          <MapPin size={13} />
                        )}
                        {session.mode}
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="card tutor-profile-completion">
              <div className="tutor-profile-completion-icon">
                <GraduationCap size={25} />
              </div>
              <h2>Complete your profile</h2>
              <p>
                Add your qualifications, teaching subjects, and availability
                to help students find you.
              </p>

              <div className="tutor-profile-progress">
                <div className="tutor-profile-progress-track">
                  <div className="tutor-profile-progress-fill" />
                </div>
                <span>60% complete</span>
              </div>

              <Link
                to="/tutor/profile"
                className="btn btn-outline tutor-complete-profile-button"
              >
                Complete profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <div className="tutor-dashboard-footer-note">
          <BookOpen size={16} />
          Dashboard statistics and booking requests are sample data until
          backend integration.
        </div>
      </div>
    </TutorLayout>
  );
}

export default TutorDashboard;
