import React, { useState } from 'react';
import axios from 'axios';
import { UserInput } from '../../types';
import './AddUser.css';

function AddUser() {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Sample JSON for user input
  const sampleJson = JSON.stringify({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    city: "Seattle"
  }, null, 2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please enter user data');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Parse the JSON input
      const userData: UserInput = JSON.parse(userInput);
      
      // Validate required fields
      if (!userData.name || !userData.email || !userData.age || !userData.city) {
        throw new Error('All fields (name, email, age, city) are required');
      }

      // Validate data types
      if (typeof userData.age !== 'number' || userData.age <= 0) {
        throw new Error('Age must be a positive number');
      }

      const response = await axios.post('http://localhost:5000/api/users', userData);
      setSuccess(`User "${userData.name}" added successfully with ID: ${response.data.id}`);
      setUserInput('');
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your input.');
      } else if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError('User with this name or email already exists');
        } else if (err.response?.status === 400) {
          setError(err.response.data.error || 'Invalid user data');
        } else {
          setError('Error adding user. Please try again.');
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUserInput('');
    setError('');
    setSuccess('');
  };

  const loadSample = () => {
    setUserInput(sampleJson);
    setError('');
    setSuccess('');
  };

  return (
    <div className="add-user-container">
      <h1>Add New User</h1>
      
      <div className="sample-section">
        <h3>Sample JSON Format:</h3>
        <pre className="sample-json">{sampleJson}</pre>
        <button type="button" onClick={loadSample} className="load-sample-button">
          Load Sample
        </button>
      </div>

      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="input-group">
          <label htmlFor="userInput">User Data (JSON):</label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter user data in JSON format..."
            className="user-input-textarea"
            rows={8}
          />
        </div>
        
        <div className="button-group">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Adding User...' : 'Add User'}
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

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}
    </div>
  );
}

export default AddUser;
