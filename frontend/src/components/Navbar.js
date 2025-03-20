import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        Modern Web App
      </Link>
      <div style={styles.links}>
        {currentUser ? (
          <>
            <Link to="/profile" style={styles.link}>
              Profile
            </Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  brand: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: '#333'
  },
  links: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    padding: '0.5rem 1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Navbar;