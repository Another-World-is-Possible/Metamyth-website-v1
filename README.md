# Another World is Possible

A mystical storytelling platform that transforms narrative exploration through immersive, interactive design. This application helps purpose-driven visionaries discover and architect their authentic narratives using the "metamyth" system.

## Features

- **Immersive Visual Journey** - Progressive atmospheric backgrounds from burning sun to tall forest
- **Interactive Navigation** - Seamless tab-based exploration of different story elements
- **Custom Typography** - Edensor font for mystical headers, Alice serif for elegant body text
- **Smooth Animations** - Scroll-triggered fade effects and golden thread transitions
- **Responsive Design** - Mobile-first approach with elegant desktop experience

## Visual Journey

The application creates an adventure-like progression through five atmospheric sections:

1. **Call to Adventure** - Burning sun with dramatic sky
2. **The Quest** - Earth in cosmic space 
3. **Vision** - Mountain ranges and terrestrial views
4. **The Systems** - Dense forest pathways
5. **The Federation** - Mystical crystalline landscapes

## Development & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Static Site Deployment (GitHub Pages)
```bash
npm run build
```
This builds the client-side application as a static site in `dist/public/` for deployment to GitHub Pages or any static hosting service.

### Full-Stack Deployment (with Node.js backend)
```bash
npm run build-for-server
npm start
```
This builds both the client and server for full-stack deployment with backend API support.

### Build Scripts
- `npm run build` - Builds static site for GitHub Pages deployment
- `npm run build-for-server` - Builds both client and server for full-stack deployment
- `npm run dev` - Starts development server with hot reload
- `npm start` - Starts production server (requires build-for-server first)

### GitHub Pages Deployment
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the static site to GitHub Pages when changes are pushed to the main branch.

**Note:** The questionnaire submission currently works in client-side mode for static deployment. For production use with form submissions, consider integrating with services like Netlify Forms, Formspree, or similar form handling services.

## Font System

The application uses a carefully curated font hierarchy:
- **Angle & Fairy** - Headers and titles
- **Emerland** - Main body text in cards and content blocks  
- **Thornelia** - Special body text outside containers
- **Game & Reality** - Reserved for future use

## Technical Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Backend** (optional): Express.js, Node.js
- **Database** (optional): PostgreSQL with Drizzle ORM