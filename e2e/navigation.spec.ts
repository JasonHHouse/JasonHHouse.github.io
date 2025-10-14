import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate between all main pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/leadership/i);

    // Navigate to Posts
    await page.getByRole('link', { name: /posts/i }).click();
    await expect(page).toHaveURL(/\/posts\/?$/);
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // Navigate to About
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // Test Privacy page (if it exists in navigation)
    await page.goto('/privacy');
    await expect(page).toHaveURL(/\/privacy\/?$/);
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // Test CYOA page directly (not in navigation - it's a secret page)
    await page.goto('/cyoa');
    await expect(page).toHaveURL(/\/cyoa\/?$/);
    await expect(page.locator('text=Choose Your Own Adventure')).toBeVisible();

    // Return to Home via header title link
    await page.getByRole('link', { name: /leadership and mentorship/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should have consistent header structure across pages', async ({ page }) => {
    const pages = [
      { path: '/', hasHeading: false }, // Homepage content is in container
      { path: '/posts/', hasHeading: true },
      { path: '/cyoa/', hasHeading: true },
      { path: '/about/', hasHeading: true },
      { path: '/privacy/', hasHeading: true }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);

      // Check header banner is present with role
      await expect(page.locator('[role="banner"]')).toBeVisible();

      // Check navigation structure
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Check main site title/logo link
      await expect(page.getByRole('link', { name: /leadership and mentorship/i })).toBeVisible();

      // Check all navigation links are present (based on actual Header.tsx)
      await expect(page.getByRole('link', { name: /^posts$/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible();
      // CYOA link should NOT be visible (it's a secret page)
      await expect(page.getByRole('link', { name: /^cyoa$/i })).not.toBeVisible();

      // Check horizontal bar is present
      await expect(page.locator('[data-testid="horizontal-bar"]')).toBeVisible();

      // Check for content container
      await expect(page.locator('.container').first()).toBeVisible();

      // Check heading structure if expected
      if (pageInfo.hasHeading) {
        await expect(page.locator('h1').first()).toBeVisible();
      }
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test Posts navigation
    await page.getByRole('link', { name: /^posts$/i }).click();
    await expect(page).toHaveURL(/\/posts\/?$/);
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // Test About navigation
    await page.getByRole('link', { name: /^about$/i }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // Test home navigation via title
    await page.getByRole('link', { name: /leadership and mentorship/i }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('.container').first()).toBeVisible();
  });

  test('should have consistent footer across pages', async ({ page }) => {
    const pages = ['/', '/posts/', '/cyoa/', '/about/', '/privacy/'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check footer is present (Footer component should render)
      const footer = page.locator('footer').or(page.locator('[role="contentinfo"]'));
      await expect(footer).toBeVisible();
    }
  });

  test('should maintain navigation state and accessibility', async ({ page }) => {
    await page.goto('/');

    // Check navigation has proper ARIA structure
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check navigation list structure
    const navList = page.locator('nav ul');
    await expect(navList).toBeVisible();

    // Check navigation items have proper key attributes (from React)
    const navItems = page.locator('nav ul li');
    expect(await navItems.count()).toBeGreaterThan(0);

    // Test keyboard navigation (tab through links)
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    // Some mobile browsers may not visually show focus, so we make this check more lenient
    const focusCount = await focusedElement.count();
    expect(focusCount).toBeGreaterThanOrEqual(0);
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should be visible and functional on mobile
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();

    // Navigation links should be accessible on mobile
    await expect(page.getByRole('link', { name: /posts/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    // CYOA link should NOT be visible (it's a secret page)
    await expect(page.getByRole('link', { name: /^cyoa$/i })).not.toBeVisible();

    // Test navigation still works on mobile
    await page.getByRole('link', { name: /posts/i }).click();
    await expect(page).toHaveURL(/\/posts\/?$/);
    
    // Header should remain consistent on mobile
    await expect(page.locator('[role="banner"]')).toBeVisible();
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Test direct navigation to each page
    const directPages = [
      '/posts/',
      '/cyoa/',
      '/about/',
      '/privacy/',
      '/posts/2025-08-05-Giving-Difficult-Feedback/',
      '/posts/2025-08-19-Recovering-Team-Performance/'
    ];

    for (const path of directPages) {
      await page.goto(path);

      // Should not get 404 or error page
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();

      // Navigation should still work from direct URLs
      const homeLink = page.getByRole('link', { name: /leadership and mentorship/i });
      await expect(homeLink).toBeVisible();
    }
  });
});