package com.lms.repository;

import com.lms.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    @Query("SELECT c FROM Course c WHERE c.title LIKE %:search% OR c.description LIKE %:search%")
    Page<Course> findByTitleContainingOrDescriptionContaining(@Param("search") String search, Pageable pageable);
}