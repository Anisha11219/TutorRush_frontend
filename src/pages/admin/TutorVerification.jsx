import { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  GraduationCap,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout.jsx';

const initialTutors = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    qualification: 'B.Tech in Computer Science',
    subject: 'Mathematics, Physics',
    experience: '3 years',
    document: 'degree-certificate.pdf',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Priya Verma',
    email: 'priya@example.com',
    qualification: 'M.Sc in Mathematics',
    subject: 'Mathematics',
    experience: '5 years',
    document: 'masters-degree.pdf',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Aman Gupta',
    email: 'aman@example.com',
    qualification: 'B.Sc in Physics',
    subject: 'Physics, Chemistry',
    experience: '2 years',
    document: 'qualification.pdf',
    status: 'Verified',
  },
];

function TutorVerification() {
  const [tutors, setTutors] = useState(initialTutors);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [message, setMessage] = useState('');

  const updateStatus = (id, status) => {
    setTutors((previous) =>
      previous.map((tutor) =>
        tutor.id === id ? { ...tutor, status } : tutor
      )
    );

    if (selectedTutor?.id === id) {
      setSelectedTutor((previous) => ({
        ...previous,
        status,
      }));
    }

    setMessage(
      `Tutor ${status === 'Verified' ? 'approved' : 'rejected'} successfully in this demo.`
    );
  };

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = [
      tutor.name,
      tutor.email,
      tutor.qualification,
      tutor.subject,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || tutor.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pendingCount = tutors.filter(
    (tutor) => tutor.status === 'Pending'
  ).length;

  const verifiedCount = tutors.filter(
    (tutor) => tutor.status === 'Verified'
  ).length;

  const rejectedCount = tutors.filter(
    (tutor) => tutor.status === 'Rejected'
  ).length;

  return (
    <AdminLayout>
      <div className="verification-page">
        <div className="verification-header">
          <div>
            <span className="verification-eyebrow">
              ADMINISTRATION
            </span>
            <h1>Tutor Verification</h1>
            <p>
              Review tutor qualifications and manage verification
              requests.
            </p>
          </div>

          <div className="verification-header-icon">
            <ShieldCheck size={34} />
          </div>
        </div>

        {message && (
          <div className="verification-message" role="status">
            <CheckCircle size={18} />
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

        <div className="verification-stats">
          <div className="verification-stat-card">
            <div className="verification-stat-icon pending">
              <Clock size={22} />
            </div>
            <div>
              <span>Pending Review</span>
              <strong>{pendingCount}</strong>
            </div>
          </div>

          <div className="verification-stat-card">
            <div className="verification-stat-icon verified">
              <CheckCircle size={22} />
            </div>
            <div>
              <span>Verified Tutors</span>
              <strong>{verifiedCount}</strong>
            </div>
          </div>

          <div className="verification-stat-card">
            <div className="verification-stat-icon rejected">
              <XCircle size={22} />
            </div>
            <div>
              <span>Rejected</span>
              <strong>{rejectedCount}</strong>
            </div>
          </div>
        </div>

        <section className="verification-panel">
          <div className="verification-toolbar">
            <div>
              <h2>Verification Requests</h2>
              <p>Review the submitted tutor information.</p>
            </div>

            <div className="verification-search">
              <Search size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tutors..."
                aria-label="Search tutors"
              />
            </div>
          </div>

          <div className="verification-filters">
            {['All', 'Pending', 'Verified', 'Rejected'].map(
              (status) => (
                <button
                  type="button"
                  key={status}
                  className={
                    filter === status
                      ? 'verification-filter active'
                      : 'verification-filter'
                  }
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {filteredTutors.length === 0 ? (
            <div className="verification-empty">
              <GraduationCap size={42} />
              <h3>No tutors found</h3>
              <p>Try another search or verification filter.</p>
            </div>
          ) : (
            <div className="verification-table-wrapper">
              <table className="verification-table">
                <thead>
                  <tr>
                    <th>Tutor</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTutors.map((tutor) => (
                    <tr key={tutor.id}>
                      <td>
                        <div className="verification-tutor-cell">
                          <div className="verification-avatar">
                            {tutor.name.charAt(0)}
                          </div>
                          <div>
                            <strong>{tutor.name}</strong>
                            <span>{tutor.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="verification-qualification">
                          {tutor.qualification}
                        </span>
                        <span className="verification-subject">
                          {tutor.subject}
                        </span>
                      </td>

                      <td>{tutor.experience}</td>

                      <td>
                        <span
                          className={`verification-status verification-status-${tutor.status.toLowerCase()}`}
                        >
                          {tutor.status === 'Verified' ? (
                            <CheckCircle size={14} />
                          ) : tutor.status === 'Rejected' ? (
                            <XCircle size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {tutor.status}
                        </span>
                      </td>

                      <td>
                        <div className="verification-actions">
                          <button
                            type="button"
                            className="verification-view-btn"
                            onClick={() => setSelectedTutor(tutor)}
                            title="View details"
                            aria-label={`View ${tutor.name}`}
                          >
                            <Eye size={17} />
                          </button>

                          {tutor.status !== 'Verified' && (
                            <button
                              type="button"
                              className="verification-approve-btn"
                              onClick={() =>
                                updateStatus(tutor.id, 'Verified')
                              }
                              title="Approve tutor"
                              aria-label={`Approve ${tutor.name}`}
                            >
                              <CheckCircle size={17} />
                            </button>
                          )}

                          {tutor.status !== 'Rejected' && (
                            <button
                              type="button"
                              className="verification-reject-btn"
                              onClick={() =>
                                updateStatus(tutor.id, 'Rejected')
                              }
                              title="Reject tutor"
                              aria-label={`Reject ${tutor.name}`}
                            >
                              <XCircle size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="verification-demo-note">
            This page uses sample data. Approval and rejection are
            temporary frontend changes until connected to the backend.
          </div>
        </section>

        {selectedTutor && (
          <div
            className="verification-modal-overlay"
            onClick={() => setSelectedTutor(null)}
          >
            <section
              className="verification-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="verification-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="verification-modal-header">
                <div>
                  <h2 id="verification-modal-title">
                    Tutor Details
                  </h2>
                  <p>Review the submitted information.</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTutor(null)}
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>

              <div className="verification-detail-avatar">
                {selectedTutor.name.charAt(0)}
              </div>

              <h3 className="verification-detail-name">
                {selectedTutor.name}
              </h3>

              <div className="verification-detail-list">
                <div>
                  <span>Email</span>
                  <strong>{selectedTutor.email}</strong>
                </div>

                <div>
                  <span>Qualification</span>
                  <strong>{selectedTutor.qualification}</strong>
                </div>

                <div>
                  <span>Subjects</span>
                  <strong>{selectedTutor.subject}</strong>
                </div>

                <div>
                  <span>Experience</span>
                  <strong>{selectedTutor.experience}</strong>
                </div>

                <div>
                  <span>Certificate filename</span>
                  <strong>{selectedTutor.document}</strong>
                </div>

                <div>
                  <span>Verification status</span>
                  <strong>{selectedTutor.status}</strong>
                </div>
              </div>

              <p className="verification-document-note">
                The filename is sample data; the actual certificate
                file is not available on this demo page.
              </p>

              <div className="verification-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedTutor(null)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    updateStatus(selectedTutor.id, 'Verified');
                    setSelectedTutor(null);
                  }}
                >
                  <CheckCircle size={17} />
                  Approve Tutor
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default TutorVerification;