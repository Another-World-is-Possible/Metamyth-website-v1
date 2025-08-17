# Production Deployment Guide

## Issue Resolution

The deployment error "serveStatic function is not defined" was caused by incorrect path resolution in production. The `serveStatic` function exists in `server/vite.ts` but expects static files at a specific path relative to the running server.

## Root Cause

When the server is bundled to `dist/index.js`, the `serveStatic` function uses:
```javascript
path.resolve(import.meta.dirname, "public")
```

This resolves correctly to `dist/public/` **only when** the server runs from the `dist/` directory.

## Solution

### Build Process (Already Correct)
```bash
npm run build
```
This creates:
- `dist/index.js` (bundled server)  
- `dist/public/` (built client files)
- `dist/public/index.html`
- `dist/public/assets/` (CSS, JS, fonts)

### Production Startup (Fixed)

**Option 1: Use the production script**
```bash
./start-production.sh
```

**Option 2: Manual startup**
```bash
cd dist
NODE_ENV=production node index.js
```

**Option 3: Use deployment wrapper**
```bash
node deploy-production.js
```

### For Replit Deployment

When deploying on Replit, ensure the deployment configuration:

1. **Build Command**: `npm run build`
2. **Start Command**: `cd dist && NODE_ENV=production node index.js`
3. **Working Directory**: The start command must change to the `dist/` directory

### Verification

Test that the deployment works:
```bash
# Build the project
npm run build

# Test production server
node test-production.js

# Start production server  
PORT=3000 node deploy-production.js
```

## Technical Details

- **Development**: Vite middleware serves files directly with HMR
- **Production**: `serveStatic` function serves pre-built files from `dist/public/`
- **Path Resolution**: `import.meta.dirname` resolves relative to the running script location
- **Critical**: Server must run from `dist/` directory for paths to resolve correctly

## Files Structure
```
project/
├── server/vite.ts          # Contains serveStatic function
├── server/index.ts         # Main server entry point
├── dist/
│   ├── index.js           # Bundled server (must run from here)
│   └── public/            # Built client files
│       ├── index.html
│       └── assets/
├── start-production.sh     # Production startup script
└── deploy-production.js    # Deployment wrapper
```

## Status: ✅ RESOLVED

The serveStatic function is properly implemented and functional. The deployment issue is resolved by ensuring the production server runs from the correct directory.