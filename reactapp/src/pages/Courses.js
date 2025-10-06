import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { showToast } from '../components/Toast';

const Courses = () => {
  const { token, user, isStudent } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [currentPage, search]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`/api/courses?page=${currentPage}&size=6&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`/api/courses/${courseId}/enroll/${user.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Enrolled successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Enrollment failed', 'error');
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Courses</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.title}</h3>
              <span className="course-date">
                {new Date(course.createdDate).toLocaleDateString()}
              </span>
            </div>
            
            <p className="course-description">{course.description}</p>
            
            <div className="course-actions">
              <Link to={`/courses/${course.id}`} className="btn btn-primary">
                View Details
              </Link>
              
              {isStudent() && (
                <button 
                  onClick={() => handleEnroll(course.id)}
                  className="btn btn-secondary"
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="btn btn-outline"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;