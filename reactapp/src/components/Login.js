import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isRegister ? 'http://localhost:8080/api/auth/register' : 'http://localhost:8080/api/auth/login';
    const body = isRegister ? { username, password, email } : { username, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        if (isRegister) {
          setIsRegister(false);
          setError('Registration successful! Please login.');
        } else {
          const data = await response.json();
          onLogin(data.token, data.username);
        }
      } else {
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isRegister ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>

        {error && (
          <div className={`alert ${error.includes('successful') ? 'alert-success' : 'alert-error'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {isRegister && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d={isRegister ? "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" : "M10,17V14H3V10H10V7L15,12L10,17Z"} />
            </svg>
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
          
          <div className="form-footer">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="link-btn">
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;