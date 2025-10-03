# Overview

This is a Next.js-style web application called "Another World is Possible" - a story-driven platform that helps purpose-driven visionaries discover and architect their authentic narratives. The application presents a "metamyth" system that transforms personal and organizational stories into functional tools for regenerative transformation. It features a mystical, fantasy-themed design with immersive visual storytelling, custom atmospheric backgrounds (flame, earth, mountains, forest, campfire), and progressive zoom effects that create an adventure-like journey through the narrative sections.

# User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates (October 3, 2025)
- ✅ **Email Verification System Complete**: Comprehensive email verification with auto-upgrade to cloud sync
  - Detection: Checks `user.email_confirmed_at` field to determine verification status
  - Unverified users: Progress saves to localStorage only, shows "verify-email" sync status
  - Verification prompt: Appears in top-right of journey page with resend email button
  - Profile menu: Shows orange warning badge for unverified users
  - Auto-polling: Checks verification status every 5 seconds, automatically upgrades to cloud sync
  - Migration: When verified, localStorage data automatically uploads to database
  - UX: Users can use app immediately after signup, cloud sync enables after verification
  - **Known Issue**: Supabase project has domain restrictions that block test emails (example.com, test.com, testmail.test, etc.). For testing, use real email domains (gmail.com, yahoo.com, etc.) or disable email confirmation in Supabase Dashboard → Authentication → Providers → Email

- ✅ **Profile Menu UI Enhancement**: Replaced login/logout buttons with unified Profile menu
  - Profile button (User icon) added to upper-left navigation next to music controls
  - Popover menu shows different content for anonymous vs authenticated users
  - Anonymous users: "Sign In / Register" button with cloud sync explanation
  - Authenticated users: Email display + "Sign Out" button (with verification warning if applicable)
  - Smooth animations via Framer Motion (opacity, scale, y transforms)
  - Proper close behavior: Escape key, click outside, or toggle button
  - Integrates with existing AuthDialog component for sign in/sign up flows
  - Consistent styling with music controls (black/80 backdrop, ancient-gold borders)
  
- ✅ **Supabase Authentication Integration Complete**: Added user accounts with cloud sync for metamyth journey
  - Created journey_progress table with Row Level Security policies (supabase/migrations/002_create_table_journey_progress.sql)
  - Built AuthDialog component with sign in/sign up tabs (client/src/components/auth-dialog.tsx)
  - Implemented AuthProvider context for global auth state (client/src/hooks/use-auth.tsx)
  - Updated metamyth-journey.tsx with parent-managed authentication and database sync
  - postMessage bridge enables parent-iframe communication for progress data
  - Anonymous users continue using localStorage without any warnings
  - Logged-in users get cloud sync with graceful fallback to localStorage on errors
  - Sync status indicators: "Syncing", "Synced", "Local only"
  - localStorage migration: Offers to import existing progress when user signs up
  - Security: Event source validation for postMessage (handles blob URL opaque origins)
  - Architecture: Parent handles all Supabase operations, iframe remains "dumb renderer"

## Previous Updates (October 1, 2025)
- ✅ **CSS Architecture Cleanup Complete**: Eliminated all !important declarations for proper cascade
  - Removed !important from global paragraph color - now allows utility classes to override naturally
  - Fixed metamyth journey .text-gold/.text-teal colors - proper cascade without !important
  - Cleaned up font utility classes - removed redundant color declarations
  - Fixed body, headings, typography tokens - all !important removed
  - Refactored interactive elements (buttons, tabs, blur effects) - proper specificity instead of !important
  - Renamed .backdrop-blur-lg → .backdrop-blur-force to avoid Tailwind naming conflict
  - Removed custom .text-cream-white - now using Tailwind's auto-generated utility
  - Result: Zero !important declarations in both index.css and metamyth-journey.css
  - All pages tested - visual styling working correctly with clean CSS architecture

## Previous Updates (September 30, 2025)
- ✅ **Mobile Optimization Complete**: Comprehensive responsive design applied to all pages
  - Story System (intensive-hero) page: All sections now mobile-optimized
  - Heroes/Journey Selection page: Fixed text cutoff issues on mobile
  - Questionnaire page: Fully responsive layout
  - Key fix: "The future you dream is one story away" text now scales properly (xl→2xl→3xl)
  - All typography, padding, spacing optimized for mobile screens
  - Responsive buttons (full-width on mobile, auto on desktop)
  
## Previous Updates (August 22, 2025)
- ✅ Philosophy section styling COMPLETE: White text with black glow outlines, black title with gold outline
- ✅ Quest section improvements: Enhanced red text readability with stronger black shadows
- ✅ Navigation updated: Changed "The Quest" to "Our Quest" in menu

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