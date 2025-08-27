#!/bin/bash

# Build script for static site deployment (GitHub Pages)
echo "Building static site for GitHub Pages deployment..."

# Build the client only (static site)
npm run build

echo "Static site build completed successfully!"
echo "Built static site: dist/public/"
echo ""
echo "For server deployment, use: npm run build-for-server"
echo "For local development, use: npm run dev"