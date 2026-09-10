@echo off
title Aura - AI Personal Stylist (MERN Stack)
echo ========================================================
echo         Aura - AI Personal Stylist (MERN Stack)
echo ========================================================
echo.

:: 1. Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 2. Check root dependencies
if not exist node_modules (
    echo [1/3] Installing root orchestrator dependencies...
    call npm install
)

:: 3. Check server dependencies
if not exist server\node_modules (
    echo [2/3] Installing backend dependencies (server/)...
    cd server
    call npm install
    cd ..
)

:: 4. Check client dependencies
if not exist client\node_modules (
    echo [3/3] Installing frontend dependencies (client/)...
    cd client
    call npm install
    cd ..
)

echo.
echo Launching Aura Fullstack Development Servers...
echo - Backend API:  http://localhost:5000
echo - React Client: http://localhost:5173
echo.
echo Press Ctrl+C anytime to stop both servers.
echo.

:: Open browser
start "" http://localhost:5173

:: Start concurrently
npm run dev
