import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Video,
  CheckCircle,
  XCircle,
  UserRound,
  IndianRupee,
  BookOpen
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

const initialRequests = [
  {
    id: 1,
    student: 'Aarav Sharma',
    initials: 'AS',
    subject: 'Computer Science',
    topic: 'Data Structures and Algorithms',
    difficulty: 'Hard',
    mode: 'Online',
    date: '2026-10-12',
    time: '10:00',
    duration: 60,
    amount: 600,
    location: '',
    status: 'Pending',
    message:
      'I need help understanding trees, graphs, and common interview problems.'
  },
  {
    id: 2,
    student: 'Priya Verma',
    initials: 'PV',
    subject: 'Mathematics',
    topic: 'Differential Equations',
    difficulty: 'Medium',
    mode: 'Offline',
    date: '2026-10-13',
    time: '15:00',
    duration: 90,
    amount: 750,
    location: 'Gomti Nagar, Lucknow',
    status: 'Pending',
    message:
      'I would like to revise the important concepts and solve practice questions.'
  },
  {
    id: 3,
    student: 'Rohan Gupta',
    initials: 'RG',
    subject: 'Programming',
    topic: 'Java OOP Concepts',
    difficulty: 'Easy',
    mode: 'Online',
    date: '2026-10-14',
    time: '11:30',
    duration: 60,
    amount: 400,
    location: '',
    status: 'Accepted',
    message:
      'I want to strengthen my understanding of inheritance and polymorphism.'
  },
  {
    id: 4,
    student: 'Sneha Singh',
    initials: 'SS',
    subject: 'Web Development',
    topic: 'React Hooks',
    difficulty: 'Medium',
    mode: 'Online',
    date: '2026-10-15',
    time: '16:00',
    duration: 60,
    amount: 500,
    location: '',
    status: 'Rejected',
    message:
      'I need an introduction to useState, useEffect, and component state.'
  }
];

function BookingRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notice, setNotice] = useState('');

  const filters = [
    'All',
    'Pending',
    'Accepted',
    'Rejected'
  ];

  const counts = {
    All: requests.length,
    Pending: requests.filter(
      (request) => request.status === 'Pending'
    ).length,
    Accepted: requests.filter(
      (request) => request.status === 'Accepted'
    ).length,
    Rejected: requests.filter(
      (request) => request.status === 'Rejected'
    ).length
  };

  const filteredRequests = requests.filter(
    (request) =>
      activeFilter === 'All' || request.status === activeFilter
  );

  const updateStatus = (id, status) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setSelectedRequest((currentRequest) =>
      currentRequest?.id === id
        ? { ...currentRequest, status }
        : currentRequest
    );

    setNotice(
      `Booking ${status.toLowerCase()} successfully in this demo.`
    );
  };

  const formatDate = (dateString) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    );
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusClass = (status) => {
    if (status === 'Accepted') return 'booking-request-accepted';
    if (status === 'Rejected') return 'booking-request-rejected';
    return 'booking-request-pending';
  };

  return (
    <TutorLayout>
      <div className="booking-requests-page">
        <div className="booking-requests-header">
          <span className="booking-requests-eyebrow">
            <CalendarDays size={17} />
            SESSION MANAGEMENT
          </span>

          <h1>Booking Requests</h1>

          <p>
            Review student requests and manage your upcoming
            teaching sessions.
          </p>
        </div>

        {notice && (
          <div className="booking-requests-notice">
            <CheckCircle size={19} />
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}

        <div className="booking-requests-stats">
          <div className="booking-request-stat">
            <span className="booking-request-stat-icon pending">
              <Clock size={21} />
            </span>

            <div>
              <p>Pending Requests</p>
              <h2>{counts.Pending}</h2>
            </div>
          </div>

          <div className="booking-request-stat">
            <span className="booking-request-stat-icon accepted">
              <CheckCircle size={21} />
            </span>

            <div>
              <p>Accepted Bookings</p>
              <h2>{counts.Accepted}</h2>
            </div>
          </div>

          <div className="booking-request-stat">
            <span className="booking-request-stat-icon total">
              <BookOpen size={21} />
            </span>

            <div>
              <p>Total Requests</p>
              <h2>{counts.All}</h2>
            </div>
          </div>
        </div>

        <section className="booking-requests-panel">
          <div className="booking-requests-panel-header">
            <div>
              <h2>Student Requests</h2>
              <p>Check the details before responding.</p>
            </div>

            <span className="booking-requests-total">
              {filteredRequests.length} requests
            </span>
          </div>

          <div className="booking-requests-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter ? 'active' : ''
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                <span>{counts[filter]}</span>
              </button>
            ))}
          </div>

          <div className="booking-requests-list">
            {filteredRequests.map((request) => (
              <article
                className="booking-request-card"
                key={request.id}
              >
                <div className="booking-request-card-top">
                  <div className="booking-request-student">
                    <div className="booking-request-avatar">
                      {request.initials}
                    </div>

                    <div>
                      <h3>{request.student}</h3>
                      <p>{request.subject}</p>
                    </div>
                  </div>

                  <span
                    className={`booking-request-status ${getStatusClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="booking-request-topic">
                  <span>Requested topic</span>
                  <h4>{request.topic}</h4>

                  <span
                    className={`booking-request-difficulty ${request.difficulty.toLowerCase()}`}
                  >
                    {request.difficulty} difficulty
                  </span>
                </div>

                <div className="booking-request-details">
                  <div>
                    <CalendarDays size={17} />
                    <span>{formatDate(request.date)}</span>
                  </div>

                  <div>
                    <Clock size={17} />
                    <span>{formatTime(request.time)}</span>
                  </div>

                  <div>
                    {request.mode === 'Online' ? (
                      <Video size={17} />
                    ) : (
                      <MapPin size={17} />
                    )}
                    <span>{request.mode}</span>
                  </div>

                  <div>
                    <Clock size={17} />
                    <span>{request.duration} minutes</span>
                  </div>
                </div>

                {request.location && (
                  <div className="booking-request-location">
                    <MapPin size={16} />
                    <span>{request.location}</span>
                  </div>
                )}

                <div className="booking-request-card-footer">
                  <div className="booking-request-price">
                    <span>Session fee</span>
                    <strong>
                      <IndianRupee size={17} />
                      {request.amount.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  <div className="booking-request-actions">
                    <button
                      type="button"
                      className="booking-request-details-btn"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View Details
                    </button>

                    {request.status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          className="booking-request-accept-btn"
                          onClick={() =>
                            updateStatus(request.id, 'Accepted')
                          }
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>

                        <button
                          type="button"
                          className="booking-request-decline-btn"
                          onClick={() =>
                            updateStatus(request.id, 'Rejected')
                          }
                        >
                          <XCircle size={16} />
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filteredRequests.length === 0 && (
              <div className="booking-requests-empty">
                <UserRound size={38} />
                <h3>No requests found</h3>
                <p>
                  There are no {activeFilter.toLowerCase()} booking
                  requests to display.
                </p>
              </div>
            )}
          </div>
        </section>

        {selectedRequest && (
          <div
            className="booking-request-modal-overlay"
            onClick={() => setSelectedRequest(null)}
          >
            <section
              className="booking-request-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-request-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="booking-request-modal-header">
                <div>
                  <span className="booking-requests-eyebrow">
                    BOOKING DETAILS
                  </span>

                  <h2 id="booking-request-modal-title">
                    {selectedRequest.student}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  aria-label="Close booking details"
                >
                  ×
                </button>
              </div>

              <div className="booking-request-modal-body">
                <div className="booking-request-detail-row">
                  <span>Subject</span>
                  <strong>{selectedRequest.subject}</strong>
                </div>

                <div className="booking-request-detail-row">
                  <span>Topic</span>
                  <strong>{selectedRequest.topic}</strong>
                </div>

                <div className="booking-request-detail-row">
                  <span>Difficulty</span>
                  <strong>{selectedRequest.difficulty}</strong>
                </div>

                <div className="booking-request-detail-row">
                  <span>Date and time</span>
                  <strong>
                    {formatDate(selectedRequest.date)} at{' '}
                    {formatTime(selectedRequest.time)}
                  </strong>
                </div>

                <div className="booking-request-detail-row">
                  <span>Teaching mode</span>
                  <strong>{selectedRequest.mode}</strong>
                </div>

                <div className="booking-request-detail-row">
                  <span>Duration</span>
                  <strong>
                    {selectedRequest.duration} minutes
                  </strong>
                </div>

                {selectedRequest.location && (
                  <div className="booking-request-detail-row">
                    <span>Location</span>
                    <strong>{selectedRequest.location}</strong>
                  </div>
                )}

                <div className="booking-request-detail-row">
                  <span>Estimated session fee</span>
                  <strong>
                    ₹
                    {selectedRequest.amount.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="booking-request-message">
                  <span>Student's message</span>
                  <p>{selectedRequest.message}</p>
                </div>
              </div>

              <div className="booking-request-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>

                {selectedRequest.status === 'Pending' && (
                  <>
                    <button
                      type="button"
                      className="booking-request-decline-btn"
                      onClick={() =>
                        updateStatus(
                          selectedRequest.id,
                          'Rejected'
                        )
                      }
                    >
                      <XCircle size={17} />
                      Decline
                    </button>

                    <button
                      type="button"
                      className="booking-request-accept-btn"
                      onClick={() =>
                        updateStatus(
                          selectedRequest.id,
                          'Accepted'
                        )
                      }
                    >
                      <CheckCircle size={17} />
                      Accept Request
                    </button>
                  </>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </TutorLayout>
  );
}

export default BookingRequests;