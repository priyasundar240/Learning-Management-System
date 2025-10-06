import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import AddQuiz from './pages/AddQuiz';
import CourseDetails from './pages/CourseDetails';
import AttemptQuiz from './pages/AttemptQuiz';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Toast />
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />
            
            <Route path="/courses/:id" element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            } />
            
            <Route path="/add-course" element={
              <ProtectedRoute adminOnly={true}>
                <AddCourse />
              </ProtectedRoute>
            } />
            
            <Route path="/add-quiz" element={
              <ProtectedRoute adminOnly={true}>
                <AddQuiz />
              </ProtectedRoute>
            } />
            
            <Route path="/quiz/:courseId" element={
              <ProtectedRoute>
                <AttemptQuiz />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;