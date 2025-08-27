# Deployment Guide

This document explains how to deploy the Metamyth website in different configurations.

## Static Site Deployment (Recommended for GitHub Pages)

### Automatic Deployment via GitHub Actions
1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Site will be available at your custom domain (metamyth.quest)

### Manual Static Deployment
```bash
# Build the static site
npm run build

# The built files will be in dist/public/
# Upload these files to any static hosting service:
# - GitHub Pages
# - Netlify
# - Vercel
# - AWS S3 + CloudFront
# - Any web server
```

## Full-Stack Deployment (with Backend)

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Environment variables configured

### Build and Deploy
```bash
# Build both client and server
npm run build-for-server

# Set environment variables
export NODE_ENV=production
export DATABASE_URL=your_postgres_connection_string

# Start the server
npm start
```

### Environment Variables
Create a `.env` file for local development:
```
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/metamyth
```

## Form Handling for Static Deployment

Since the static deployment doesn't include a backend, form submissions (questionnaire) are handled client-side. For production use, consider integrating with:

- **Netlify Forms** - Built-in form handling for Netlify deployments
- **Formspree** - Third-party form handling service
- **EmailJS** - Send emails directly from client-side
- **Supabase** - Backend-as-a-Service with database and auth

## Custom Domain Setup

1. Add your domain to the `CNAME` file (already configured: metamyth.quest)
2. Configure DNS records to point to GitHub Pages
3. Enable HTTPS in GitHub Pages settings

## Performance Optimization

The build includes several optimizations:
- Asset compression and minification
- Image optimization
- Font loading optimization
- Code splitting (consider implementing for large bundles)

## Monitoring and Analytics

Consider adding:
- Google Analytics or similar
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals)

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm ci`
- Clear node_modules and reinstall if needed
- Check for TypeScript errors: `npm run check`

### Font Loading Issues
- Fonts are loaded from `/attached_assets/` directory
- Ensure font files are present and accessible
- Check browser console for 404 errors

### GitHub Pages Issues
- Verify GitHub Actions workflow is enabled
- Check Actions tab for build logs
- Ensure Pages is enabled in repository settings