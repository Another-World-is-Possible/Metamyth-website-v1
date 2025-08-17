#!/bin/bash

# Build script for production deployment
echo "Building client and server for production..."

# Build the client and server
npm run build

echo "Production build completed successfully!"
echo "Built server: dist/index.js"
echo "Built client: dist/public/"
echo ""
echo "To run in production mode:"
echo "cd dist && NODE_ENV=production node index.js"