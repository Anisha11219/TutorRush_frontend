
import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  Star,
  BookOpen,
  XCircle,
  CheckCircle2,
  CalendarClock
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout.jsx';

const initialBookings = [
  {
    id: 1,
    tutorName: 'Priya Sharma',
    subject: 'Mathematics',
    topic: 'Calculus',
    date: '2026-10-15',
    time: '10:00 AM',
    duration: '1 hour',
    mode: 'Online',
    amount: 500,
    status: 'Upcoming'
  },
  {
    id: 2,
    tutorName: 'Rahul Verma',
    subject: 'Computer Science',
    topic: 'Data Structures',
    date: '2026-10-05',
    time: '04:00 PM',
    duration: '1 hour',
    mode: 'Online',
    amount: 600,
    status: 'Completed'
  },
  {
    id: 3,
    tutorName: 'Neha Singh',
    subject: 'Physics',
    topic: 'Mechanics',
    date: '2026-09-28',
    time: '11:00 AM',
    duration: '1.5 hours',
    mode: 'Offline',
    amount: 675,
    status: 'Cancelled'
  }
];

const filters = ['All', 'Upcoming', 'Completed', 'Cancelled'];

function BookingHistory() {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeFilter, setActiveFilter] = useState('All');
  const [notice, setNotice] = useState('');

  const filteredBookings =
    activeFilter === 'All'
      ? bookings
      : bookings.filter((booking) => booking.status === activeFilter);

  const upcomingCount = bookings.filter(
    (booking) => booking.status === 'Upcoming'
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === 'Completed'
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === 'Cancelled'
  ).length;

  const cancelBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'Cancelled' }
          : booking
      )
    );

    setNotice('Booking cancelled in this demo.');
  };

  const getStatusIcon = (status) => {
    if (status === 'Upcoming') {
      return <CalendarClock size={16} />;
    }

    if (status === 'Completed') {
      return <CheckCircle2 size={16} />;
    }

    return <XCircle size={16} />;
  };

  return (
    <StudentLayout>
      <div className="booking-history-page">
        <div className="booking-page-heading">
          <div>
            <h1>My Bookings</h1>
            <p>Manage your tutoring sessions and view your learning history.</p>
          </div>
        </div>

        {notice && (
          <div className="booking-notice" role="status">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}>
              Dismiss
            </button>
          </div>
        )}

        <div className="booking-summary-grid">
          <div className="booking-summary-card">
            <div className="booking-summary-icon upcoming-icon">
              <CalendarClock size={22} />
            </div>
            <div>
              <span>Upcoming</span>
              <strong>{upcomingCount}</strong>
            </div>
          </div>

          <div className="booking-summary-card">
            <div className="booking-summary-icon completed-icon">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>

          <div className="booking-summary-card">
            <div className="booking-summary-icon cancelled-icon">
              <XCircle size={22} />
            </div>
            <div>
              <span>Cancelled</span>
              <strong>{cancelledCount}</strong>
            </div>
          </div>
        </div>

        <div className="booking-filter-bar">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`booking-filter-button ${
                activeFilter === filter ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="booking-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <article className="card booking-card" key={booking.id}>
                <div className="booking-card-top">
                  <div className="booking-tutor-avatar">
                    {booking.tutorName.charAt(0)}
                  </div>

                  <div className="booking-tutor-info">
                    <h2>{booking.tutorName}</h2>
                    <p>{booking.subject}</p>
                    <span className="booking-topic">
                      <BookOpen size={14} />
                      Topic: {booking.topic}
                    </span>
                  </div>

                  <span
                    className={`booking-status booking-status-${booking.status.toLowerCase()}`}
                  >
                    {getStatusIcon(booking.status)}
                    {booking.status}
                  </span>
                </div>

                <div className="booking-details-grid">
                  <div className="booking-detail">
                    <CalendarDays size={17} />
                    <div>
                      <span>Date</span>
                      <strong>
                        {new Date(
                          `${booking.date}T00:00:00`
                        ).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="booking-detail">
                    <Clock size={17} />
                    <div>
                      <span>Time & duration</span>
                      <strong>
                        {booking.time} · {booking.duration}
                      </strong>
                    </div>
                  </div>

                  <div className="booking-detail">
                    {booking.mode === 'Online' ? (
                      <Video size={17} />
                    ) : (
                      <MapPin size={17} />
                    )}
                    <div>
                      <span>Session mode</span>
                      <strong>{booking.mode}</strong>
                    </div>
                  </div>

                  <div className="booking-detail">
                    <Star size={17} />
                    <div>
                      <span>Session fee</span>
                      <strong>₹{booking.amount}</strong>
                    </div>
                  </div>
                </div>

                <div className="booking-card-actions">
                  {booking.status === 'Upcoming' && (
                    <button
                      type="button"
                      className="btn btn-outline booking-cancel-button"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      <XCircle size={17} />
                      Cancel booking
                    </button>
                  )}

                  {booking.status === 'Completed' && (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() =>
                        setNotice(
                          'Review functionality will be connected during backend integration.'
                        )
                      }
                    >
                      <Star size={17} />
                      Write a review
                    </button>
                  )}

                  {booking.status === 'Cancelled' && (
                    <span className="booking-cancelled-note">
                      This session has been cancelled.
                    </span>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="card booking-empty-state">
              <CalendarDays size={42} />
              <h2>No bookings found</h2>
              <p>
                There are no {activeFilter.toLowerCase()} sessions to display.
              </p>
            </div>
          )}
        </div>

        <p className="booking-demo-note">
          Demo data only. Real bookings will be loaded from the backend after
          integration.
        </p>
      </div>
    </StudentLayout>
  );
}

export default BookingHistory;
