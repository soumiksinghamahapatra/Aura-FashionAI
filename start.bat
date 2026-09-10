@echo off
title Aura - AI Personal Stylist
echo ========================================================
echo         Aura - AI Personal Stylist Server
echo ========================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Install dependencies if node_modules is missing
if not exist node_modules (
    echo [1/2] Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

echo [2/2] Launching server on http://localhost:3000 ...
echo Press Ctrl+C anytime to stop the server.
echo.

:: Open browser
start "" http://localhost:3000

:: Run the server
npm start
