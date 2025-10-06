# Development Guide

## 🛠️ Development Setup

### Quick Start
```bash
# Make the startup script executable (if not already)
chmod +x start-app.sh

# Start both backend and frontend
./start-app.sh
```

### Development URLs
- **Frontend**: http://localhost:8081
- **Backend API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

### Database Access
- **URL**: `jdbc:h2:mem:lmsdb`
- **Username**: `sa`
- **Password**: `password`

## 🔧 Development Commands

### Backend (Spring Boot)
```bash
cd springapp

# Clean and compile
mvn clean compile

# Run tests
mvn test

# Start application
mvn spring-boot:run

# Package JAR
mvn clean package
```

### Frontend (React)
```bash
cd reactapp

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📁 Project Structure

```
workspace/
├── springapp/                 # Backend (Spring Boot)
│   ├── src/main/java/com/lms/
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # Data repositories
│   │   ├── controller/       # REST controllers
│   │   ├── config/           # Configuration classes
│   │   ├── security/         # Security utilities
│   │   └── LmsApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── reactapp/                 # Frontend (React)
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/           # Page components
    │   ├── context/         # React contexts
    │   ├── App.js           # Main app component
    │   └── App.css          # Global styles
    ├── public/
    └── package.json
```

## 🎯 Key Features Implemented

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin/Student)
- ✅ Protected routes
- ✅ Secure password encryption

### Admin Features
- ✅ Create and manage courses
- ✅ Add quiz questions
- ✅ View enrolled students
- ✅ Dashboard with statistics

### Student Features
- ✅ Browse and enroll in courses
- ✅ Take quizzes with timer
- ✅ View course details
- ✅ Personal dashboard

### Technical Features
- ✅ Responsive design
- ✅ Professional UI/UX
- ✅ Pagination
- ✅ Search functionality
- ✅ Real-time quiz timer
- ✅ RESTful API architecture

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Courses
- `GET /api/courses` - Get all courses (with pagination & search)
- `POST /api/courses` - Create new course (Admin only)
- `GET /api/courses/{id}` - Get course details
- `PUT /api/courses/{id}` - Update course (Admin only)
- `DELETE /api/courses/{id}` - Delete course (Admin only)

### Enrollment
- `POST /api/courses/{courseId}/enroll/{userId}` - Enroll student
- `GET /api/courses/{id}/students` - Get enrolled students
- `DELETE /api/courses/{courseId}/students/{userId}` - Remove student

### Quizzes
- `GET /api/courses/{courseId}/quiz` - Get course quizzes
- `POST /api/courses/{courseId}/quiz` - Create quiz (Admin only)
- `GET /api/quiz/{courseId}/attempt` - Get quiz for attempt
- `POST /api/quiz/attempt` - Submit quiz answers

## 🎨 UI Components

### Pages
- **Login/Signup**: Authentication pages with demo accounts
- **Dashboard**: Role-based dashboard with statistics
- **Courses**: Course listing with search and pagination
- **Course Details**: Detailed course view with tabs
- **Add Course**: Course creation form (Admin only)
- **Add Quiz**: Quiz question creation (Admin only)
- **Quiz Attempt**: Interactive quiz taking with timer

### Components
- **Navbar**: Navigation with role-based menu items
- **ProtectedRoute**: Route protection based on authentication
- **Toast**: Notification system for user feedback
- **AuthContext**: Global authentication state management

## 🚀 Deployment

### Production Build
```bash
# Backend
cd springapp
mvn clean package
java -jar target/lms-backend-1.0.0.jar

# Frontend
cd reactapp
npm run build
# Serve the build folder using any static file server
```

### Environment Variables
Create `.env` file in reactapp directory:
```
REACT_APP_API_URL=http://localhost:8080
```

## 🧪 Testing

### Demo Accounts
- **Admin**: admin@demo.com / admin123
- **Student**: student@demo.com / student123

### Sample Data
The application automatically creates:
- 8 sample courses
- 4 sample quiz questions
- Demo user accounts

## 📝 Development Notes

### Code Style
- Backend: Java with Spring Boot conventions
- Frontend: React with functional components and hooks
- CSS: Custom styles with professional design
- Database: H2 in-memory (development), MySQL ready (production)

### Security
- JWT tokens with 24-hour expiration
- Password encryption using BCrypt
- CORS configuration for cross-origin requests
- Role-based access control on all endpoints

### Performance
- Pagination for large datasets
- Lazy loading of components
- Optimized database queries
- Responsive design for all devices