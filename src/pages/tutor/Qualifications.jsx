import { useState } from 'react';
import {
  GraduationCap,
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

function Qualifications() {
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      degree: 'Bachelor of Technology',
      institution: 'Example University',
      year: '2025',
      certificate: 'degree-certificate.pdf',
      status: 'Pending',
    },
  ]);

  const [form, setForm] = useState({
    degree: '',
    institution: '',
    year: '',
    certificate: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));

    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.degree.trim() || !form.institution.trim() || !form.year) {
      setMessage('Please complete all required fields.');
      return;
    }

    const newQualification = {
      id: Date.now(),
      degree: form.degree.trim(),
      institution: form.institution.trim(),
      year: form.year,
      certificate: form.certificate
        ? form.certificate.name
        : 'No certificate uploaded',
      status: 'Pending',
    };

    setQualifications((previous) => [
      ...previous,
      newQualification,
    ]);

    setForm({
      degree: '',
      institution: '',
      year: '',
      certificate: null,
    });

    e.target.reset();
    setMessage(
      'Qualification added successfully. Verification is a frontend demo.'
    );
  };

  const handleDelete = (id) => {
    setQualifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
    setMessage('Qualification removed.');
  };

  const getStatusIcon = (status) => {
    if (status === 'Verified') {
      return <CheckCircle size={17} />;
    }

    if (status === 'Rejected') {
      return <AlertCircle size={17} />;
    }

    return <Clock size={17} />;
  };

  return (
    <TutorLayout>
      <div className="qualification-page">
        <div className="qualification-header">
          <div>
            <span className="qualification-eyebrow">
              TUTOR CREDENTIALS
            </span>
            <h1>Qualifications & Certificates</h1>
            <p>
              Add your educational background and certificates to
              build trust with students.
            </p>
          </div>

          <div className="qualification-header-icon">
            <GraduationCap size={36} />
          </div>
        </div>

        <div className="qualification-info">
          <AlertCircle size={20} />
          <div>
            <strong>Verification information</strong>
            <p>
              Submit accurate qualification details. The TutorRush
              administration team can verify them after backend
              integration is completed.
            </p>
          </div>
        </div>

        <div className="qualification-grid">
          <section className="qualification-form-card">
            <div className="qualification-card-heading">
              <div className="qualification-heading-icon">
                <Plus size={20} />
              </div>

              <div>
                <h2>Add Qualification</h2>
                <p>Enter your educational details below.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="qualification-degree">
                  Degree / Qualification *
                </label>
                <input
                  id="qualification-degree"
                  type="text"
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech, B.Sc, Class 12"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="qualification-institution">
                  Institution / Board *
                </label>
                <input
                  id="qualification-institution"
                  type="text"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  placeholder="Enter school, college, or board"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="qualification-year">
                  Passing Year *
                </label>
                <select
                  id="qualification-year"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select passing year</option>
                  {Array.from(
                    { length: 30 },
                    (_, index) => new Date().getFullYear() - index
                  ).map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="qualification-certificate">
                  Certificate / Marksheet
                </label>

                <label
                  className="qualification-upload-box"
                  htmlFor="qualification-certificate"
                >
                  <Upload size={24} />
                  <strong>
                    {form.certificate
                      ? form.certificate.name
                      : 'Choose a certificate'}
                  </strong>
                  <span>
                    PDF, JPG, or PNG — optional for this demo
                  </span>
                </label>

                <input
                  id="qualification-certificate"
                  className="qualification-file-input"
                  type="file"
                  name="certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                />
              </div>

              {message && (
                <div className="qualification-message" role="status">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary qualification-submit"
              >
                <Plus size={18} />
                Add Qualification
              </button>
            </form>
          </section>

          <section className="qualification-list-card">
            <div className="qualification-card-heading">
              <div className="qualification-heading-icon">
                <FileText size={20} />
              </div>

              <div>
                <h2>My Qualifications</h2>
                <p>
                  {qualifications.length}{' '}
                  {qualifications.length === 1
                    ? 'qualification added'
                    : 'qualifications added'}
                </p>
              </div>
            </div>

            {qualifications.length === 0 ? (
              <div className="qualification-empty">
                <GraduationCap size={42} />
                <h3>No qualifications added</h3>
                <p>
                  Add your degree, school qualification, or certificate
                  to get started.
                </p>
              </div>
            ) : (
              <div className="qualification-list">
                {qualifications.map((item) => (
                  <article
                    className="qualification-item"
                    key={item.id}
                  >
                    <div className="qualification-item-top">
                      <div className="qualification-document-icon">
                        <FileText size={23} />
                      </div>

                      <button
                        type="button"
                        className="qualification-delete"
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Remove ${item.degree}`}
                        title="Remove qualification"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <h3>{item.degree}</h3>
                    <p className="qualification-institution">
                      {item.institution}
                    </p>

                    <p className="qualification-year">
                      Passing year: {item.year}
                    </p>

                    <div className="qualification-certificate-name">
                      <FileText size={15} />
                      <span>{item.certificate}</span>
                    </div>

                    <div
                      className={`qualification-status qualification-status-${item.status.toLowerCase()}`}
                    >
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="qualification-footer-note">
              <AlertCircle size={17} />
              <span>
                Verification statuses shown here are demo data and
                are not official approvals.
              </span>
            </div>
          </section>
        </div>
      </div>
    </TutorLayout>
  );
}

export default Qualifications;