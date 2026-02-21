#!/bin/bash

echo "========================================"
echo "  Starting Glowiva Production Server"
echo "========================================"
echo ""

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Check if .env files exist
if [ ! -f backend/.env ]; then
    echo "ERROR: backend/.env file not found!"
    echo "Please create backend/.env file (see backend/.env.example)"
    exit 1
fi

if [ ! -f frontend/.env ]; then
    echo "ERROR: frontend/.env file not found!"
    echo "Please create frontend/.env file (see frontend/.env.example)"
    exit 1
fi

# Install dependencies
echo "Installing backend dependencies..."
cd backend
npm install --production

echo ""
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Build frontend
echo ""
echo "Building frontend..."
npm run build

# Start backend with PM2
echo ""
echo "Starting backend with PM2..."
cd ../backend
pm2 start server.js --name glowiva-api
pm2 save

echo ""
echo "========================================"
echo "  Production server started!"
echo "  Backend API: http://localhost:5000"
echo "  Frontend build: ./frontend/build"
echo "========================================"
echo ""
echo "Serve frontend build with your web server (Nginx/Apache)"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 status          - Check server status"
echo "  pm2 logs glowiva-api - View logs"
echo "  pm2 restart glowiva-api - Restart server"
echo "  pm2 stop glowiva-api - Stop server"
echo ""
