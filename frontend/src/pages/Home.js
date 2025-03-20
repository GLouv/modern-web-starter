import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div style={styles.container}>
      <h1>Welcome to Modern Web Starter</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.email}</p>
      ) : (
        <p>Please log in to access all features</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  }
};

export default Home;