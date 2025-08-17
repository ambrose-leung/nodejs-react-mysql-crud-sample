import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import { UserLookup, AddUser, DeleteUser } from './pages';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<UserLookup />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/delete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
