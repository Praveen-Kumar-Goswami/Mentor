import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              {t('getStarted')}
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              {t('login')}
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>{t('features.title')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>{t('features.matching.title')}</h3>
              <p>{t('features.matching.description')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('features.scheduling.title')}</h3>
              <p>{t('features.scheduling.description')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('features.video.title')}</h3>
              <p>{t('features.video.description')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('features.rating.title')}</h3>
              <p>{t('features.rating.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


