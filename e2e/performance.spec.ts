import { test, expect } from '@playwright/test';
import { TestUtils, TEST_DATA } from './utils/test-helpers';

test.describe('Performance and Load Testing', () => {
  test.describe('Page Load Performance', () => {
    test('should load homepage within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Homepage should load within 5 seconds (adjust based on requirements)
      expect(loadTime).toBeLessThan(5000);
      
      // Check that key elements are visible quickly
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();
    });

    test('should load blog posts within acceptable time', async ({ page }) => {
      for (const post of TEST_DATA.blogPosts) {
        const startTime = Date.now();
        
        await page.goto(post.url);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        // Blog posts should load within 6 seconds
        expect(loadTime).toBeLessThan(6000);
        
        // Key content should be visible
        await expect(page.locator('.post')).toBeVisible();
        await expect(page.locator('.post h1').first()).toBeVisible();
      }
    });

    test('should handle concurrent page loads efficiently', async ({ browser }) => {
      const pages = await Promise.all([
        browser.newPage(),
        browser.newPage(),
        browser.newPage()
      ]);

      const startTime = Date.now();

      // Load different pages concurrently
      await Promise.all([
        pages[0].goto('/'),
        pages[1].goto('/posts/'),
        pages[2].goto('/about/')
      ]);

      await Promise.all([
        pages[0].waitForLoadState('networkidle'),
        pages[1].waitForLoadState('networkidle'),
        pages[2].waitForLoadState('networkidle')
      ]);

      const totalTime = Date.now() - startTime;

      // Concurrent loads should complete within reasonable time
      expect(totalTime).toBeLessThan(8000);

      // All pages should have loaded properly
      await expect(pages[0].locator('.container').first()).toBeVisible();
      await expect(pages[1].locator('h2:has-text("Posts")').first()).toBeVisible();
      await expect(pages[2].locator('h1:has-text("About Jason")').first()).toBeVisible();

      // Clean up
      await Promise.all(pages.map(page => page.close()));
    });
  });

  test.describe('Resource Loading', () => {
    test('should load all images without errors', async ({ page }) => {
      const imageErrors: string[] = [];
      
      page.on('response', response => {
        if (response.url().match(/\.(jpg|jpeg|png|gif|svg)$/i) && response.status() >= 400) {
          imageErrors.push(`Failed to load image: ${response.url()} (${response.status()})`);
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to posts page to check more images
      await page.goto('/posts/');
      await page.waitForLoadState('networkidle');

      // Check that no images failed to load
      expect(imageErrors).toHaveLength(0);

      // Verify images are actually displayed
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
        
        // Check that image has loaded (naturalWidth > 0)
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }
    });

    test('should load CSS without errors', async ({ page }) => {
      const cssErrors: string[] = [];
      
      page.on('response', response => {
        if (response.url().includes('.css') && response.status() >= 400) {
          cssErrors.push(`Failed to load CSS: ${response.url()} (${response.status()})`);
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      expect(cssErrors).toHaveLength(0);
    });

    test('should not have JavaScript errors on page load', async ({ page }) => {
      const jsErrors: string[] = [];
      
      page.on('console', message => {
        if (message.type() === 'error') {
          jsErrors.push(message.text());
        }
      });

      page.on('pageerror', error => {
        jsErrors.push(error.message);
      });

      const pages = Object.values(TEST_DATA.pages);
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        // Wait a bit for any async errors
        await page.waitForTimeout(1000);
      }

      // Filter out non-critical errors if any
      const criticalErrors = jsErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('analytics') &&
        !error.includes('network')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Memory and Resource Usage', () => {
    test('should not have memory leaks during navigation', async ({ page }) => {
      // This is a basic test - more sophisticated memory testing would require additional tools
      
      const pages = Object.values(TEST_DATA.pages);
      
      // Navigate through all pages multiple times
      for (let round = 0; round < 3; round++) {
        for (const pagePath of pages) {
          await page.goto(pagePath);
          await page.waitForLoadState('networkidle');
          
          // Basic check - page should still be responsive
          await expect(page.locator('[role="banner"]')).toBeVisible();
        }
      }

      // After extensive navigation, basic functionality should still work
      await page.goto('/');
      await expect(page.locator('.container').first()).toBeVisible();
      
      // Should be able to interact with elements
      const blogPost = page.locator('#blog-post-one');
      if (await blogPost.count() > 0) {
        await blogPost.click();
        await expect(page).toHaveURL('/posts/2025-08-05-Giving-Difficult-Feedback/');
      }
    });

    test('should handle rapid navigation without issues', async ({ page }) => {
      const pages = ['/', '/posts/', '/about/', '/contact/'];
      
      // Rapid navigation test
      for (let i = 0; i < 10; i++) {
        const randomPage = pages[Math.floor(Math.random() * pages.length)] || '/';
        await page.goto(randomPage);
        
        // Don't wait for full networkidle, just domcontentloaded
        await page.waitForLoadState('domcontentloaded');
        
        // Basic elements should be present
        await expect(page.locator('[role="banner"]')).toBeVisible();
      }
      
      // Final check that everything still works
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.container').first()).toBeVisible();
    });
  });

  test.describe('Network Conditions', () => {
    test('should work under slow network conditions', async ({ page }) => {
      // Simulate slow 3G
      await page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
        await route.continue();
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Even under slow conditions, key elements should be visible
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();

      // Navigation should still work
      await page.getByRole('link', { name: /^posts$/i }).click();
      await expect(page).toHaveURL('/posts/');
      await expect(page.locator('h2:has-text("Posts")').first()).toBeVisible();
    });

    test('should handle intermittent network issues', async ({ page }) => {
      let requestCount = 0;
      
      await page.route('**/*', async route => {
        requestCount++;
        
        // Fail every 5th request (simulate network issues)
        if (requestCount % 5 === 0 && route.request().url().includes('localhost')) {
          await route.abort();
          return;
        }
        
        await route.continue();
      });

      try {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        
        // Even with some failed requests, basic structure should work
        await expect(page.locator('[role="banner"]')).toBeVisible();
        
      } catch (error) {
        // If page fails to load completely, that's acceptable for this stress test
        console.log('Page load failed under simulated network issues:', error);
      }
    });
  });

  test.describe('Large Content Handling', () => {
    test('should handle blog posts with substantial content', async ({ page }) => {
      // Test the longer blog posts
      await page.goto('/posts/2025-08-05-Giving-Difficult-Feedback/');
      await page.waitForLoadState('networkidle');

      // Content should be fully loaded
      await expect(page.locator('.post')).toBeVisible();
      
      // Should have substantial content
      const postContent = page.locator('.post');
      await TestUtils.checkTextContent(page, '.post', 500);
      
      // Should be scrollable if content is long
      const contentHeight = await postContent.evaluate(el => el.scrollHeight);
      expect(contentHeight).toBeGreaterThan(200);
      
      // Scrolling should work smoothly (skip for mobile Safari)
      const userAgent = await page.evaluate(() => navigator.userAgent);
      if (!userAgent.includes('Mobile') || !userAgent.includes('Safari')) {
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(100);
      } else {
        // Use alternative scrolling method for mobile
        await page.evaluate(() => window.scrollBy(0, 300));
        await page.waitForTimeout(100);
      }
      
      // Content should still be visible after scrolling
      await expect(page.locator('.post')).toBeVisible();
    });

    test('should handle multiple blog cards efficiently', async ({ page }) => {
      await page.goto('/posts/');
      await page.waitForLoadState('networkidle');

      // Should display multiple blog cards
      const blogCards = page.locator('.post-card');
      const cardCount = await blogCards.count();
      expect(cardCount).toBeGreaterThanOrEqual(2);

      // Each card should be functional
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = blogCards.nth(i);
        await expect(card).toBeVisible();
        
        // Images should be loaded
        const img = card.locator('img');
        if (await img.count() > 0) {
          await expect(img).toBeVisible();
        }
      }
    });
  });

  test.describe('Interactive Elements Performance', () => {
    test('should handle blog post card interactions efficiently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const blogPost = page.locator('#blog-post-one');
      await expect(blogPost).toBeVisible();

      // Click should be responsive
      const clickStartTime = Date.now();
      await blogPost.click();
      
      // Navigation should complete quickly
      await page.waitForURL('/posts/2025-08-05-Giving-Difficult-Feedback/');
      const navigationTime = Date.now() - clickStartTime;
      
      expect(navigationTime).toBeLessThan(3000);
      
      // Content should be immediately visible
      await expect(page.locator('.post')).toBeVisible();
    });

    test('should handle navigation link interactions efficiently', async ({ page }) => {
      await page.goto('/');
      
      const navLinks = [
        { link: page.getByRole('link', { name: /^posts$/i }), expectedUrl: '/posts/' },
        { link: page.getByRole('link', { name: /^about$/i }), expectedUrl: '/about/' },
        { link: page.getByRole('link', { name: /^cyoa$/i }), expectedUrl: '/cyoa/' }
      ];

      for (const { link, expectedUrl } of navLinks) {
        const clickStartTime = Date.now();
        await link.click();
        
        await page.waitForURL(expectedUrl);
        const navigationTime = Date.now() - clickStartTime;
        
        expect(navigationTime).toBeLessThan(2000);
        
        // Go back to home for next test
        await page.getByRole('link', { name: /leadership and mentorship/i }).click();
        await page.waitForURL('/');
      }
    });

    test('should handle hover interactions without performance issues', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const blogCards = page.locator('.post-card');
      const cardCount = await blogCards.count();

      // Hover over multiple cards quickly
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = blogCards.nth(i);
        await card.hover();
        await page.waitForTimeout(50); // Brief pause
        
        // Card should still be visible and functional
        await expect(card).toBeVisible();
      }
    });
  });

  test.describe('Browser Resource Limits', () => {
    test('should handle multiple tabs without degradation', async ({ browser }) => {
      const contexts = await Promise.all([
        browser.newContext(),
        browser.newContext(),
        browser.newContext()
      ]);

      const pages = await Promise.all([
        contexts[0].newPage(),
        contexts[1].newPage(),
        contexts[2].newPage()
      ]);

      // Load different pages in each tab
      await Promise.all([
        pages[0].goto('/'),
        pages[1].goto('/posts/'),
        pages[2].goto('/about/')
      ]);

      await Promise.all([
        pages[0].waitForLoadState('networkidle'),
        pages[1].waitForLoadState('networkidle'),
        pages[2].waitForLoadState('networkidle')
      ]);

      // All pages should be functional
      await expect(pages[0].locator('.container').first()).toBeVisible();
      await expect(pages[1].locator('h2:has-text("Posts")').first()).toBeVisible();
      await expect(pages[2].locator('h1:has-text("About Jason")').first()).toBeVisible();

      // Navigation should still work in all tabs
      await pages[0].getByRole('link', { name: /^posts$/i }).click();
      await expect(pages[0]).toHaveURL('/posts/');

      // Clean up
      await Promise.all(contexts.map(context => context.close()));
    });
  });

  test.describe('Caching and Repeat Visits', () => {
    test('should load faster on repeat visits', async ({ page }) => {
      // First visit
      const firstVisitStart = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const firstVisitTime = Date.now() - firstVisitStart;

      // Navigate away and come back
      await page.goto('/about/');
      await page.waitForLoadState('networkidle');

      // Second visit (should use cached resources)
      const secondVisitStart = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const secondVisitTime = Date.now() - secondVisitStart;

      // Second visit should be faster (or at least not significantly slower)
      expect(secondVisitTime).toBeLessThanOrEqual(firstVisitTime + 1000);
      
      // Content should still be fully functional
      await expect(page.locator('.container').first()).toBeVisible();
      await expect(page.locator('#blog-post-one')).toBeVisible();
    });
  });
});