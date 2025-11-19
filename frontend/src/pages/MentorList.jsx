import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: '',
    skills: '',
    minRating: ''
  });
  const { t } = useTranslation();

  useEffect(() => {
    fetchMentors();
  }, [filters]);

  const fetchMentors = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.industry) params.append('industry', filters.industry);
      if (filters.skills) params.append('skills', filters.skills);
      if (filters.minRating) params.append('minRating', filters.minRating);

      const response = await axios.get(`/api/mentors?${params}`);
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  return (
    <div className="container">
      <h1>{t('mentors')}</h1>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h2>{t('filters')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="form-group">
            <label>{t('industry')}</label>
            <input
              type="text"
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
              placeholder={t('searchIndustry')}
            />
          </div>
          <div className="form-group">
            <label>{t('skills')}</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              placeholder={t('searchSkills')}
            />
          </div>
          <div className="form-group">
            <label>{t('minRating')}</label>
            <input
              type="number"
              name="minRating"
              value={filters.minRating}
              onChange={handleFilterChange}
              min="1"
              max="5"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {mentors.map((mentor) => (
          <div key={mentor._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h2>{mentor.name}</h2>
                <p>{mentor.profile?.bio}</p>
                <p><strong>{t('industry')}:</strong> {mentor.profile?.industry}</p>
                <p><strong>{t('skills')}:</strong> {mentor.profile?.skills?.join(', ')}</p>
                <p><strong>{t('experience')}:</strong> {mentor.profile?.experience} {t('years')}</p>
                <p className="rating">
                  ⭐ {mentor.profile?.rating?.average?.toFixed(1) || 'N/A'} 
                  ({mentor.profile?.rating?.count || 0} {t('reviews')})
                </p>
              </div>
              <Link to={`/mentors/${mentor._id}`} className="btn btn-primary">
                {t('viewProfile')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {mentors.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>{t('noMentorsFound')}</p>
      )}
    </div>
  );
};

export default MentorList;


