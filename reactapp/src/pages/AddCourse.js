import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { showToast } from '../components/Toast';

const AddCourse = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/courses', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Course created successfully!', 'success');
      navigate('/courses');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to create course', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-course-page">
      <div className="page-header">
        <h1>Add New Course</h1>
        <p>Create a new course for students</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter course title"
            />
          </div>

          <div className="form-group">
            <label>Course Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter course description"
              rows="6"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;