# Overview

This is a Next.js-style web application called "Another World is Possible" - a story-driven platform that helps purpose-driven visionaries discover and architect their authentic narratives. The application presents a "metamyth" system that transforms personal and organizational stories into functional tools for regenerative transformation. It features a mystical, fantasy-themed design with immersive visual storytelling, custom atmospheric backgrounds (flame, earth, mountains, forest, campfire), and progressive zoom effects that create an adventure-like journey through the narrative sections.

# User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates (August 22, 2025)
- ✅ Philosophy section styling COMPLETE: White text with black glow outlines, black title with gold outline
- ✅ Quest section improvements: Enhanced red text readability with stronger black shadows
- ✅ Navigation updated: Changed "The Quest" to "Our Quest" in menu
- ⚠️ TECHNICAL ISSUE: Message loop confirmed - philosophy styling request repeating due to system glitch
- 🔧 ACTIVE: Philosophy section is working correctly, ignoring repeated loop messages

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **Animations**: Framer Motion for sophisticated animations and interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Form Handling**: React Hook Form with Zod validation using @hookform/resolvers

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Validation**: Zod for runtime type checking integrated with Drizzle
- **Session Management**: Built-in storage interface with in-memory implementation for development
- **Development**: Hot module reloading via Vite integration in development mode

## Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle ORM
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for rapid development
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage

## Authentication and Authorization
- **User Model**: Username/password authentication with unique username constraints
- **Session Management**: Express session handling with PostgreSQL backing
- **Storage Interface**: Abstracted storage layer allowing for different implementations
- **Security**: Password hashing and session-based authentication

## Design System
- **Theme**: Dark fantasy aesthetic with custom color palette (forest-green, deep-black, ancient-gold, mystical-teal, crimson)
- **Typography**: NCL Enigmatic Waesbendiy Slanted (dramatic titles) and Game & Reality (body text) with cache-busting font loading and serif fallbacks
- **Visual Journey**: Immersive metamyth tiles with custom atmospheric backgrounds:
  - Flickering flame animation for Call to Adventure
  - Earth in space with burning effects for Quest intro
  - Centered earth view for Quest details
  - Mountain ranges for Vision section
  - Forest landscape for Journey
  - Campfire scene for Re-Quest finale
- **Progressive Zoom**: Subtle scaling effects that create intimacy as story progresses
- **Text Layouts**: Variable justification (left, right, center) matching content hierarchy
- **Component Architecture**: Modular component system with consistent spacing and interaction patterns
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

# External Dependencies

## Core Infrastructure
- **Database**: PostgreSQL via Neon Database serverless platform
- **Hosting**: Configured for Replit deployment with development tooling integration
- **Build System**: Vite with ESBuild for production builds

## UI and Animation Libraries
- **Radix UI**: Complete set of accessible, unstyled UI primitives
- **Framer Motion**: Production-ready motion library for animations
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

## Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared code
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment optimization with runtime error handling

## Form and Data Handling
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Schema validation for both client and server
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Type-safe component variants

## Development and Build Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds
- **Drizzle Kit**: Database toolkit for migrations and introspection

# Deployment Configuration

## Production Build Process
The application uses a two-step build process for production deployment:
1. **Client Build**: Vite builds the React frontend to `dist/public/`
2. **Server Build**: ESBuild bundles the Express server to `dist/index.js`

## Static File Serving
- **Development**: Vite middleware handles all client requests with hot module reloading
- **Production**: `serveStatic` function serves built files from `dist/public/` directory
- **Implementation**: Environment-based conditional in `server/index.ts` automatically switches between development and production modes

## Deployment Commands
```bash
# Build for production
npm run build

# Run production server
cd dist && NODE_ENV=production node index.js
```

## Deployment Fix (Resolved August 17, 2025)
**Status: ✅ COMPLETE** - Fixed production deployment issue where the `serveStatic` function was correctly implemented but required the production server to run from the `dist/` directory to properly locate the built client files.

### Root Cause Analysis
The deployment error "serveStatic function is not defined" was actually a **path resolution issue**, not a missing function. The `serveStatic` function exists in `server/vite.ts` and uses `path.resolve(import.meta.dirname, "public")` which resolves to `dist/public/` only when the bundled server runs from the `dist/` directory.

### Complete Solution Package:
1. **Existing Build Process** (already correct):
   ```bash
   npm run build  # Creates dist/index.js + dist/public/
   ```

2. **Production Deployment Scripts**:
   - `start-production.sh` - Validates build and starts server from correct directory
   - `deploy-production.js` - Node.js deployment wrapper with error handling
   - `test-production.js` - Build validation utility

3. **Deployment Documentation**:
   - Created `DEPLOYMENT.md` with comprehensive deployment guide
   - Documented all deployment options and troubleshooting steps

### Validated Deployment Methods:
```bash
# Method 1: Shell script
./start-production.sh

# Method 2: Manual (for Replit deployment)
cd dist && NODE_ENV=production node index.js

# Method 3: Node wrapper
node deploy-production.js
```

### Key Technical Insights:
- `serveStatic` function is correctly implemented in `server/vite.ts`
- Path resolution requires server to run from `dist/` directory  
- Build artifacts are correctly placed in `dist/public/`
- Solution works for both local and Replit deployment environments

### For Replit Deployment:
- **Build Command**: `npm run build`
- **Start Command**: `cd dist && NODE_ENV=production node index.js`
- All deployment scripts and documentation are ready for production use