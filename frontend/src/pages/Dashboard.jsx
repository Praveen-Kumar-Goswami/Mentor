import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (user?.role === 'mentee') {
        const [suggestionsRes, bookingsRes] = await Promise.all([
          axios.get('/api/matching/suggestions'),
          axios.get('/api/bookings')
        ]);
        setSuggestions(suggestionsRes.data.slice(0, 5));
        setBookings(bookingsRes.data.slice(0, 5));
      } else {
        const bookingsRes = await axios.get('/api/bookings');
        setBookings(bookingsRes.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  return (
    <div className="container">
      <h1>{t('welcome')}, {user?.name}!</h1>
      
      {user?.role === 'mentee' && (
        <section className="card" style={{ marginTop: '30px' }}>
          <h2>{t('suggestedMentors')}</h2>
          {suggestions.length > 0 ? (
            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
              {suggestions.map((match) => (
                <div key={match.mentor.id} className="card">
                  <h3>{match.mentor.name}</h3>
                  <p>Match Score: {match.matchScore.toFixed(0)}%</p>
                  <p>{match.matchFactors.join(', ')}</p>
                  <Link to={`/mentors/${match.mentor.id}`} className="btn btn-primary">
                    {t('viewProfile')}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>{t('noSuggestions')}</p>
          )}
        </section>
      )}

      <section className="card" style={{ marginTop: '30px' }}>
        <h2>{t('upcomingBookings')}</h2>
        {bookings.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
            {bookings.map((booking) => (
              <div key={booking._id} className="card" style={{ marginBottom: '10px' }}>
                <h3>
                  {user?.role === 'mentee' 
                    ? `Mentor: ${booking.mentor.name}`
                    : `Mentee: ${booking.mentee.name}`
                  }
                </h3>
                <p>Date: {new Date(booking.startTime).toLocaleString()}</p>
                <p>Status: {booking.status}</p>
                {booking.status === 'confirmed' && (
                  <Link to={`/meeting/${booking._id}`} className="btn btn-success">
                    {t('joinMeeting')}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>{t('noBookings')}</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;


