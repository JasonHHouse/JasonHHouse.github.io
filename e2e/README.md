# End-to-End Test Suite

This directory contains a comprehensive Playwright test suite for the Leadership and Mentorship blog application. The tests are designed to verify functionality, accessibility, performance, and user experience across different browsers and devices.

## Test Structure

### Core Test Files

#### `homepage.spec.ts`
Tests the homepage functionality including:
- Page loading and basic structure
- Testimonials section display
- Recent blog posts section
- Blog post preview interactions
- Navigation functionality
- Responsive design
- Heading hierarchy

#### `navigation.spec.ts`
Tests site navigation including:
- Header navigation consistency across pages
- Navigation link functionality
- Mobile responsive navigation
- Keyboard navigation
- Direct URL navigation
- Footer presence

#### `blog-posts.spec.ts`
Tests blog post functionality including:
- Posts listing page
- Individual blog post pages
- Blog post card interactions
- Content structure and readability
- Mobile responsive design
- Image loading
- Meta information display

#### `cyoa.spec.ts`
Tests the Choose Your Own Adventure page including:
- Coming soon content display
- Feature cards presentation
- Interactive elements (when available)
- Content structure
- Mobile responsive design

#### `static-pages.spec.ts`
Tests static pages (About, Contact, Privacy) including:
- Content structure and display
- Navigation consistency
- Mobile responsiveness
- Accessibility features
- Cross-page functionality

#### `contact-form.spec.ts`
Tests contact page specifically including:
- Contact information display
- Contact link functionality
- Social media link validation
- Mobile interaction
- Accessibility features

#### `accessibility.spec.ts`
Comprehensive accessibility testing including:
- Semantic HTML structure
- ARIA roles and landmarks
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Image alt text
- Focus management
- Mobile accessibility

#### `performance.spec.ts`
Performance and load testing including:
- Page load times
- Resource loading efficiency
- Memory usage
- Network condition handling
- Concurrent load testing
- Interactive element performance

### Utility Files

#### `utils/test-helpers.ts`
Contains reusable test utilities and page objects:

**Page Object Classes:**
- `HeaderComponent` - Header navigation testing
- `FooterComponent` - Footer verification
- `BasePage` - Common page functionality
- `HomePage` - Homepage-specific methods
- `PostsPage` - Posts page methods
- `BlogPostPage` - Individual blog post methods
- `CyoaPage` - CYOA page methods
- `AboutPage` - About page methods
- `ContactPage` - Contact page methods
- `PrivacyPage` - Privacy page methods

**Utility Classes:**
- `TestUtils` - Common test operations
- `AccessibilityHelpers` - Accessibility testing helpers

**Constants:**
- `VIEWPORTS` - Responsive testing viewports
- `TEST_DATA` - Test data constants

## Test Coverage

### Functional Testing
- ✅ Page loading and navigation
- ✅ Interactive elements (links, buttons)
- ✅ Content display and structure
- ✅ Blog post functionality
- ✅ Contact information display
- ✅ Responsive design

### Accessibility Testing
- ✅ Semantic HTML structure
- ✅ ARIA roles and landmarks
- ✅ Keyboard navigation
- ✅ Screen reader patterns
- ✅ Image alt text
- ✅ Color contrast (basic)
- ✅ Focus management
- ✅ Mobile accessibility

### Performance Testing
- ✅ Page load times
- ✅ Resource loading
- ✅ Memory usage patterns
- ✅ Network condition handling
- ✅ Concurrent operations

### Cross-Browser Testing
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari/WebKit
- ✅ Mobile Chrome
- ✅ Mobile Safari

### Device Testing
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)
- ✅ iPhone 12 (375x812)
- ✅ Pixel 5 (360x640)

## Running Tests

### Basic Commands

```bash
# Run all tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific browser tests
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# Run mobile tests only
npm run test:e2e:mobile
```

### Advanced Usage

```bash
# Run specific test file
npx playwright test homepage.spec.ts

# Run tests matching pattern
npx playwright test --grep "accessibility"

# Run tests with specific project
npx playwright test --project chromium

# Generate test report
npx playwright show-report
```

## Test Configuration

Tests are configured via `playwright.config.ts` in the root directory:

- **Test Directory:** `./e2e`
- **Base URL:** `http://localhost:3000`
- **Timeout:** 2 minutes per test
- **Retries:** 2 on CI, 0 locally
- **Reporters:** HTML, JSON, JUnit
- **Screenshots:** On failure
- **Videos:** On failure
- **Traces:** On retry

## Browser Matrix

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome  | ✅      | ✅     |
| Firefox | ✅      | ❌     |
| Safari  | ✅      | ✅     |
| Edge    | ⚠️      | ❌     |

*⚠️ = Available but commented out*
*❌ = Not configured*

## Writing New Tests

### Best Practices

1. **Use Page Objects**: Utilize the page object classes in `utils/test-helpers.ts`
2. **Wait for Load States**: Always wait for `networkidle` or appropriate load state
3. **Descriptive Test Names**: Use clear, descriptive test names
4. **Responsive Testing**: Test mobile, tablet, and desktop viewports
5. **Accessibility**: Include accessibility checks in functional tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from './utils/test-helpers';

test.describe('Feature Name', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('should perform specific functionality', async ({ page }) => {
    await homePage.goto('/');
    await homePage.verifyBasicPageStructure();
    
    // Test specific functionality
    // ... test code ...
    
    // Verify results
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

## CI/CD Integration

Tests are configured to run in CI environments with:
- Retry logic for flaky tests
- Parallel execution (limited on CI)
- Multiple output formats (HTML, JSON, JUnit)
- Screenshot and video artifacts on failure

## Troubleshooting

### Common Issues

1. **Test Timeouts**: Increase timeout in playwright.config.ts
2. **Element Not Found**: Check selectors match actual DOM
3. **Race Conditions**: Add proper wait conditions
4. **Mobile Tests Failing**: Verify viewport sizes and touch targets

### Debug Commands

```bash
# Run with debug flag to step through tests
npx playwright test --debug

# Generate test code from browser interactions
npm run playwright:codegen

# View last test report
npx playwright show-report
```

## Maintenance

### Regular Tasks

- Update test data when blog posts are added
- Verify accessibility standards compliance
- Update browser versions in CI
- Review performance benchmarks
- Update page objects when UI changes

### Monitoring

- Watch for test flakiness
- Monitor performance regressions
- Track accessibility compliance
- Review test coverage gaps

## Contributing

When adding new tests:

1. Follow existing patterns and structure
2. Add appropriate page objects to `utils/test-helpers.ts`
3. Include accessibility checks
4. Test responsive behavior
5. Add performance considerations where relevant
6. Update this README with new test descriptions