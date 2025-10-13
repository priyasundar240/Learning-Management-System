// Place this in src/api.js
const BASE = "http://localhost:8080/api/courses"; // Adjust as per deployment

export async function fetchCourses() {
  const r = await fetch(BASE);
  return r.json();
}

export async function addCourse(course) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return r.json();
}

export async function enrollInCourse(id, student="john_doe") {
  const r = await fetch(`${BASE}/${id}/enroll?student=${student}`, { method: "PUT" });
  return r.json();
}

export async function updateProgress(id, student, progress) {
  const r = await fetch(`${BASE}/${id}/progress?student=${student}&progress=${progress}`, { method: "PUT" });
  return r.json();
}

export async function getQuiz(id) {
  const r = await fetch(`${BASE}/${id}/quiz`);
  return r.json();
}

export async function submitQuiz(id, student, score) {
  const r = await fetch(`${BASE}/${id}/quiz?student=${student}&score=${score}`, { method: "POST" });
  return r.text();
}
