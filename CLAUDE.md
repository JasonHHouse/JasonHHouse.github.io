# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based leadership and mentorship blog with an interactive Choose Your Own Adventure (CYOA) feature. The project focuses on sharing leadership experiences and lessons through blog posts and interactive storytelling.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on http://localhost:3000
- **Production build**: `npm run build` - Creates optimized production build
- **Start production**: `npm start` - Serves the production build

Note: The README shows legacy Create React App commands, but the project has migrated to Next.js. Use the Next.js commands above.

## Architecture

### Framework & Tech Stack
- **Next.js 15** - React framework for production
- **TypeScript** - Strict typing enabled with modern ES features
- **CSS Modules** - Component-scoped styling (e.g., `Header.module.css`)
- **React 19** - Latest React version with modern hooks

### Project Structure

- `pages/` - Next.js pages and components
  - `_app.tsx` - Main app wrapper with global CSS
  - `index.tsx` - Home page with testimonials and blog post previews
  - `posts.tsx` - Blog posts listing page
  - `story.tsx` - Interactive CYOA story page (fetches from `public/teststory.json`)
  - `common/` - Shared components (Header, Footer, TagList)
  - `posts/` - Individual blog post pages with detailed content
- `public/` - Static assets including images and CYOA story data
- `styles/` - Global CSS styles

### Key Components

- **Header** (`pages/common/Header.tsx`) - Navigation with links to Home, Posts, CYOA, About, Contact
- **Footer** (`pages/common/Footer.tsx`) - Site footer component
- **Blog Posts** - Individual post pages with rich content, interactive elements, and SVG graphics
- **CYOA Story** - Interactive narrative system that loads JSON story data and manages user progression

### Story System
The CYOA feature uses a JSON-based story structure (`public/teststory.json`) with:
- Nodes containing messages and choices
- Navigation between story nodes
- Multiple message senders (Narrator, Tree Spirit, etc.)

### Styling Approach
- CSS Modules for component-specific styles
- Global styles in `styles/globals.css`
- Responsive design with grid layouts for blog posts
- Interactive elements like flip cards and SVG graphics

## Testing
The project includes testing setup with Jest and React Testing Library, though specific test scripts aren't defined in package.json beyond the ESLint configuration.

## Errors & Debugging

### Build Errors
- **CSS Modules Pure Selector Error**
  - **Error Type**: Build Error
  - **Version**: Next.js 15.5.2 (Webpack)
  - **Location**: `./pages/contact.module.css:10:1`
  - **Message**: Syntax error: Selector "p+p" is not pure (pure selectors must contain at least one local class or id)
  - **Code Snippet**:
    ```css
    p+p {
      margin-top: 1em;
      /* Adds space above subsequent paragraphs */
    }
    ```
  - **Resolution**: Modify CSS selector to include a local class or ID to make it a pure CSS Module selector