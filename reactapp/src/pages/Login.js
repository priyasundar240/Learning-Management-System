import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../components/Login.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', formData);
      const response = await axios.post('/api/auth/login', formData);
      console.log('Login response:', response.data);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>LMS Lite</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>

        <div className="demo-accounts">
          <h3>Demo Accounts</h3>
          <div className="demo-account">
            <strong>Admin:</strong> admin@demo.com / admin123
          </div>
          <div className="demo-account">
            <strong>Student:</strong> student@demo.com / student123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;