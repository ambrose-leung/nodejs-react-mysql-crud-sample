import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>User Management System</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Search Users
          </Link>
          <Link 
            to="/add" 
            className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}
          >
            Add User
          </Link>
          <Link 
            to="/delete" 
            className={`nav-link ${location.pathname === '/delete' ? 'active' : ''}`}
          >
            Delete User
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
