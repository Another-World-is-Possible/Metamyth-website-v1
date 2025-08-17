#!/usr/bin/env node

// Production deployment script that ensures the server runs from the correct directory
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const currentDir = process.cwd();
const distDir = path.join(currentDir, 'dist');
const publicDir = path.join(distDir, 'public');
const serverFile = path.join(distDir, 'index.js');

console.log('🚀 Starting production deployment...');

// Validate build artifacts
const requiredFiles = [
  { path: distDir, name: 'dist directory' },
  { path: publicDir, name: 'public directory' },
  { path: serverFile, name: 'server file' },
  { path: path.join(publicDir, 'index.html'), name: 'index.html' }
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file.path)) {
    console.error(`❌ Missing ${file.name}: ${file.path}`);
    console.error('Please run "npm run build" first');
    process.exit(1);
  }
}

console.log('✅ All build artifacts found');
console.log(`📁 Serving static files from: ${publicDir}`);
console.log(`🖥️  Running server from: ${distDir}`);

// Change to dist directory and start the server
process.chdir(distDir);
console.log(`📂 Changed working directory to: ${process.cwd()}`);

const port = process.env.PORT || '5000';
console.log(`🌐 Starting server on port ${port}...`);

// Start the production server
const server = spawn('node', ['index.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: port
  },
  stdio: 'inherit',
  cwd: distDir
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`🛑 Server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGTERM');
});