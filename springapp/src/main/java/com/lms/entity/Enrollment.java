package com.lms.entity;

import javax.persistence.*;

@Entity
@Table(name = "enrollments")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "course_id", nullable = false)
    private Long courseId;
    
    @Column(nullable = false)
    private Integer progress = 0;
    
    public Enrollment() {}
    
    public Enrollment(Long userId, Long courseId) {
        this.userId = userId;
        this.courseId = courseId;
        this.progress = 0;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
}