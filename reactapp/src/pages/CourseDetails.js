import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const { token, isAdmin } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
    fetchQuizzes();
    if (isAdmin()) {
      fetchStudents();
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}/quiz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="course-details">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-date">
          Created: {new Date(course.createdDate).toLocaleDateString()}
        </p>
      </div>

      <div className="course-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        
        <button 
          className={`tab ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          Quizzes ({quizzes.length})
        </button>
        
        {isAdmin() && (
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students ({students.length})
          </button>
        )}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="course-description">
              <h3>Course Description</h3>
              <p>{course.description}</p>
            </div>
            
            <div className="course-stats">
              <div className="stat">
                <h4>Total Quizzes</h4>
                <span>{quizzes.length}</span>
              </div>
              {isAdmin() && (
                <div className="stat">
                  <h4>Enrolled Students</h4>
                  <span>{students.length}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="quizzes-tab">
            {quizzes.length > 0 ? (
              <>
                <div className="quiz-actions">
                  <Link to={`/quiz/${id}`} className="btn btn-primary">
                    Take Quiz
                  </Link>
                </div>
                
                <div className="quiz-list">
                  {quizzes.map((quiz, index) => (
                    <div key={quiz.id} className="quiz-item">
                      <h4>Question {index + 1}</h4>
                      <p>{quiz.question}</p>
                      <div className="quiz-options">
                        <span>A) {quiz.optionA}</span>
                        <span>B) {quiz.optionB}</span>
                        <span>C) {quiz.optionC}</span>
                        <span>D) {quiz.optionD}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h3>No quizzes available</h3>
                <p>Quizzes will appear here once they are added</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && isAdmin() && (
          <div className="students-tab">
            {students.length > 0 ? (
              <div className="students-list">
                {students.map(student => (
                  <div key={student.id} className="student-item">
                    <div className="student-info">
                      <h4>{student.name}</h4>
                      <p>{student.email}</p>
                    </div>
                    <div className="student-progress">
                      <span>Progress: {student.progress || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No students enrolled</h3>
                <p>Students will appear here once they enroll</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;