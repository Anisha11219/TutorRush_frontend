import { useState } from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  IndianRupee,
  UserCheck,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout.jsx';

const initialActivities = [
  {
    id: 1,
    name: 'Rahul Sharma',
    qualification: 'B.Tech Computer Science',
    date: '10 Oct 2026',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Priya Verma',
    qualification: 'M.Sc Mathematics',
    date: '09 Oct 2026',
    status: 'verified',
  },
  {
    id: 3,
    name: 'Aman Gupta',
    qualification: 'B.Sc Physics',
    date: '08 Oct 2026',
    status: 'pending',
  },
  {
    id: 4,
    name: 'Sneha Singh',
    qualification: 'MCA',
    date: '07 Oct 2026',
    status: 'rejected',
  },
];

const recentBookings = [
  {
    id: 'TR-1001',
    student: 'Ananya Mishra',
    tutor: 'Priya Verma',
    subject: 'Mathematics',
    status: 'Confirmed',
  },
  {
    id: 'TR-1002',
    student: 'Rohit Kumar',
    tutor: 'Rahul Sharma',
    subject: 'Computer Science',
    status: 'Pending',
  },
  {
    id: 'TR-1003',
    student: 'Meera Singh',
    tutor: 'Aman Gupta',
    subject: 'Physics',
    status: 'Completed',
  },
];

function AdminDashboard() {
  const [activities, setActivities] = useState(initialActivities);
  const [message, setMessage] = useState('');

  const pendingVerifications = activities.filter(
    (activity) => activity.status === 'pending'
  ).length;

  const verifiedTutors = activities.filter(
    (activity) => activity.status === 'verified'
  ).length;

  const handleVerification = (id, status) => {
    const tutor = activities.find((activity) => activity.id === id);

    if (!tutor || tutor.status !== 'pending') return;

    setActivities((previous) =>
      previous.map((activity) =>
        activity.id === id ? { ...activity, status } : activity
      )
    );

    setMessage(
      `${tutor.name} marked as ${
        status === 'verified' ? 'verified' : 'rejected'
      } in this demo.`
    );
  };

  const stats = [
    {
      title: 'Total Students',
      value: '248',
      description: 'Registered student accounts',
      icon: Users,
      className: 'students',
    },
    {
      title: 'Registered Tutors',
      value: '64',
      description: 'Tutor accounts on the platform',
      icon: GraduationCap,
      className: 'tutors',
    },
    {
      title: 'Total Bookings',
      value: '186',
      description: 'Learning sessions requested',
      icon: CalendarCheck,
      className: 'bookings',
    },
    {
      title: 'Platform Revenue',
      value: '₹24,500',
      description: 'Illustrative demo amount',
      icon: IndianRupee,
      className: 'revenue',
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="admin-dashboard-heading">
          <div>
            <span className="admin-eyebrow">ADMINISTRATION</span>
            <h1>Dashboard Overview</h1>
            <p>
              Monitor TutorRush activity and manage the learning
              platform from one place.
            </p>
          </div>

          <div className="admin-dashboard-date">
            <Activity size={17} />
            <span>Platform overview</span>
          </div>
        </div>

        <div className="admin-welcome-banner">
          <div className="admin-welcome-icon">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2>Welcome to TutorRush Admin</h2>
            <p>
              Review tutor credentials, monitor bookings, and help
              maintain a reliable learning community.
            </p>
          </div>

          <Link
            to="/admin/verification"
            className="admin-welcome-link"
          >
            Review Tutors
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="admin-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="admin-stat-card" key={stat.title}>
                <div className={`admin-stat-icon ${stat.className}`}>
                  <Icon size={23} />
                </div>

                <div className="admin-stat-content">
                  <span>{stat.title}</span>
                  <strong>{stat.value}</strong>
                  <small>{stat.description}</small>
                </div>

                <TrendingUp
                  className="admin-stat-trend"
                  size={17}
                />
              </div>
            );
          })}
        </div>

        <div className="admin-dashboard-grid">
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Tutor Verification Activity</h2>
                <p>Review submitted tutor credentials.</p>
              </div>

              <Link
                to="/admin/verification"
                className="admin-view-all"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="admin-verification-summary">
              <div>
                <Clock size={18} />
                <span>Pending</span>
                <strong>{pendingVerifications}</strong>
              </div>

              <div>
                <CheckCircle size={18} />
                <span>Verified</span>
                <strong>{verifiedTutors}</strong>
              </div>
            </div>

            <div className="admin-activity-list">
              {activities.map((activity) => (
                <div
                  className="admin-activity-item"
                  key={activity.id}
                >
                  <div className="admin-activity-avatar">
                    {activity.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </div>

                  <div className="admin-activity-info">
                    <strong>{activity.name}</strong>
                    <span>{activity.qualification}</span>
                    <small>{activity.date}</small>
                  </div>

                  <div className="admin-activity-actions">
                    {activity.status === 'pending' ? (
                      <>
                        <button
                          type="button"
                          className="admin-mini-approve"
                          title="Mark as verified"
                          aria-label={`Verify ${activity.name}`}
                          onClick={() =>
                            handleVerification(
                              activity.id,
                              'verified'
                            )
                          }
                        >
                          <CheckCircle size={17} />
                        </button>

                        <button
                          type="button"
                          className="admin-mini-reject"
                          title="Reject application"
                          aria-label={`Reject ${activity.name}`}
                          onClick={() =>
                            handleVerification(
                              activity.id,
                              'rejected'
                            )
                          }
                        >
                          <XCircle size={17} />
                        </button>
                      </>
                    ) : (
                      <span
                        className={`admin-activity-status ${activity.status}`}
                      >
                        {activity.status === 'verified' ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {activity.status === 'verified'
                          ? 'Verified'
                          : 'Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Recent Bookings</h2>
                <p>Sample platform booking activity.</p>
              </div>

              <span className="admin-live-indicator">
                <span />
                Demo data
              </span>
            </div>

            <div className="admin-booking-list">
              {recentBookings.map((booking) => (
                <div className="admin-booking-item" key={booking.id}>
                  <div className="admin-booking-icon">
                    <CalendarCheck size={19} />
                  </div>

                  <div className="admin-booking-info">
                    <strong>{booking.id}</strong>
                    <span>
                      {booking.student} → {booking.tutor}
                    </span>
                    <small>{booking.subject}</small>
                  </div>

                  <span
                    className={`admin-booking-status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="admin-booking-footer">
              <AlertCircle size={17} />
              <p>
                Booking records and totals will come from the backend
                after integration.
              </p>
            </div>
          </section>
        </div>

        <section className="admin-quick-actions">
          <div className="admin-panel-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Go directly to common administration tasks.</p>
            </div>
          </div>

          <div className="admin-quick-actions-grid">
            <Link
              to="/admin/verification"
              className="admin-quick-action"
            >
              <div className="admin-quick-action-icon">
                <UserCheck size={23} />
              </div>

              <div>
                <strong>Verify Tutors</strong>
                <span>Review qualifications and certificates</span>
              </div>

              <ArrowRight size={18} />
            </Link>

            <div className="admin-quick-action disabled">
              <div className="admin-quick-action-icon">
                <Users size={23} />
              </div>

              <div>
                <strong>Manage Users</strong>
                <span>Planned for a future version</span>
              </div>
            </div>

            <div className="admin-quick-action disabled">
              <div className="admin-quick-action-icon">
                <CalendarCheck size={23} />
              </div>

              <div>
                <strong>Manage Bookings</strong>
                <span>Planned for a future version</span>
              </div>
            </div>
          </div>
        </section>

        {message && (
          <div className="admin-dashboard-message" role="status">
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage('')}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        <div className="admin-demo-disclaimer">
          <AlertCircle size={18} />
          <p>
            <strong>Frontend demonstration:</strong> Statistics and
            booking records are illustrative sample data. Verification
            actions update the page state only and are not persisted to
            a server.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;