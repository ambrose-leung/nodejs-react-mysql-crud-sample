import React, { useState } from 'react';
import axios from 'axios';
import { UserData } from '../../types';
import './UserLookup.css';

function UserLookup() {
  const [userName, setUserName] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter a name to search');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userName}`);
      setUserData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('User not found');
      } else {
        setError('Error fetching user data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserName('');
    setUserData(null);
    setError('');
  };

  return (
    <div className="user-lookup-container">
      <h1>User Lookup System</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {userData && (
        <div className="user-card">
          <h2>User Found!</h2>
          <div className="user-details">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>City:</strong> {userData.city}</p>
            <p><strong>Created:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      <div className="sample-users">
        <h3>Sample Users to Try:</h3>
        <p>John Doe, Jane Smith, Mike Johnson, Sarah Wilson, David Brown</p>
      </div>
    </div>
  );
}

export default UserLookup;
