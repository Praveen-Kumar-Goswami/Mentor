import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        bio: response.data.profile?.bio || '',
        skills: response.data.profile?.skills?.join(', ') || '',
        industry: response.data.profile?.industry || '',
        experience: response.data.profile?.experience || 0,
        education: response.data.profile?.education || '',
        pricePerHour: response.data.profile?.pricePerHour || '',
        calendlyUrl: response.data.profile?.calendlyUrl || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: formData.name,
        profile: {
          bio: formData.bio,
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
          industry: formData.industry,
          experience: parseInt(formData.experience),
          education: formData.education,
          pricePerHour: formData.pricePerHour ? parseFloat(formData.pricePerHour) : undefined,
          calendlyUrl: formData.calendlyUrl
        }
      };

      await axios.put('/api/users/profile', updateData);
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="loading">{t('loading')}...</div>;
  }

  return (
    <div className="container">
      <h1>{t('profile')}</h1>
      <div className="card">
        {!editing ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h2>{profile?.name}</h2>
                <p><strong>{t('email')}:</strong> {profile?.email}</p>
                <p><strong>{t('role')}:</strong> {profile?.role}</p>
                {profile?.profile?.bio && <p><strong>{t('bio')}:</strong> {profile.profile.bio}</p>}
                {profile?.profile?.industry && <p><strong>{t('industry')}:</strong> {profile.profile.industry}</p>}
                {profile?.profile?.skills && (
                  <p><strong>{t('skills')}:</strong> {profile.profile.skills.join(', ')}</p>
                )}
                {profile?.profile?.experience && (
                  <p><strong>{t('experience')}:</strong> {profile.profile.experience} {t('years')}</p>
                )}
                {profile?.role === 'mentor' && profile?.profile?.rating && (
                  <p className="rating">
                    <strong>{t('rating')}:</strong> ⭐ {profile.profile.rating.average.toFixed(1)} 
                    ({profile.profile.rating.count} {t('reviews')})
                  </p>
                )}
              </div>
              <button onClick={() => setEditing(true)} className="btn btn-primary">
                {t('edit')}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('bio')}</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('industry')}</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('skills')} ({t('commaSeparated')})</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js"
              />
            </div>
            <div className="form-group">
              <label>{t('experience')} ({t('years')})</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
              />
            </div>
            {profile?.role === 'mentor' && (
              <>
                <div className="form-group">
                  <label>{t('pricePerHour')} ($)</label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>{t('calendlyUrl')}</label>
                  <input
                    type="url"
                    name="calendlyUrl"
                    value={formData.calendlyUrl}
                    onChange={handleChange}
                    placeholder="https://calendly.com/your-link"
                  />
                </div>
              </>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary">
                {t('save')}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">
                {t('cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;


