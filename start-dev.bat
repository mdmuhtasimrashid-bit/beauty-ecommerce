@echo off
echo ========================================
echo   Starting Glowiva Development Server
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js detected!
echo.

REM Start Backend
echo Starting Backend Server...
start cmd /k "cd backend && npm install && echo Starting backend on port 5000... && npm run dev"

REM Wait a bit for backend to start
timeout /t 5 /nobreak

REM Start Frontend
echo Starting Frontend Development Server...
start cmd /k "cd frontend && npm install && echo Starting frontend on port 3000... && npm start"

echo.
echo ========================================
echo   Both servers are starting!
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
echo (Backend and Frontend will continue running)
pause >nul
