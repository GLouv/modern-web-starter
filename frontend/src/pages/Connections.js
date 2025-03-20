import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Connections() {
  const { currentUser } = useAuth();
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/connections`, {
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`
        }
      });
      const data = await response.json();
      setConnections(data);
    } catch (error) {
      setError('Failed to fetch connections');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (provider) => {
    try {
      // Redirect to provider's OAuth flow
      window.location.href = `${process.env.REACT_APP_API_URL}/auth/${provider}/connect`;
    } catch (error) {
      setError(`Failed to connect to ${provider}`);
      console.error('Error:', error);
    }
  };

  const handleDisconnect = async (connectionId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/connections/${connectionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`
        }
      });
      fetchConnections();
    } catch (error) {
      setError('Failed to disconnect account');
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>Connected Accounts</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.connections}>
        {connections.map(connection => (
          <div key={connection._id} style={styles.connectionCard}>
            <div style={styles.connectionInfo}>
              <h3>{connection.provider}</h3>
              <p>Connected as: {connection.providerUsername}</p>
              <p>Connected on: {new Date(connection.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => handleDisconnect(connection._id)}
              style={styles.disconnectButton}
            >
              Disconnect
            </button>
          </div>
        ))}
      </div>

      <div style={styles.connectSection}>
        <h3>Connect New Account</h3>
        <div style={styles.connectButtons}>
          <button
            onClick={() => handleConnect('facebook')}
            style={styles.connectButton}
          >
            Connect Facebook
          </button>
          <button
            onClick={() => handleConnect('instagram')}
            style={styles.connectButton}
          >
            Connect Instagram
          </button>
          <button
            onClick={() => handleConnect('twitter')}
            style={styles.connectButton}
          >
            Connect Twitter
          </button>
          <button
            onClick={() => handleConnect('linkedin')}
            style={styles.connectButton}
          >
            Connect LinkedIn
          </button>
          <button
            onClick={() => handleConnect('gmail')}
            style={styles.connectButton}
          >
            Connect Gmail
          </button>
          <button
            onClick={() => handleConnect('shopify')}
            style={styles.connectButton}
          >
            Connect Shopify
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
  },
  error: {
    color: '#dc3545',
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    backgroundColor: '#f8d7da'
  },
  connections: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '2rem'
  },
  connectionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  connectionInfo: {
    flex: 1
  },
  disconnectButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  connectSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  connectButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  connectButton: {
    padding: '0.75rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};

export default Connections;