import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import "../styles/CourseList.css";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchCourses().then(setCourses);
  }, []);

  const handleEnroll = async (id) => {
    await api.enrollInCourse(id);
    alert("Enrolled successfully!");
  };

  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Courses</h2>
      <ul className="course-list">
        {courses.map((c) => (
          <li key={c.id} className="course-item">
            <h3 className="course-title">{c.title}</h3>
            <p className="course-description">{c.description}</p>
            <div className="course-buttons">
              <button onClick={() => handleEnroll(c.id)} className="btn enroll-btn">Enroll</button>
              <button onClick={() => navigate(`/progress/${c.id}`)} className="btn progress-btn">Progress</button>
              <button onClick={() => navigate(`/quiz/${c.id}`)} className="btn quiz-btn">Quiz</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


