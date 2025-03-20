import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError('Failed to fetch user data');
        console.error('Error:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      {error && <div style={styles.error}>{error}</div>}
      {userData ? (
        <div style={styles.profile}>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>User ID:</strong> {currentUser.uid}</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  },
  profile: {
    marginTop: '1rem'
  },
  error: {
    color: '#dc3545',
    marginBottom: '1rem'
  }
};

export default Profile;