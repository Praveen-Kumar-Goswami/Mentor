import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './BookingModal.css';

const RatingModal = ({ bookingId, mentorId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/ratings', {
        mentorId,
        bookingId,
        rating,
        feedback
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || t('ratingFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('rateSession')}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('rating')}</label>
            <div style={{ display: 'flex', gap: '10px', fontSize: '2rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: 'pointer',
                    color: star <= rating ? '#ffc107' : '#ddd'
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              style={{ width: '100%', marginTop: '10px' }}
            />
          </div>
          <div className="form-group">
            <label>{t('feedback')} ({t('optional')})</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('shareFeedback')}
              rows="4"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? t('submitting') + '...' : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;


