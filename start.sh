#!/bin/bash

# MBTI Test Application - Local Development Startup Script
# This script checks dependencies, installs packages, and starts the dev server

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  MBTI Test Application - Local Startup${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_header

# Check if Node.js is installed
print_info "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required (current: $(node -v))"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check if npm is installed
print_info "Checking npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi
print_success "npm $(npm -v) detected"

# Check if running in correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found!"
    print_info "Please run this script from the project root directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_info "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    # Check if package-lock.json is newer than node_modules
    if [ "package-lock.json" -nt "node_modules" ]; then
        print_info "Dependencies have been updated. Reinstalling..."
        npm install
        print_success "Dependencies updated"
    else
        print_success "Dependencies already installed"
    fi
fi

echo ""

# Run TypeScript type check
print_info "Running TypeScript type check..."
npm run build
if [ $? -eq 0 ]; then
    print_success "TypeScript compilation passed"
    # Clean up build output
    rm -rf dist
else
    print_error "TypeScript compilation failed!"
    print_info "Please fix the TypeScript errors before starting"
    exit 1
fi

echo ""

# Check if port 5173 is available
print_info "Checking if port 5173 is available..."
if netstat -an 2>/dev/null | grep ":5173" | grep -q LISTEN; then
    print_warning "Port 5173 is already in use!"
    print_info "Another process may be running on this port."
    echo ""
    read -p "Do you want to try to stop it and continue? (y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Attempting to stop existing process..."
        # Try to find and kill the process
        pkill -f "vite.*5173" 2>/dev/null || true
        sleep 2
    else
        print_error "Cannot start dev server. Port 5173 is in use."
        exit 1
    fi
fi
print_success "Port 5173 is available"

echo ""

# Start development server
print_info "Starting development server..."
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Development server will start at:${NC}"
echo -e "${BLUE}  http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}  Press Ctrl+C to stop the server${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""

# Start the dev server
npm run dev
