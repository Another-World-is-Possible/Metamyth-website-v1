# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Express + Vite HMR)
- `npm run build` - Build for production (creates dist/ folder)
- `npm run start` - Start production server (run from dist/ directory)
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes with Drizzle

## Production Deployment

The application must be built and run from the correct directory structure:

```bash
# Build process
npm run build

# Production startup (critical: must cd to dist/)
cd dist && NODE_ENV=production node index.js

# Or use provided script
./start-production.sh
```

The `serveStatic` function in `server/vite.ts` requires the server to run from the `dist/` directory for correct path resolution.

## Architecture Overview

This is a full-stack mystical storytelling platform with:

**Frontend**: React + TypeScript SPA using Wouter for routing
- Located in `client/src/`
- Uses shadcn/ui components built on Radix UI primitives
- Custom design system with mystical fonts (Edensor, Alice) and atmospheric backgrounds
- Scroll-triggered animations with Framer Motion
- Image optimization context for progressive loading

**Backend**: Express.js server with TypeScript
- API routes prefixed with `/api`
- Session-based architecture (no JWT)
- Questionnaire system with qualification logic in `server/routes.ts`
- Font serving middleware with proper MIME types for `.ttf`/`.otf` files

**Database**: PostgreSQL with Drizzle ORM
- Schema defined in `shared/schema.ts`
- Two main tables: `users` and `questionnaire_responses`
- Uses Neon Database for cloud PostgreSQL

**Build System**: Vite with custom configuration
- Client builds to `dist/public/`
- Server bundles to `dist/index.js` with esbuild
- Path aliases: `@` for client/src, `@shared` for shared/, `@assets` for attached_assets/

## Design System & Styling

- **Colors**: Custom CSS variables for mystical palette (forest-green, ancient-gold, mystical-teal, deep-black)
- **Typography**: Font system with Edensor for headers, Alice for body text
- **Animations**: Custom keyframes for atmospheric effects (spin-slow, pulse-glow, flicker, burn, thread)
- **Mobile-first**: Responsive design with Tailwind CSS

## Key Components

- **Navigation**: Tab-based system linking mystical journey sections
- **Atmospheric Backgrounds**: Progressive visual journey from burning sun to forest campfire
- **Questionnaire System**: Multi-step form with qualification logic routing users to calendar vs Discord
- **Font Loading**: Custom fonts served from `attached_assets/` with proper Content-Type headers

## Content Structure

The application follows a narrative arc across 7 main sections:
1. Call to Adventure (burning sun)
2. Why Story Matters (cosmic perspectives)  
3. The Systems (mountain vistas)
4. Our Metamyth (forest immersion)
5. Stories We Tell (tall trees)
6. The Quest (journey paths)
7. Questionaire (campfire gathering)

Each section has its own page component in `client/src/pages/` and corresponding atmospheric styling.

## Development Notes

- Font assets in `attached_assets/` are served with Express static middleware
- Image optimization handled by custom context provider
- Qualification logic in routes determines user flow (high-value → calendar, others → Discord)
- Mystical aesthetic must be preserved in all changes
- Mobile responsiveness is critical for the immersive experience