import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './BookingModal.css';

const BookingModal = ({ mentorId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/bookings', {
        mentorId,
        ...formData
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || t('bookingFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('bookSession')}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('startTime')}</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('endTime')}</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('notes')} ({t('optional')})</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder={t('addNotes')}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? t('booking') + '...' : t('book')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;


