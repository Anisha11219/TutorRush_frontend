
import { useState } from 'react';
import {
  Star,
  MessageSquareText,
  Pencil,
  Trash2,
  Send,
  UserRound,
  ThumbsUp
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout.jsx';

const initialReviews = [
  {
    id: 1,
    tutorName: 'Rahul Verma',
    subject: 'Computer Science',
    topic: 'Data Structures',
    rating: 5,
    comment:
      'The tutor explained data structures clearly with practical examples. The session was very helpful.',
    date: '2026-10-05'
  },
  {
    id: 2,
    tutorName: 'Priya Sharma',
    subject: 'Mathematics',
    topic: 'Calculus',
    rating: 4,
    comment:
      'Good teaching approach. Difficult concepts were explained step by step.',
    date: '2026-09-20'
  }
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [tutorName, setTutorName] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState('');

  const averageRating = reviews.length
    ? (
        reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : '0.0';

  const resetForm = () => {
    setTutorName('');
    setSubject('');
    setTopic('');
    setRating(5);
    setComment('');
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!tutorName.trim() || !subject.trim() || !comment.trim()) {
      setNotice('Please fill in the tutor name, subject, and review.');
      return;
    }

    if (editingId !== null) {
      setReviews((current) =>
        current.map((review) =>
          review.id === editingId
            ? {
                ...review,
                tutorName: tutorName.trim(),
                subject: subject.trim(),
                topic: topic.trim() || subject.trim(),
                rating,
                comment: comment.trim()
              }
            : review
        )
      );

      setNotice('Your review has been updated in this demo.');
    } else {
      const newReview = {
        id: Date.now(),
        tutorName: tutorName.trim(),
        subject: subject.trim(),
        topic: topic.trim() || subject.trim(),
        rating,
        comment: comment.trim(),
        date: new Date().toISOString().slice(0, 10)
      };

      setReviews((current) => [newReview, ...current]);
      setNotice('Your review has been added in this demo.');
    }

    resetForm();
  };

  const handleEdit = (review) => {
    setEditingId(review.id);
    setTutorName(review.tutorName);
    setSubject(review.subject);
    setTopic(review.topic);
    setRating(review.rating);
    setComment(review.comment);
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (reviewId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!confirmed) return;

    setReviews((current) =>
      current.filter((review) => review.id !== reviewId)
    );

    if (editingId === reviewId) {
      resetForm();
    }

    setNotice('Review deleted from this demo.');
  };

  const renderStars = (value, interactive = false, onSelect = () => {}) => (
    <div className={interactive ? 'review-star-input' : 'review-stars'}>
      {[1, 2, 3, 4, 5].map((star) =>
        interactive ? (
          <button
            type="button"
            key={star}
            className={`review-star-button ${
              star <= value ? 'selected' : ''
            }`}
            onClick={() => onSelect(star)}
            aria-label={`Rate ${star} out of 5 stars`}
            aria-pressed={star === value}
          >
            <Star
              size={27}
              fill={star <= value ? 'currentColor' : 'none'}
            />
          </button>
        ) : (
          <Star
            key={star}
            size={16}
            fill={star <= value ? 'currentColor' : 'none'}
          />
        )
      )}
    </div>
  );

  return (
    <StudentLayout>
      <div className="student-reviews-page">
        <div className="reviews-page-heading">
          <div>
            <h1>My Reviews</h1>
            <p>Share your learning experience and manage your feedback.</p>
          </div>
        </div>

        {notice && (
          <div className="reviews-notice" role="status">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}>
              Dismiss
            </button>
          </div>
        )}

        <div className="reviews-overview-grid">
          <div className="card reviews-overview-card">
            <div className="reviews-overview-icon">
              <Star size={22} />
            </div>
            <div>
              <span>Average rating given</span>
              <strong>{averageRating} / 5</strong>
            </div>
          </div>

          <div className="card reviews-overview-card">
            <div className="reviews-overview-icon">
              <MessageSquareText size={22} />
            </div>
            <div>
              <span>Total reviews</span>
              <strong>{reviews.length}</strong>
            </div>
          </div>
        </div>

        <section className="card review-form-card">
          <div className="review-section-heading">
            <h2>{editingId !== null ? 'Edit your review' : 'Write a review'}</h2>
            <p>Tell other students about your learning experience.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="review-form-grid">
              <div className="form-group">
                <label htmlFor="reviewTutorName">Tutor name</label>
                <input
                  id="reviewTutorName"
                  type="text"
                  value={tutorName}
                  onChange={(event) => setTutorName(event.target.value)}
                  placeholder="Enter tutor's name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reviewSubject">Subject</label>
                <input
                  id="reviewSubject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="e.g. Mathematics"
                  required
                />
              </div>

              <div className="form-group review-topic-field">
                <label htmlFor="reviewTopic">Topic learned</label>
                <input
                  id="reviewTopic"
                  type="text"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="e.g. Calculus"
                />
              </div>
            </div>

            <div className="review-rating-field">
              <label>Rate your experience</label>
              {renderStars(rating, true, setRating)}
              <span className="review-rating-label">
                {rating === 5
                  ? 'Excellent'
                  : rating === 4
                    ? 'Very good'
                    : rating === 3
                      ? 'Good'
                      : rating === 2
                        ? 'Fair'
                        : 'Needs improvement'}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="reviewComment">Your feedback</label>
              <textarea
                id="reviewComment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="What did you like about the session?"
                rows={4}
                maxLength={500}
                required
              />
              <span className="review-character-count">
                {comment.length}/500 characters
              </span>
            </div>

            <div className="review-form-actions">
              <button className="btn btn-primary" type="submit">
                <Send size={17} />
                {editingId !== null ? 'Update review' : 'Submit review'}
              </button>

              {editingId !== null && (
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel editing
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="reviews-list-section">
          <div className="review-section-heading">
            <h2>Your feedback</h2>
            <p>Reviews you have submitted for your tutors.</p>
          </div>

          {reviews.length > 0 ? (
            <div className="student-reviews-list">
              {reviews.map((review) => (
                <article className="card student-review-card" key={review.id}>
                  <div className="student-review-header">
                    <div className="review-tutor-avatar">
                      <UserRound size={24} />
                    </div>

                    <div className="review-tutor-details">
                      <h3>{review.tutorName}</h3>
                      <p>{review.subject} · {review.topic}</p>
                    </div>

                    <span className="review-date">
                      {new Date(
                        `${review.date}T00:00:00`
                      ).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="student-review-rating">
                    {renderStars(review.rating)}
                    <strong>{review.rating}.0</strong>
                  </div>

                  <p className="student-review-comment">{review.comment}</p>

                  <div className="student-review-actions">
                    <button
                      type="button"
                      className="review-edit-action"
                      onClick={() => handleEdit(review)}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="review-delete-action"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                    <span className="review-helpful-note">
                      <ThumbsUp size={14} />
                      Your feedback matters
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card reviews-empty-state">
              <MessageSquareText size={40} />
              <h3>No reviews yet</h3>
              <p>Your submitted reviews will appear here.</p>
            </div>
          )}
        </section>

        <p className="reviews-demo-note">
          Demo only: reviews are stored in page state and will reset when the
          page is refreshed. Backend integration will be added later.
        </p>
      </div>
    </StudentLayout>
  );
}

export default Reviews;
