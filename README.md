# Leadership and Mentorship Blog

A Next.js-based leadership and mentorship blog with an interactive Choose Your Own Adventure (CYOA) feature. This project focuses on sharing leadership experiences and lessons through blog posts and interactive storytelling.

## Tech Stack

- **Next.js 15** - React framework with static site generation
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Jest** - Unit testing framework
- **Playwright** - End-to-end testing
- **CSS Modules** - Component-scoped styling

## Available Scripts

### Development

#### `npm run dev`
Runs the Next.js development server on [http://localhost:3000](http://localhost:3000).

The page will hot-reload when you make changes.

#### `npm run build`
Creates an optimized production build with static site generation.

Outputs to the `out/` directory for deployment.

#### `npm start`
Serves the production build locally (requires `npm run build` first).

### Testing

#### Jest Unit Tests

- **`npm test`** - Run all Jest unit tests
- **`npm run test:watch`** - Run Jest in watch mode for development
- **`npm run test:coverage`** - Run Jest with coverage report
- **`npm run test:ci`** - Run Jest in CI mode (no watch, with coverage)

**Coverage Thresholds:**
- Functions: 80%
- Branches: 75%
- Lines: 75%
- Statements: 75%

#### Playwright E2E Tests

- **`npm run test:e2e`** - Run all E2E tests (Chromium only locally)
- **`npm run test:e2e:ui`** - Run E2E tests with Playwright UI mode
- **`npm run test:e2e:headed`** - Run E2E tests in headed mode (visible browser)
- **`npm run test:e2e:debug`** - Run E2E tests in debug mode
- **`npm run test:e2e:fast`** - Run E2E tests on Chromium only (alias for test:e2e)

**Browser-Specific Tests:**
- **`npm run test:e2e:chromium`** - Run tests on Chromium only
- **`npm run test:e2e:firefox`** - Run tests on Firefox only
- **`npm run test:e2e:webkit`** - Run tests on WebKit (Safari) only
- **`npm run test:e2e:mobile`** - Run tests on mobile browsers (Chrome & Safari)
- **`npm run test:e2e:all-browsers`** - Run tests on all browsers (5 browsers, 570 tests)

**CI Tests:**
- **`npm run test:e2e:ci`** - Run E2E tests with CI reporters (HTML, JSON, JUnit)

**Playwright Setup:**
- **`npm run playwright:install`** - Install Playwright browsers
- **`npm run playwright:install:deps`** - Install Playwright browsers with system dependencies

### Performance Optimization

The project is optimized for fast CI/CD execution:

- **CI runs 114 tests** (Chromium only) instead of 570 (all browsers)
- **80% faster** test execution in CI
- Uses 4 parallel workers in CI for maximum speed
- Local development uses CPU cores - 1 for optimal performance

To run all browsers locally:
```bash
ALL_BROWSERS=true npm run test:e2e
```

## Project Structure

```
├── pages/                    # Next.js pages and components
│   ├── common/              # Shared components (Header, Footer, SEO)
│   ├── posts/               # Individual blog post pages
│   ├── index.tsx            # Home page with testimonials and blog previews
│   ├── posts.tsx            # Blog posts listing page
│   ├── story.tsx            # Interactive CYOA story page
│   ├── about.tsx            # About page
│   ├── contact.tsx          # Contact page
│   └── privacy.tsx          # Privacy policy page
├── public/                  # Static assets (images, CYOA story data)
├── styles/                  # Global CSS styles
├── __tests__/              # Jest unit tests
├── e2e/                    # Playwright E2E tests
└── .github/workflows/      # CI/CD pipelines
```

## Key Features

- **Static Site Generation** - Pre-rendered pages for optimal performance
- **Blog System** - Multiple blog posts with rich content and SVG graphics
- **CYOA Story** - Interactive narrative system with JSON-based story structure
- **Responsive Design** - Mobile-first approach with grid layouts
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- **Comprehensive Testing** - 522 unit tests + 114 E2E tests

## CI/CD Pipeline

GitHub Actions automatically:
1. Runs Jest unit tests with coverage
2. Builds the Next.js application
3. Runs Playwright E2E tests (Chromium only for speed)
4. Uploads test results and artifacts
5. Deploys to production on main branch

## Development Workflow

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Run tests:**
   ```bash
   npm test              # Jest unit tests
   npm run test:e2e      # Playwright E2E tests
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Testing Strategy

- **Unit Tests (Jest):** Component logic, rendering, and interactions
- **E2E Tests (Playwright):** Full user flows, navigation, accessibility
- **Coverage:** Maintains >80% function coverage and >75% line coverage
- **CI Optimization:** Chromium-only tests for fast feedback (30-60 seconds)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Jest Documentation](https://jestjs.io/)