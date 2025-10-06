#!/bin/bash

echo "🚀 Starting LMS Lite Application..."

# Kill existing processes on ports
echo "🧹 Cleaning up existing processes..."
fuser -k 8080/tcp 2>/dev/null || echo "Port 8080 is free"
fuser -k 8081/tcp 2>/dev/null || echo "Port 8081 is free"
pkill -f "java.*LmsApplication" 2>/dev/null || echo "No Java LMS processes found"
pkill -f "react-scripts" 2>/dev/null || echo "No React processes found"

sleep 3

# Start backend
echo "📦 Starting Spring Boot Backend..."
cd springapp
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Start frontend
echo "🎨 Starting React Frontend..."
cd ../reactapp
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

sleep 10

echo ""
echo "✅ LMS Lite is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:8081"
echo "🔧 Backend API: http://localhost:8080"
echo "🗄️  H2 Database Console: http://localhost:8080/h2-console"
echo ""
echo "📋 Demo Accounts:"
echo "   Admin: admin@demo.com / admin123"
echo "   Student: student@demo.com / student123"
echo ""
echo "📝 Logs:"
echo "   Backend: workspace/backend.log"
echo "   Frontend: workspace/frontend.log"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user input to stop
trap 'echo "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait