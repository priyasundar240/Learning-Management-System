package com.lms.controller;

import com.lms.entity.Course;
import com.lms.entity.Enrollment;
import com.lms.entity.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<Course>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Course> courses;
        
        if (search.isEmpty()) {
            courses = courseRepository.findAll(pageable);
        } else {
            courses = courseRepository.findByTitleContainingOrDescriptionContaining(search, pageable);
        }
        
        return ResponseEntity.ok(courses);
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course savedCourse = courseRepository.save(course);
            return ResponseEntity.ok(savedCourse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to create course: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        return courseRepository.findById(id)
                .map(existingCourse -> {
                    existingCourse.setTitle(course.getTitle());
                    existingCourse.setDescription(course.getDescription());
                    return ResponseEntity.ok(courseRepository.save(existingCourse));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        courseRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }

    @PostMapping("/{courseId}/enroll/{userId}")
    public ResponseEntity<?> enrollStudent(@PathVariable Long courseId, @PathVariable Long userId, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"STUDENT".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        if (enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student already enrolled"));
        }
        
        Enrollment enrollment = new Enrollment(userId, courseId);
        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok(Map.of("message", "Student enrolled successfully"));
    }

    @GetMapping("/{id}/students")
    public ResponseEntity<?> getCourseStudents(@PathVariable Long id, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(id);
        List<Map<String, Object>> students = enrollments.stream()
                .map(enrollment -> {
                    User user = userRepository.findById(enrollment.getUserId()).orElse(null);
                    Map<String, Object> studentMap = new java.util.HashMap<>();
                    studentMap.put("id", user.getId());
                    studentMap.put("name", user.getName());
                    studentMap.put("email", user.getEmail());
                    studentMap.put("progress", enrollment.getProgress());
                    return studentMap;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(students);
    }

    @DeleteMapping("/{courseId}/students/{userId}")
    public ResponseEntity<?> removeStudent(@PathVariable Long courseId, @PathVariable Long userId, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        
        enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .ifPresent(enrollmentRepository::delete);
        
        return ResponseEntity.ok(Map.of("message", "Student removed successfully"));
    }
}