import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import "../styles/ProgressTracker.css";

export default function ProgressTracker() {
  const { id } = useParams();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    api.fetchCourses().then((courses) => {
      const course = courses.find((c) => String(c.id) === String(id));
      if (course?.progress?.john_doe) {
        setProgress(course.progress.john_doe);
      }
    });
  }, [id]);

  const handleUpdate = async () => {
    await api.updateProgress(id, "john_doe", progress);
    alert("Progress updated");
  };

  return (
    <div className="progress-container">
      <h2 className="progress-title">Progress Tracker</h2>
      <input
        type="number"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="progress-input"
      />
      <button onClick={handleUpdate} className="progress-button">
        Update Progress
      </button>
    </div>
  );
}

