import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Mentor Connect logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Mentor Connect</span>
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                {t('dashboard')}
              </Link>
              <Link to="/mentors" className="navbar-link">
                {t('mentors')}
              </Link>
              <Link to="/bookings" className="navbar-link">
                {t('bookings')}
              </Link>
              <Link to="/profile" className="navbar-link">
                {t('profile')}
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                {t('login')}
              </Link>
              <Link to="/register" className="btn btn-primary">
                {t('register')}
              </Link>
            </>
          )}
          <div className="language-selector">
            <button onClick={() => changeLanguage('en')} className="lang-btn">EN</button>
            <button onClick={() => changeLanguage('es')} className="lang-btn">ES</button>
            <button onClick={() => changeLanguage('fr')} className="lang-btn">FR</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


