#!/usr/bin/env bash
set -e

echo "========================================================"
echo "        Aura - AI Personal Stylist (MERN Stack)"
echo "========================================================"
echo ""

# 1. Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed or not found in PATH!"
    echo "Please install Node.js (v18+) from https://nodejs.org"
    exit 1
fi

# 2. Check root dependencies
if [ ! -d "node_modules" ]; then
    echo "[1/3] Installing root orchestrator dependencies..."
    npm install
fi

# 3. Check server dependencies
if [ ! -d "server/node_modules" ]; then
    echo "[2/3] Installing backend dependencies (server/)..."
    cd server && npm install && cd ..
fi

# 4. Check client dependencies
if [ ! -d "client/node_modules" ]; then
    echo "[3/3] Installing frontend dependencies (client/)..."
    cd client && npm install && cd ..
fi

echo ""
echo "Launching Aura Fullstack Development Servers..."
echo "- Backend API:  http://localhost:5000"
echo "- React Client: http://localhost:5173"
echo ""
echo "Press Ctrl+C anytime to stop both servers."
echo ""

# Open browser if supported
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://localhost:5173 &
elif command -v open >/dev/null 2>&1; then
    open http://localhost:5173 &
fi

# Start concurrently
npm run dev
