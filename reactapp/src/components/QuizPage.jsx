import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import "../styles/QuizPage.css";

export default function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const q = await api.getQuiz(id);
        setQuestions(q);
        setAnswers(Array(q.length).fill(""));
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (i, val) => {
    const newAnswers = [...answers];
    newAnswers[i] = val;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q, i) => {
      const [, correct] = q.split("*");
      if (answers[i].trim().toLowerCase() === correct.trim().toLowerCase()) {
        score++;
      }
    });
    await api.submitQuiz(id, answers);
    alert(`You scored ${score}/${questions.length}`);
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz</h2>
      {questions.length === 0 && <p>No quiz questions available.</p>}
      {questions.map((q, i) => {
        const [questionText] = q.split("*");
        return (
          <div key={i} className="quiz-item">
            <p className="quiz-question">{questionText}</p>
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="quiz-input"
            />
          </div>
        );
      })}
      {questions.length > 0 && (
        <button onClick={handleSubmit} className="quiz-button">
          Submit Quiz
        </button>
      )}
    </div>
  );
}

