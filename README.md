# Learning Management System (LMS)

A full-stack Learning Management System (LMS) developed to simplify course management and enhance the learning experience for students and administrators. The application provides secure authentication, role-based access, course management, quizzes, and a user-friendly dashboard.

## Features

### Authentication
- User Registration
- Secure Login using JWT Authentication
- Role-Based Access Control (Admin & Student)

### Admin Module
- Add, update, and delete courses
- Manage student information
- Create and manage quizzes
- View course details

### Student Module
- Browse available courses
- Enroll in courses
- Access course information
- Attempt quizzes
- View dashboard

### General Features
- Responsive user interface
- RESTful APIs
- Pagination support
- API documentation using Swagger
- Secure backend architecture

---

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST API

### Database
- MySQL

### Tools
- Maven
- Git
- GitHub
- Swagger UI
- Postman

---

## Project Structure

```
Learning-Management-System
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── security/
│   └── application.properties
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/learning-management-system.git
```

### Backend Setup

1. Open the backend project in your IDE.
2. Configure the MySQL database in `application.properties`.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the Spring Boot application.

---

### Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## API Documentation

Swagger UI is available after starting the backend.

```
http://localhost:8080/swagger-ui/index.html
```

---

## Future Enhancements

- Video lectures
- Assignment submission
- Certificate generation
- Email notifications
- Discussion forum
- Progress tracking
- Course search and filtering


GitHub: https://github.com/priyasundar240

---
