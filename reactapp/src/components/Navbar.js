import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          LMS Lite
        </Link>
        
        <div className="nav-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          
          {isAdmin() && (
            <>
              <Link to="/add-course" className="nav-link">Add Course</Link>
              <Link to="/add-quiz" className="nav-link">Add Quiz</Link>
            </>
          )}
        </div>

        <div className="nav-user">
          <span className="user-info">
            {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;