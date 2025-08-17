#!/bin/bash

# Production startup script
echo "Starting production server..."

# Ensure we're in the project root
cd "$(dirname "$0")"

# Check if dist directory exists and contains the required files
if [ ! -f "dist/index.js" ]; then
    echo "Error: dist/index.js not found. Please run 'npm run build' first."
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "Error: dist/public directory not found. Please run 'npm run build' first."
    exit 1
fi

# Change to dist directory and start the server
echo "Running server from dist directory..."
cd dist
NODE_ENV=production node index.js