import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, token, isAdmin } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    totalStudents: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const coursesResponse = await axios.get('/api/courses?size=1000', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(prev => ({
        ...prev,
        totalCourses: coursesResponse.data.totalElements
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Ready to continue your learning journey?</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
        </div>

        {isAdmin() ? (
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
        ) : (
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.enrolledCourses}</h3>
              <p>Enrolled Courses</p>
            </div>
          </div>
        )}

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>85%</h3>
            <p>Progress</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/courses" className="action-card">
            <div className="action-icon">🔍</div>
            <h3>Browse Courses</h3>
            <p>Explore available courses</p>
          </Link>

          {isAdmin() && (
            <>
              <Link to="/add-course" className="action-card">
                <div className="action-icon">➕</div>
                <h3>Add Course</h3>
                <p>Create a new course</p>
              </Link>

              <Link to="/add-quiz" className="action-card">
                <div className="action-icon">❓</div>
                <h3>Add Quiz</h3>
                <p>Create quiz questions</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;