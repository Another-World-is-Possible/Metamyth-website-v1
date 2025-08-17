# Overview

This is a Next.js-style web application called "Another World is Possible" - a story-driven platform that helps purpose-driven visionaries discover and architect their authentic narratives. The application presents a "metamyth" system that transforms personal and organizational stories into functional tools for regenerative transformation. It features a mystical, fantasy-themed design with sections covering their methodology, quest timeline, stories, systems, and federation building approach.

# User Preferences

Preferred communication style: Simple, everyday language.

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
- **Typography**: Custom font stack including Cinzel (serif) and Inter (sans-serif)
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
Fixed production deployment issue where the `serveStatic` function was correctly implemented but required the production server to run from the `dist/` directory to properly locate the built client files. The function expects static files at `{import.meta.dirname}/public` which resolves to `dist/public/` when running the bundled server from the dist directory.

### Solution Implementation:
1. **Root Cause**: The deployment error "serveStatic function is not defined" occurred because the production server needs to run from the `dist/` directory, not the project root
2. **Build Process**: The existing build process (`npm run build`) correctly:
   - Builds client files to `dist/public/` via Vite
   - Bundles server to `dist/index.js` via ESBuild
3. **Production Startup**: Created `start-production.sh` script that:
   - Changes to the `dist/` directory before starting the server
   - Runs `NODE_ENV=production node index.js` from the correct location
   - Validates that required build artifacts exist before starting

### Deployment Commands:
```bash
# Build for production
npm run build

# Start production server (using the correct directory)
./start-production.sh
# OR manually:
cd dist && NODE_ENV=production node index.js
```

### Technical Details:
- The `serveStatic` function in `server/vite.ts` uses `path.resolve(import.meta.dirname, "public")` 
- When the bundled server runs from `dist/`, this resolves to `dist/public/` correctly
- Running from project root would incorrectly resolve to `server/public/`