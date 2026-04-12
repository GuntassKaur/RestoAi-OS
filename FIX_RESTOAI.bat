@echo off
title RestoAI OS - Neural Repair System
echo ==========================================
echo    RESTOAI OS: AUTOMATED REPAIR TOOL
echo ==========================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install Node.js first.
    pause
    exit
)

:: Check for Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed! Please install Python first.
    pause
    exit
)

echo [1/4] Synchronizing Backend Neural Core...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
python -m pip install -r requirements.txt
echo Seeding Operational Database...
python seed.py
start cmd /k "title RestoAI BACKEND && color 0b && echo RESTOAI BACKEND RUNNING ON PORT 8000 && venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000"

echo [2/4] Initializing Frontend Neural Interface...
cd ../frontend
echo Installing UI dependencies...
call npm.cmd install
start cmd /k "title RestoAI FRONTEND && color 0a && echo RESTOAI FRONTEND RUNNING ON http://localhost:3000 && npm.cmd run dev"

echo.
echo ==========================================
echo SUCCESS: BOTH SYSTEMS ARE STARTING!
echo ==========================================
echo 1. Backend: http://127.0.0.1:8000
echo 2. Frontend: http://localhost:3000
echo.
echo Please wait 30 seconds for the UI to compile,
echo then visit http://localhost:3000 in your browser.
echo ==========================================
pause
