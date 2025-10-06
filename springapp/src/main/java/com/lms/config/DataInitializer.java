package com.lms.config;

import com.lms.entity.Course;
import com.lms.entity.Quiz;
import com.lms.entity.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.QuizRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User("Admin User", "admin@demo.com", 
                                passwordEncoder.encode("admin123"), User.Role.ADMIN);
            userRepository.save(admin);

            // Create student user
            User student = new User("Student User", "student@demo.com", 
                                  passwordEncoder.encode("student123"), User.Role.STUDENT);
            userRepository.save(student);

            // Create sample courses
            Course course1 = new Course("Java Programming", "Learn Java from basics to advanced concepts including OOP, collections, and frameworks");
            Course course2 = new Course("React Development", "Build modern web applications with React, hooks, and state management");
            Course course3 = new Course("Spring Boot", "Master Spring Boot for backend development with REST APIs and databases");
            Course course4 = new Course("Python for Data Science", "Learn Python programming for data analysis, visualization, and machine learning");
            Course course5 = new Course("Web Design Fundamentals", "Master HTML, CSS, and responsive design principles for modern websites");
            Course course6 = new Course("Database Management", "Learn SQL, database design, and optimization techniques");
            Course course7 = new Course("Mobile App Development", "Build cross-platform mobile applications using modern frameworks");
            Course course8 = new Course("DevOps Essentials", "Learn CI/CD, containerization, and cloud deployment strategies");
            
            courseRepository.save(course1);
            courseRepository.save(course2);
            courseRepository.save(course3);
            courseRepository.save(course4);
            courseRepository.save(course5);
            courseRepository.save(course6);
            courseRepository.save(course7);
            courseRepository.save(course8);

            // Create sample quizzes
            Quiz quiz1 = new Quiz("What is Java?", "Programming Language", "Database", "Operating System", "Web Browser", "A", course1.getId());
            Quiz quiz2 = new Quiz("Which keyword is used for inheritance in Java?", "extends", "implements", "inherits", "super", "A", course1.getId());
            
            Quiz quiz3 = new Quiz("What is React?", "JavaScript Library", "Database", "Server", "CSS Framework", "A", course2.getId());
            Quiz quiz4 = new Quiz("What is JSX?", "JavaScript XML", "Java Syntax", "JSON Extension", "CSS Style", "A", course2.getId());

            quizRepository.save(quiz1);
            quizRepository.save(quiz2);
            quizRepository.save(quiz3);
            quizRepository.save(quiz4);
        }
    }
}