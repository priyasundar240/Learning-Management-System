import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { showToast } from '../components/Toast';

const AddQuiz = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses?size=1000', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.content);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

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
      await axios.post(`/api/courses/${formData.courseId}/quiz`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Quiz question added successfully!', 'success');
      setFormData({
        courseId: formData.courseId,
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A'
      });
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to add quiz question', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-quiz-page">
      <div className="page-header">
        <h1>Add Quiz Question</h1>
        <p>Create quiz questions for courses</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-group">
            <label>Select Course</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              placeholder="Enter your question"
              rows="3"
            />
          </div>

          <div className="options-grid">
            <div className="form-group">
              <label>Option A</label>
              <input
                type="text"
                name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                required
                placeholder="Option A"
              />
            </div>

            <div className="form-group">
              <label>Option B</label>
              <input
                type="text"
                name="optionB"
                value={formData.optionB}
                onChange={handleChange}
                required
                placeholder="Option B"
              />
            </div>

            <div className="form-group">
              <label>Option C</label>
              <input
                type="text"
                name="optionC"
                value={formData.optionC}
                onChange={handleChange}
                required
                placeholder="Option C"
              />
            </div>

            <div className="form-group">
              <label>Option D</label>
              <input
                type="text"
                name="optionD"
                value={formData.optionD}
                onChange={handleChange}
                required
                placeholder="Option D"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correct Answer</label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              Back to Courses
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Adding...' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;