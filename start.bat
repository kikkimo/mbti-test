@echo off
setlocal enabledelayedexpansion

REM MBTI Test Application - Local Development Startup Script for Windows
REM This script checks dependencies, installs packages, and starts the dev server

echo ========================================
echo   MBTI Test Application - Local Startup
echo ========================================
echo.

REM Check if Node.js is installed
echo [INFO] Checking Node.js installation...
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node -v') do set NODE_MAJOR=%%a
if !NODE_MAJOR! GEQ 18 (
    echo [SUCCESS] Node.js is installed
) else (
    echo [ERROR] Node.js version 18+ is required!
    node -v
    pause
    exit /b 1
)

REM Check if npm is installed
echo [INFO] Checking npm...
where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)
echo [SUCCESS] npm is installed

REM Check if in correct directory
if not exist "package.json" (
    echo [ERROR] package.json not found!
    echo [INFO] Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully
) else (
    echo [SUCCESS] Dependencies already installed
)

echo.

REM Run TypeScript type check
echo [INFO] Running TypeScript type check...
call npm run build
if errorlevel 1 (
    echo [ERROR] TypeScript compilation failed!
    echo [INFO] Please fix the TypeScript errors before starting
    pause
    exit /b 1
)
echo [SUCCESS] TypeScript compilation passed

REM Clean up build output
if exist "dist\" rmdir /s /q dist

echo.

REM Run unit tests
echo [INFO] Running unit tests...
call npm run test >nul 2>nul
if errorlevel 1 (
    echo [WARNING] Some unit tests failed, but continuing...
) else (
    echo [SUCCESS] All unit tests passed
)

echo.

REM Start development server
echo [INFO] Starting development server...
echo.
echo ===================================================
echo   Development server will start at:
echo   http://localhost:5173
echo.
echo   Press Ctrl+C to stop the server
echo ===================================================
echo.

call npm run dev
