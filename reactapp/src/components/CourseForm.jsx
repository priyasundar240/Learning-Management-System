import React, { useState } from "react";
import * as api from "../api";
import "../styles/CourseForm.css"; 

export default function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quiz, setQuiz] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addCourse({ title, description, quiz });
    alert("Course added!");
    setTitle("");
    setDescription("");
    setQuiz("");
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="course-input"
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="course-input"
      />
      <input
        placeholder="Quiz questions (question*answer)"
        value={quiz}
        onChange={(e) => setQuiz(e.target.value)}
        className="course-input"
      />
      <button type="submit" className="course-button">Add</button>
    </form>
  );
}

