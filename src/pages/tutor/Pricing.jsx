import { useState } from 'react';
import {
  IndianRupee,
  Video,
  MapPin,
  Clock,
  Save,
  CheckCircle,
  Info
} from 'lucide-react';
import TutorLayout from '../../layouts/TutorLayout.jsx';

function Pricing() {
  const [pricing, setPricing] = useState({
    online: '400',
    offline: '500',
    easy: '300',
    medium: '400',
    hard: '600',
    groupDiscount: '10'
  });

  const [notice, setNotice] = useState('');

  const updatePrice = (field, value) => {
    setPricing((current) => ({
      ...current,
      [field]: value
    }));

    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const numericFields = Object.values(pricing).map(Number);

    if (
      numericFields.some(
        (value) => !Number.isFinite(value) || value < 0
      )
    ) {
      setNotice('Please enter valid non-negative amounts.');
      return;
    }

    if (
      numericFields.some(
        (value) => !Number.isInteger(value)
      )
    ) {
      setNotice('Please enter whole numbers for all prices.');
      return;
    }

    if (Number(pricing.online) === 0 || Number(pricing.offline) === 0) {
      setNotice('Online and offline rates must be greater than zero.');
      return;
    }

    if (Number(pricing.groupDiscount) > 100) {
      setNotice('Group discount cannot exceed 100%.');
      return;
    }

    setNotice(
      'Your pricing has been saved in this demo. Backend integration is still required.'
    );
  };

  const formatPrice = (value) =>
    `₹${Number(value || 0).toLocaleString('en-IN')}`;

  return (
    <TutorLayout>
      <div className="pricing-page">
        <div className="pricing-header">
          <span className="pricing-eyebrow">
            <IndianRupee size={17} />
            EARNINGS SETTINGS
          </span>

          <h1>My Pricing</h1>

          <p>
            Set your teaching rates based on the learning mode and
            topic difficulty.
          </p>
        </div>

        {notice && (
          <div className="pricing-notice">
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

        <div className="pricing-info">
          <Info size={21} />

          <p>
            <strong>Pricing tip:</strong> Keep your rates competitive
            and make sure they reflect your expertise, preparation
            time, and the complexity of each topic.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="pricing-section">
            <div className="pricing-section-heading">
              <div>
                <h2>Teaching Mode Rates</h2>
                <p>Set your standard price per hour.</p>
              </div>
            </div>

            <div className="pricing-mode-grid">
              <div className="pricing-mode-card">
                <div className="pricing-mode-title">
                  <div className="pricing-mode-icon pricing-online-icon">
                    <Video size={23} />
                  </div>

                  <div>
                    <h3>Online Classes</h3>
                    <p>Live virtual sessions</p>
                  </div>
                </div>

                <label htmlFor="online-rate">
                  Price per hour (₹)
                </label>

                <div className="pricing-input-wrapper">
                  <IndianRupee size={18} />

                  <input
                    id="online-rate"
                    type="number"
                    min="1"
                    step="1"
                    value={pricing.online}
                    onChange={(event) =>
                      updatePrice('online', event.target.value)
                    }
                    required
                  />
                </div>

                <span className="pricing-example">
                  Example: {formatPrice(pricing.online)} / hour
                </span>
              </div>

              <div className="pricing-mode-card">
                <div className="pricing-mode-title">
                  <div className="pricing-mode-icon pricing-offline-icon">
                    <MapPin size={23} />
                  </div>

                  <div>
                    <h3>Offline Classes</h3>
                    <p>In-person teaching sessions</p>
                  </div>
                </div>

                <label htmlFor="offline-rate">
                  Price per hour (₹)
                </label>

                <div className="pricing-input-wrapper">
                  <IndianRupee size={18} />

                  <input
                    id="offline-rate"
                    type="number"
                    min="1"
                    step="1"
                    value={pricing.offline}
                    onChange={(event) =>
                      updatePrice('offline', event.target.value)
                    }
                    required
                  />
                </div>

                <span className="pricing-example">
                  Example: {formatPrice(pricing.offline)} / hour
                </span>
              </div>
            </div>
          </section>

          <section className="pricing-section">
            <div className="pricing-section-heading">
              <div>
                <h2>Topic Difficulty Rates</h2>
                <p>
                  Set a base hourly rate for each difficulty level.
                </p>
              </div>
            </div>

            <div className="pricing-difficulty-list">
              <div className="pricing-difficulty-row">
                <div className="pricing-difficulty-info">
                  <span className="pricing-difficulty-dot easy-dot" />
                  <div>
                    <h3>Easy</h3>
                    <p>Basic concepts and introductory topics</p>
                  </div>
                </div>

                <div className="pricing-small-input">
                  <span>₹</span>

                  <input
                    aria-label="Easy topic hourly rate"
                    type="number"
                    min="0"
                    step="1"
                    value={pricing.easy}
                    onChange={(event) =>
                      updatePrice('easy', event.target.value)
                    }
                    required
                  />

                  <span>/ hour</span>
                </div>
              </div>

              <div className="pricing-difficulty-row">
                <div className="pricing-difficulty-info">
                  <span className="pricing-difficulty-dot medium-dot" />
                  <div>
                    <h3>Medium</h3>
                    <p>Intermediate concepts and practice problems</p>
                  </div>
                </div>

                <div className="pricing-small-input">
                  <span>₹</span>

                  <input
                    aria-label="Medium topic hourly rate"
                    type="number"
                    min="0"
                    step="1"
                    value={pricing.medium}
                    onChange={(event) =>
                      updatePrice('medium', event.target.value)
                    }
                    required
                  />

                  <span>/ hour</span>
                </div>
              </div>

              <div className="pricing-difficulty-row">
                <div className="pricing-difficulty-info">
                  <span className="pricing-difficulty-dot hard-dot" />
                  <div>
                    <h3>Hard</h3>
                    <p>Advanced concepts and complex problem-solving</p>
                  </div>
                </div>

                <div className="pricing-small-input">
                  <span>₹</span>

                  <input
                    aria-label="Hard topic hourly rate"
                    type="number"
                    min="0"
                    step="1"
                    value={pricing.hard}
                    onChange={(event) =>
                      updatePrice('hard', event.target.value)
                    }
                    required
                  />

                  <span>/ hour</span>
                </div>
              </div>
            </div>
          </section>

          <section className="pricing-section">
            <div className="pricing-section-heading">
              <div>
                <h2>Additional Settings</h2>
                <p>Configure an optional group learning discount.</p>
              </div>
            </div>

            <div className="pricing-discount-setting">
              <div className="pricing-discount-icon">
                <Clock size={22} />
              </div>

              <div className="pricing-discount-description">
                <h3>Group Session Discount</h3>
                <p>
                  Optional discount percentage for group sessions.
                  Actual group booking support must be implemented
                  separately.
                </p>
              </div>

              <div className="pricing-discount-input">
                <input
                  aria-label="Group session discount percentage"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={pricing.groupDiscount}
                  onChange={(event) =>
                    updatePrice('groupDiscount', event.target.value)
                  }
                  required
                />

                <span>%</span>
              </div>
            </div>
          </section>

          <section className="pricing-preview">
            <div>
              <span className="pricing-preview-label">
                YOUR STANDARD ONLINE RATE
              </span>

              <h2>{formatPrice(pricing.online)}</h2>

              <p>per hour</p>
            </div>

            <div className="pricing-preview-divider" />

            <div>
              <span className="pricing-preview-label">
                YOUR STANDARD OFFLINE RATE
              </span>

              <h2>{formatPrice(pricing.offline)}</h2>

              <p>per hour</p>
            </div>
          </section>

          <div className="pricing-footer">
            <p>
              These rates are demo settings and are not yet visible
              to students through a connected backend.
            </p>

            <button
              type="submit"
              className="btn btn-primary pricing-save-btn"
            >
              <Save size={18} />
              Save Pricing
            </button>
          </div>
        </form>
      </div>
    </TutorLayout>
  );
}

export default Pricing;