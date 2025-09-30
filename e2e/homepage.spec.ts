import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display main content', async ({ page }) => {
    await page.goto('/');

    // Check that the page loads successfully
    await expect(page).toHaveTitle(/leadership/i);

    // Check for header navigation (based on actual Header component)
    const header = page.locator('[role="banner"]');
    await expect(header).toBeVisible();
    
    // Check for main navigation links (based on actual Header structure)
    await expect(page.getByRole('link', { name: /leadership and mentorship/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /posts/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /cyoa/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();

    // Check that the horizontal bar is present
    await expect(page.locator('[data-testid="horizontal-bar"]')).toBeVisible();

    // Check that the page has the container with content
    await expect(page.locator('.container').first()).toBeVisible();
  });

  test('should display leadership introduction content', async ({ page }) => {
    await page.goto('/');

    // Check for main leadership introduction text
    await expect(page.locator('text=Leadership is often perceived as an innate trait')).toBeVisible();
    await expect(page.locator('text=Mentorship is inseparable from leadership')).toBeVisible();
    await expect(page.locator('text=I\'m sharing my journey in leadership and mentorship')).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    await page.goto('/');

    // Check for Reviews section
    await expect(page.locator('h2:has-text("Reviews")')).toBeVisible();

    // Check for testimonial cards
    const testimonialCards = page.locator('.post-card');
    await expect(testimonialCards).toHaveCount(6); // 2 testimonials + 4 blog posts
    
    // Check specific testimonial content
    await expect(page.locator('text=Senior Software Engineering Manager')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Software Engineering Manager', exact: true })).toBeVisible();
    await expect(page.locator('text=Jason had been my manager and mentor')).toBeVisible();
  });

  test('should display recent posts section with clickable blog previews', async ({ page }) => {
    await page.goto('/');

    // Check for Recent Posts section
    await expect(page.locator('h2:has-text("Recent Posts")')).toBeVisible();

    // Check for blog grid
    const blogGrid = page.locator('.blog-grid').last(); // Get the blog posts grid, not testimonials
    await expect(blogGrid).toBeVisible();

    // Check for specific blog post cards
    const blogPost1 = page.locator('#blog-post-one');
    const blogPost2 = page.locator('#blog-post-two');
    
    await expect(blogPost1).toBeVisible();
    await expect(blogPost2).toBeVisible();

    // Check blog post content
    await expect(page.locator('text=Delivering Difficult News While Nurturing Talent')).toBeVisible();
    await expect(page.locator('text=Supporting Teams During Periods of Significant Change')).toBeVisible();
    
    // Check for images
    await expect(page.locator('img[alt="Giving Difficult Feedback"]')).toBeVisible();
    await expect(page.locator('img[alt="Blog Post 2"]')).toBeVisible();

    // Check for meta information
    await expect(page.locator('text=August 5, 2025')).toBeVisible();
    await expect(page.locator('text=August 19, 2025')).toBeVisible();
    await expect(page.locator('text=By Jason House').first()).toBeVisible();
  });

  test('should navigate to blog posts from homepage previews', async ({ page }) => {
    await page.goto('/');

    // Click on first blog post
    await page.locator('#blog-post-one').click();
    await expect(page).toHaveURL('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Go back to homepage
    await page.goto('/');
    
    // Click on second blog post
    await page.locator('#blog-post-two').click();
    await expect(page).toHaveURL('/posts/2025-08-19-Recovering-Team-Performance/');
  });

  test('should navigate to posts page', async ({ page }) => {
    await page.goto('/');

    // Click on the posts link
    await page.getByRole('link', { name: /posts/i }).click();

    // Wait for navigation and check URL (Next.js adds trailing slash)
    await expect(page).toHaveURL(/\/posts\/?$/);
  });

  test('should navigate to other main pages from header', async ({ page }) => {
    await page.goto('/');

    // Test CYOA navigation
    await page.getByRole('link', { name: /cyoa/i }).click();
    await expect(page).toHaveURL(/\/cyoa\/?$/);
    
    // Go back and test About navigation
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    
    // Test home navigation via title
    await page.getByRole('link', { name: /leadership and mentorship/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should have footer present', async ({ page }) => {
    await page.goto('/');
    
    // Footer should be visible (assuming Footer component is used)
    const footer = page.locator('footer').or(page.locator('[role="contentinfo"]'));
    await expect(footer).toBeVisible();
  });

  test('should be responsive across different viewports', async ({ page }) => {
    await page.goto('/');

    // Test mobile viewport (iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();
    
    // Content should fit in mobile width
    const container = page.locator('.container').first();
    const containerBox = await container.boundingBox();
    expect(containerBox?.width).toBeLessThanOrEqual(375);

    // Test tablet viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();
    
    // Blog grid should be visible on tablet
    await expect(page.locator('.blog-grid').last()).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();
    
    // All blog post cards should be visible on desktop
    const blogCards = page.locator('.post-card');
    expect(await blogCards.count()).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible(); // Header title
    await expect(page.locator('h2:has-text("Reviews")')).toBeVisible();
    await expect(page.locator('h2:has-text("Recent Posts")')).toBeVisible();
    
    // Testimonial and blog post titles should be h2
    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThan(2);
  });
});