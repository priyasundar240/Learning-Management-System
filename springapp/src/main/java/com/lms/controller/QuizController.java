package com.lms.controller;

import com.lms.entity.Quiz;
import com.lms.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @GetMapping("/courses/{courseId}/quiz")
    public ResponseEntity<List<Quiz>> getCourseQuizzes(@PathVariable Long courseId) {
        List<Quiz> quizzes = quizRepository.findByCourseId(courseId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/courses/{courseId}/quiz")
    public ResponseEntity<?> createQuiz(@PathVariable Long courseId, @RequestBody Quiz quiz, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        quiz.setCourseId(courseId);
        Quiz savedQuiz = quizRepository.save(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    @GetMapping("/quiz/{courseId}/attempt")
    public ResponseEntity<?> getQuizForAttempt(@PathVariable Long courseId, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"STUDENT".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        List<Quiz> quizzes = quizRepository.findByCourseId(courseId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/quiz/attempt")
    public ResponseEntity<?> submitQuizAttempt(@RequestBody Map<String, Object> attempt, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"STUDENT".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        Long courseId = Long.valueOf(attempt.get("courseId").toString());
        @SuppressWarnings("unchecked")
        List<Map<String, String>> answers = (List<Map<String, String>>) attempt.get("answers");
        
        List<Quiz> quizzes = quizRepository.findByCourseId(courseId);
        int totalQuestions = quizzes.size();
        int correctAnswers = 0;
        
        for (Map<String, String> answer : answers) {
            Long quizId = Long.valueOf(answer.get("quizId"));
            String selectedAnswer = answer.get("selectedAnswer");
            
            Quiz quiz = quizRepository.findById(quizId).orElse(null);
            if (quiz != null && quiz.getCorrectAnswer().equals(selectedAnswer)) {
                correctAnswers++;
            }
        }
        
        int score = (int) ((double) correctAnswers / totalQuestions * 100);
        
        return ResponseEntity.ok(Map.of(
            "score", score,
            "correctAnswers", correctAnswers,
            "totalQuestions", totalQuestions,
            "message", "Quiz submitted successfully"
        ));
    }
}