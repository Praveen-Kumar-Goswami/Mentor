import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import BookingModal from '../components/BookingModal';

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchMentorData();
  }, [id]);

  const fetchMentorData = async () => {
    try {
      const [mentorRes, ratingsRes] = await Promise.all([
        axios.get(`/api/mentors/${id}`),
        axios.get(`/api/ratings/mentor/${id}`)
      ]);
      setMentor(mentorRes.data);
      setRatings(ratingsRes.data);
    } catch (error) {
      console.error('Error fetching mentor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  if (!mentor) {
    return <div className="container">{t('mentorNotFound')}</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>{mentor.name}</h1>
        <p className="rating">
          ⭐ {mentor.profile?.rating?.average?.toFixed(1) || 'N/A'} 
          ({mentor.profile?.rating?.count || 0} {t('reviews')})
        </p>
        <p><strong>{t('bio')}:</strong> {mentor.profile?.bio || t('noBio')}</p>
        <p><strong>{t('industry')}:</strong> {mentor.profile?.industry || 'N/A'}</p>
        <p><strong>{t('experience')}:</strong> {mentor.profile?.experience || 0} {t('years')}</p>
        <p><strong>{t('skills')}:</strong> {mentor.profile?.skills?.join(', ') || 'N/A'}</p>
        {mentor.profile?.pricePerHour && (
          <p><strong>{t('pricePerHour')}:</strong> ${mentor.profile.pricePerHour}</p>
        )}
        <button 
          onClick={() => setShowBookingModal(true)} 
          className="btn btn-primary"
          style={{ marginTop: '20px' }}
        >
          {t('bookSession')}
        </button>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h2>{t('reviews')}</h2>
        {ratings.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
            {ratings.map((rating) => (
              <div key={rating._id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <p><strong>{rating.mentee.name}</strong> - ⭐ {rating.rating}/5</p>
                {rating.feedback && <p>{rating.feedback}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>{t('noReviews')}</p>
        )}
      </div>

      {showBookingModal && (
        <BookingModal
          mentorId={id}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false);
            navigate('/bookings');
          }}
        />
      )}
    </div>
  );
};

export default MentorProfile;


