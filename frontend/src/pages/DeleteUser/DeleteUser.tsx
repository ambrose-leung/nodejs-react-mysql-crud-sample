import React, { useState } from 'react';
import axios from 'axios';
import { UserData } from '../../types';
import './DeleteUser.css';

function DeleteUser() {
  const [userName, setUserName] = useState<string>('');
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [deletedUser, setDeletedUser] = useState<UserData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError('Please enter a name to search');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setDeletedUser(null);
    setUserToDelete(null);
    setShowConfirmation(false);

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userName}`);
      setUserToDelete(response.data);
      setShowConfirmation(true);
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

  const handleDelete = async () => {
    if (!userToDelete) return;

    setLoading(true);
    setError('');

    try {
      // Store the user data before deletion
      const userToDeleteCopy = { ...userToDelete };

      await axios.delete(`http://localhost:5000/api/users/${userToDelete.name}`);

      // Set the deleted user data for display
      setDeletedUser(userToDeleteCopy);
      setSuccess(`User "${userToDelete.name}" has been successfully deleted.`);
      setUserToDelete(null);
      setShowConfirmation(false);
      setUserName('');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('User not found or already deleted');
        } else {
          setError(err.response?.data?.error || 'Error deleting user. Please try again.');
        }
      } else {
        setError('Error deleting user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
    setError('');
  };

  const handleReset = () => {
    setUserName('');
    setUserToDelete(null);
    setDeletedUser(null);
    setShowConfirmation(false);
    setError('');
    setSuccess('');
  };

  const handleCopyJson = () => {
    if (!deletedUser) return;
    const jsonData = JSON.stringify(
      Object.fromEntries(
        Object.entries(deletedUser).filter(([key]) => !['id', 'created_at'].includes(key))
      ),
      null,
      2
    );
    navigator.clipboard.writeText(jsonData)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 1500);
      })
      .catch(() => {
        setCopySuccess('Failed to copy');
        setTimeout(() => setCopySuccess(''), 1500);
      });
  };

  return (
    <div className="delete-user-container">
      <h1>Delete User</h1>

      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name to delete..."
            className="search-input"
            disabled={showConfirmation}
          />
          <button
            type="submit"
            disabled={loading || showConfirmation}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Find User'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {deletedUser && (
        <div className="deleted-user-json">
          <h3>
            Deleted User Data (JSON):
            <button
              className="copy-json-button"
              onClick={handleCopyJson}
              style={{
                marginLeft: '8px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontSize: '1.2em'
              }}
              title="Copy JSON"
              type="button"
            >
              📋
            </button>
            {copySuccess && (
              <span style={{ marginLeft: '8px', color: 'green', fontSize: '0.9em' }}>
                {copySuccess}
              </span>
            )}
          </h3>
          <div className="json-container">
            <pre>{JSON.stringify(deletedUser ? Object.fromEntries(
              Object.entries(deletedUser).filter(([key]) => !['id', 'created_at'].includes(key))
            ) : null, null, 2)}
            </pre>
          </div>
          <p className="json-note">
            💡 <strong>Note:</strong> You can copy this JSON data if you need to re-add this user later.
          </p>
        </div>
      )}

      {showConfirmation && userToDelete && (
        <div className="confirmation-card">
          <div className="warning-header">
            <h2>⚠️ Confirm Deletion</h2>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          </div>

          <div className="user-details">
            <h3>User to be deleted:</h3>
            <div className="user-info">
              <p><strong>ID:</strong> {userToDelete.id}</p>
              <p><strong>Name:</strong> {userToDelete.name}</p>
              <p><strong>Email:</strong> {userToDelete.email}</p>
              <p><strong>Age:</strong> {userToDelete.age}</p>
              <p><strong>City:</strong> {userToDelete.city}</p>
              <p><strong>Created:</strong> {new Date(userToDelete.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="confirmation-buttons">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="delete-confirm-button"
            >
              {loading ? 'Deleting...' : 'Yes, Delete User'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="warning-notice">
        <h3>⚠️ Important Notice</h3>
        <p>Deleting a user will permanently remove all their data from the system. This action cannot be undone. Please make sure you have the correct user before proceeding.</p>
      </div>

      <div className="sample-users">
        <h3>Sample Users to Try:</h3>
        <p>John Doe, Jane Smith, Mike Johnson, Sarah Wilson, David Brown</p>
      </div>
    </div>
  );
}

export default DeleteUser;
