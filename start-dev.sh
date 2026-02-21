#!/bin/bash

echo "========================================"
echo "  Starting Glowiva Development Server"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js detected!"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Start Backend
echo "Starting Backend Server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start Frontend
echo "Starting Frontend Development Server..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Both servers are running!"
echo "  Backend:  http://localhost:5000"
echo "  Frontend: http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user to stop
wait
