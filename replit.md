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