import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Save,
  Video,
  MapPin,
  CheckCircle
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

function Availability() {
  const [selectedDays, setSelectedDays] = useState([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ]);

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [teachingMode, setTeachingMode] = useState('Both');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [notice, setNotice] = useState('');

  const toggleDay = (day) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((item) => item !== day)
        : [...currentDays, day]
    );

    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedDays.length === 0) {
      setNotice('Please select at least one available day.');
      return;
    }

    if (startTime >= endTime) {
      setNotice('End time must be later than start time.');
      return;
    }

    setNotice(
      'Your availability has been saved in this demo. Backend integration is still required.'
    );
  };

  return (
    <TutorLayout>
      <div className="availability-page">
        <div className="availability-header">
          <span className="availability-eyebrow">
            <CalendarDays size={17} />
            SCHEDULE MANAGEMENT
          </span>

          <h1>My Availability</h1>

          <p>
            Set your teaching schedule so students can find a time
            that works for both of you.
          </p>
        </div>

        {notice && (
          <div className="availability-notice">
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

        <form onSubmit={handleSubmit}>
          <section className="availability-card">
            <div className="availability-section-heading">
              <div className="availability-heading-icon">
                <CalendarDays size={22} />
              </div>

              <div>
                <h2>Available Days</h2>
                <p>Select the days you can teach students.</p>
              </div>
            </div>

            <div className="availability-days-grid">
              {weekDays.map((day) => {
                const isSelected = selectedDays.includes(day);

                return (
                  <button
                    type="button"
                    key={day}
                    className={`availability-day ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => toggleDay(day)}
                    aria-pressed={isSelected}
                  >
                    <span className="availability-day-check">
                      {isSelected && <CheckCircle size={17} />}
                    </span>

                    <span>{day}</span>
                  </button>
                );
              })}
            </div>

            <p className="availability-helper">
              {selectedDays.length} of 7 days selected
            </p>
          </section>

          <section className="availability-card">
            <div className="availability-section-heading">
              <div className="availability-heading-icon">
                <Clock size={22} />
              </div>

              <div>
                <h2>Teaching Hours</h2>
                <p>Set your regular daily teaching time.</p>
              </div>
            </div>

            <div className="availability-time-grid">
              <div className="form-group">
                <label htmlFor="availability-start">
                  Start Time
                </label>

                <input
                  id="availability-start"
                  type="time"
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                    setNotice('');
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability-end">
                  End Time
                </label>

                <input
                  id="availability-end"
                  type="time"
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.target.value);
                    setNotice('');
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability-duration">
                  Preferred Session Duration
                </label>

                <select
                  id="availability-duration"
                  value={sessionDuration}
                  onChange={(event) =>
                    setSessionDuration(event.target.value)
                  }
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
            </div>

            <div className="availability-time-summary">
              <Clock size={18} />

              <p>
                Your regular teaching hours are{' '}
                <strong>{startTime}</strong> to{' '}
                <strong>{endTime}</strong>.
              </p>
            </div>
          </section>

          <section className="availability-card">
            <div className="availability-section-heading">
              <div className="availability-heading-icon">
                <Video size={22} />
              </div>

              <div>
                <h2>Teaching Mode</h2>
                <p>Choose how you prefer to conduct classes.</p>
              </div>
            </div>

            <div className="availability-mode-grid">
              <button
                type="button"
                className={`availability-mode-option ${
                  teachingMode === 'Online' ? 'selected' : ''
                }`}
                onClick={() => {
                  setTeachingMode('Online');
                  setNotice('');
                }}
                aria-pressed={teachingMode === 'Online'}
              >
                <div className="availability-mode-icon online">
                  <Video size={24} />
                </div>

                <div>
                  <h3>Online</h3>
                  <p>Teach through online sessions.</p>
                </div>

                <span className="availability-mode-radio" />
              </button>

              <button
                type="button"
                className={`availability-mode-option ${
                  teachingMode === 'Offline' ? 'selected' : ''
                }`}
                onClick={() => {
                  setTeachingMode('Offline');
                  setNotice('');
                }}
                aria-pressed={teachingMode === 'Offline'}
              >
                <div className="availability-mode-icon offline">
                  <MapPin size={24} />
                </div>

                <div>
                  <h3>Offline</h3>
                  <p>Teach students in person.</p>
                </div>

                <span className="availability-mode-radio" />
              </button>

              <button
                type="button"
                className={`availability-mode-option ${
                  teachingMode === 'Both' ? 'selected' : ''
                }`}
                onClick={() => {
                  setTeachingMode('Both');
                  setNotice('');
                }}
                aria-pressed={teachingMode === 'Both'}
              >
                <div className="availability-mode-icon both">
                  <CheckCircle size={24} />
                </div>

                <div>
                  <h3>Both Modes</h3>
                  <p>Offer online and offline classes.</p>
                </div>

                <span className="availability-mode-radio" />
              </button>
            </div>
          </section>

          <div className="availability-footer">
            <p>
              Your schedule can be updated whenever your availability
              changes.
            </p>

            <button
              type="submit"
              className="btn btn-primary availability-save-btn"
            >
              <Save size={18} />
              Save Availability
            </button>
          </div>
        </form>
      </div>
    </TutorLayout>
  );
}

export default Availability;