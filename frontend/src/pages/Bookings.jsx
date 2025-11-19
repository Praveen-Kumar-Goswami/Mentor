import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import RatingModal from '../components/RatingModal';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await axios.put(`/api/bookings/${bookingId}/status`, { status });
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  return (
    <div className="container">
      <h1>{t('bookings')}</h1>
      {bookings.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          {bookings.map((booking) => (
            <div key={booking._id} className="card">
              <h3>
                {booking.mentor.name} - {booking.mentee.name}
              </h3>
              <p><strong>{t('startTime')}:</strong> {format(new Date(booking.startTime), 'PPpp')}</p>
              <p><strong>{t('endTime')}:</strong> {format(new Date(booking.endTime), 'PPpp')}</p>
              <p><strong>{t('status')}:</strong> {booking.status}</p>
              {booking.notes && <p><strong>{t('notes')}:</strong> {booking.notes}</p>}
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                      className="btn btn-success"
                    >
                      {t('confirm')}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                      className="btn btn-secondary"
                    >
                      {t('cancel')}
                    </button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <Link to={`/meeting/${booking._id}`} className="btn btn-primary">
                    {t('joinMeeting')}
                  </Link>
                )}
                {booking.status === 'completed' && (
                  <button
                    onClick={() => setRatingModal({ bookingId: booking._id, mentorId: booking.mentor._id })}
                    className="btn btn-success"
                  >
                    {t('rateSession')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>{t('noBookings')}</p>
      )}

      {ratingModal && (
        <RatingModal
          bookingId={ratingModal.bookingId}
          mentorId={ratingModal.mentorId}
          onClose={() => setRatingModal(null)}
          onSuccess={() => {
            setRatingModal(null);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
};

export default Bookings;

