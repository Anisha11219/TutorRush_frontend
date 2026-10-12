import { Link } from 'react-router-dom';
import {
  Search,
  CalendarDays,
  BookOpen,
  UserRound,
  Clock,
  MapPin,
  Video,
  ArrowRight,
  Star,
  CheckCircle,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';

import StudentLayout from '../../layouts/StudentLayout.jsx';

const stats = [
  {
    title: 'Upcoming Sessions',
    value: '02',
    icon: CalendarDays,
    color: 'purple',
  },
  {
    title: 'Tutors Contacted',
    value: '08',
    icon: MessageCircle,
    color: 'orange',
  },
  {
    title: 'Completed Sessions',
    value: '12',
    icon: CheckCircle,
    color: 'green',
  },
];

const recommendedTutors = [
  {
    id: 1,
    name: 'Rahul Sharma',
    subject: 'Mathematics',
    qualification: 'B.Tech in Computer Science',
    rating: '4.9',
    price: '₹300',
    mode: 'Online & Offline',
    initials: 'RS',
    color: 'purple',
  },
  {
    id: 2,
    name: 'Priya Verma',
    subject: 'Physics',
    qualification: 'M.Sc. in Physics',
    rating: '4.8',
    price: '₹350',
    mode: 'Online',
    initials: 'PV',
    color: 'orange',
  },
  {
    id: 3,
    name: 'Aman Singh',
    subject: 'Programming',
    qualification: 'B.Tech in Information Technology',
    rating: '4.7',
    price: '₹400',
    mode: 'Online & Offline',
    initials: 'AS',
    color: 'green',
  },
];

const upcomingSessions = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Differential Equations',
    tutor: 'Rahul Sharma',
    date: 'Tomorrow',
    time: '10:00 AM - 11:00 AM',
    mode: 'Online',
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Laws of Motion',
    tutor: 'Priya Verma',
    date: '13 October',
    time: '04:00 PM - 05:00 PM',
    mode: 'Online',
  },
];

function StudentDashboard() {
  return (
    <StudentLayout>
      <div className="student-dashboard">
        <section className="student-dashboard-welcome">
          <div className="student-dashboard-welcome-content">
            <span className="student-dashboard-eyebrow">
              STUDENT DASHBOARD
            </span>

            <h1>Welcome back, Student! 👋</h1>

            <p>
              Ready to learn something new today? Find the right tutor
              and get help with the topics that matter to you.
            </p>

            <Link
              to="/student/tutors"
              className="btn btn-primary student-dashboard-main-button"
            >
              <Search size={18} />
              Find a Tutor
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="student-dashboard-welcome-icon">
            <GraduationCap size={90} strokeWidth={1.4} />
          </div>
        </section>

        <section className="student-dashboard-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="student-dashboard-stat-card" key={stat.title}>
                <div
                  className={`student-dashboard-stat-icon ${stat.color}`}
                >
                  <Icon size={23} />
                </div>

                <div>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                </div>
              </div>
            );
          })}
        </section>

        <section className="student-dashboard-quick-actions">
          <div className="student-dashboard-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Everything you need to continue learning.</p>
            </div>
          </div>

          <div className="student-dashboard-action-grid">
            <Link
              to="/student/tutors"
              className="student-dashboard-action-card"
            >
              <div className="student-dashboard-action-icon purple">
                <Search size={24} />
              </div>
              <div>
                <h3>Find Tutors</h3>
                <p>Search by subject and topic.</p>
              </div>
              <ArrowRight size={19} className="student-dashboard-action-arrow" />
            </Link>

            <Link
              to="/student/bookings"
              className="student-dashboard-action-card"
            >
              <div className="student-dashboard-action-icon orange">
                <CalendarDays size={24} />
              </div>
              <div>
                <h3>My Bookings</h3>
                <p>View your learning sessions.</p>
              </div>
              <ArrowRight size={19} className="student-dashboard-action-arrow" />
            </Link>

            <Link
              to="/student/profile"
              className="student-dashboard-action-card"
            >
              <div className="student-dashboard-action-icon green">
                <UserRound size={24} />
              </div>
              <div>
                <h3>My Profile</h3>
                <p>Manage your personal details.</p>
              </div>
              <ArrowRight size={19} className="student-dashboard-action-arrow" />
            </Link>
          </div>
        </section>

        <section className="student-dashboard-main-grid">
          <div className="student-dashboard-panel">
            <div className="student-dashboard-section-heading">
              <div>
                <h2>Recommended Tutors</h2>
                <p>Explore tutors who can help you learn.</p>
              </div>

              <Link
                to="/student/tutors"
                className="student-dashboard-view-all"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="student-dashboard-tutor-list">
              {recommendedTutors.map((tutor) => (
                <article
                  className="student-dashboard-tutor-card"
                  key={tutor.id}
                >
                  <div
                    className={`student-dashboard-tutor-avatar ${tutor.color}`}
                  >
                    {tutor.initials}
                  </div>

                  <div className="student-dashboard-tutor-info">
                    <h3>{tutor.name}</h3>
                    <p className="student-dashboard-tutor-subject">
                      {tutor.subject}
                    </p>
                    <p className="student-dashboard-tutor-qualification">
                      {tutor.qualification}
                    </p>

                    <div className="student-dashboard-tutor-meta">
                      <span>
                        <Star size={14} fill="currentColor" />
                        {tutor.rating}
                      </span>

                      <span>
                        <MapPin size={14} />
                        {tutor.mode}
                      </span>
                    </div>
                  </div>

                  <div className="student-dashboard-tutor-price">
                    <strong>{tutor.price}</strong>
                    <span>/ hour</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="student-dashboard-panel">
            <div className="student-dashboard-section-heading">
              <div>
                <h2>Upcoming Sessions</h2>
                <p>Your next learning sessions.</p>
              </div>

              <Link
                to="/student/bookings"
                className="student-dashboard-view-all"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="student-dashboard-session-list">
              {upcomingSessions.map((session) => (
                <article
                  className="student-dashboard-session-card"
                  key={session.id}
                >
                  <div className="student-dashboard-session-date">
                    <CalendarDays size={21} />
                  </div>

                  <div className="student-dashboard-session-info">
                    <span className="student-dashboard-session-subject">
                      {session.subject}
                    </span>

                    <h3>{session.topic}</h3>
                    <p>With {session.tutor}</p>

                    <div className="student-dashboard-session-meta">
                      <span>
                        <Clock size={14} />
                        {session.date}
                      </span>

                      <span>
                        {session.mode === 'Online' ? (
                          <Video size={14} />
                        ) : (
                          <MapPin size={14} />
                        )}
                        {session.mode}
                      </span>
                    </div>

                    <small>{session.time}</small>
                  </div>
                </article>
              ))}
            </div>

            <div className="student-dashboard-learning-note">
              <BookOpen size={19} />
              <p>
                <strong>Keep learning!</strong>
                <span>
                  Consistent practice helps you understand difficult topics.
                </span>
              </p>
            </div>
          </div>
        </section>

        <p className="student-dashboard-demo-note">
          <span>Demo preview:</span> The dashboard currently displays sample
          tutors, session details, and statistics. Real information will be
          loaded after backend API integration.
        </p>
      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;