#!/usr/bin/env bash
set -e

echo "========================================================"
echo "        Aura - AI Personal Stylist Server"
echo "========================================================"
echo ""

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "[ERROR] Node.js is not installed or not found in PATH!"
    echo "Please install Node.js (v18+) from https://nodejs.org"
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install
fi

echo "[2/2] Launching server on http://localhost:3000 ..."
echo "Press Ctrl+C anytime to stop the server."
echo ""

# Open browser if supported
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open http://localhost:3000 &
elif command -v open >/dev/null 2>&1; then
    open http://localhost:3000 &
fi

# Start server
npm start
