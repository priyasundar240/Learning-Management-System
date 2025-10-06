import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { showToast } from '../components/Toast';

const AttemptQuiz = () => {
  const { courseId } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  useEffect(() => {
    if (timeLeft > 0 && !result) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !result) {
      handleSubmit();
    }
  }, [timeLeft, result]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`/api/quiz/${courseId}/attempt`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      showToast('Failed to load quiz', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (quizId, answer) => {
    setAnswers({
      ...answers,
      [quizId]: answer
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    const formattedAnswers = Object.entries(answers).map(([quizId, selectedAnswer]) => ({
      quizId,
      selectedAnswer
    }));

    try {
      const response = await axios.post('/api/quiz/attempt', {
        courseId,
        userId: user.id,
        answers: formattedAnswers
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setResult(response.data);
      showToast('Quiz submitted successfully!', 'success');
    } catch (error) {
      showToast('Failed to submit quiz', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (quizzes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No quiz available</h3>
        <p>This course doesn't have any quiz questions yet.</p>
        <button onClick={() => navigate('/courses')} className="btn btn-primary">
          Back to Courses
        </button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="quiz-result">
        <div className="result-card">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score">{result.score}%</div>
            <p>{result.correctAnswers} out of {result.totalQuestions} correct</p>
          </div>
          
          <div className="result-actions">
            <button 
              onClick={() => navigate('/courses')} 
              className="btn btn-primary"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-attempt">
      <div className="quiz-header">
        <h1>Quiz Attempt</h1>
        <div className="timer">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(Object.keys(answers).length / quizzes.length) * 100}%` }}
          />
        </div>
        <span>{Object.keys(answers).length} of {quizzes.length} answered</span>
      </div>

      <div className="quiz-questions">
        {quizzes.map((quiz, index) => (
          <div key={quiz.id} className="question-card">
            <h3>Question {index + 1}</h3>
            <p className="question-text">{quiz.question}</p>
            
            <div className="options">
              {['A', 'B', 'C', 'D'].map(option => (
                <label key={option} className="option">
                  <input
                    type="radio"
                    name={`question-${quiz.id}`}
                    value={option}
                    checked={answers[quiz.id] === option}
                    onChange={() => handleAnswerChange(quiz.id, option)}
                  />
                  <span className="option-text">
                    {option}) {quiz[`option${option}`]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="quiz-actions">
        <button 
          onClick={() => navigate('/courses')} 
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length === 0}
          className="btn btn-primary"
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
};

export default AttemptQuiz;