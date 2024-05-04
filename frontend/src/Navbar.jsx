import React from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar({ onLogout }) {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const shouldShowLogout = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/';

  return (
    <div className="navbar">
      <img src="/edu-nimbus.png" alt="Logo" className="logo-photo" />
      <div className="logo">
        EduNimbus
      </div>
      {shouldShowLogout && (
        <div className="user-info">
            <div className="user-id">{userId}</div>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
