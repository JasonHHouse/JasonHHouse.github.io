import { test, expect } from '@playwright/test';

test.describe('Blog Posts', () => {
  test('should load posts listing page with proper structure', async ({ page }) => {
    await page.goto('/posts/');

    // Check that the page loads
    await expect(page).toHaveTitle(/leadership/i);
    
    // Check for header and container structure
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container.top-margin')).toBeVisible();
    
    // Check for Posts heading
    await expect(page.locator('h2:has-text("Posts")')).toBeVisible();
    
    // Check for blog grid
    await expect(page.locator('.blog-grid')).toBeVisible();
  });

  test('should display blog post cards with proper content', async ({ page }) => {
    await page.goto('/posts/');
    
    // Check for specific blog post cards
    const blogPost1 = page.locator('#blog-post-one');
    const blogPost2 = page.locator('#blog-post-two');
    
    await expect(blogPost1).toBeVisible();
    await expect(blogPost2).toBeVisible();
    
    // Check first blog post content
    await expect(page.locator('text=Delivering Difficult News While Nurturing Talent')).toBeVisible();
    await expect(page.locator('img[alt="Giving Difficult Feedback"]')).toBeVisible();
    await expect(page.locator('text=Feedback is critical for everyones succcess')).toBeVisible();
    await expect(page.locator('text=August 5, 2025')).toBeVisible();
    
    // Check second blog post content
    await expect(page.locator('text=Supporting Teams During Periods of Significant Change')).toBeVisible();
    await expect(page.locator('img[alt="Blog Post 2"]')).toBeVisible();
    await expect(page.locator('text=When faced with sudden shifts in work environments')).toBeVisible();
    await expect(page.locator('text=August 19, 2025')).toBeVisible();
    
    // Check third blog post
    await expect(page.locator('text=Retrospectives: Looking Back to Move Forward')).toBeVisible();
    await expect(page.locator('img[alt="Retrospectives: Looking Back to Move Forward"]')).toBeVisible();
  });

  test('should navigate to individual blog posts via click', async ({ page }) => {
    await page.goto('/posts/');

    // Click on first blog post
    await page.locator('#blog-post-one').click();
    await expect(page).toHaveURL('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Go back to posts page
    await page.goto('/posts/');
    
    // Click on second blog post
    await page.locator('#blog-post-two').click();
    await expect(page).toHaveURL('/posts/2025-08-19-Recovering-Team-Performance/');
  });

  test('should load individual blog post pages with proper content', async ({ page }) => {
    const posts = [
      {
        url: '/posts/2025-08-05-Giving-Difficult-Feedback/',
        title: 'The Tightrope Walk: Delivering Difficult News While Nurturing Talent',
        date: 'August 5, 2025'
      },
      {
        url: '/posts/2025-08-19-Recovering-Team-Performance/',
        title: 'Supporting Teams During Periods of Significant Change', // This may vary based on actual content
        date: 'August 19, 2025'
      }
    ];

    for (const post of posts) {
      await page.goto(post.url);
      
      // Check basic page structure
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();
      
      // Check for date
      await expect(page.locator(`text=${post.date}`)).toBeVisible();
      
      // Check for post content wrapper
      await expect(page.locator('.post')).toBeVisible();
      
      // Check for main heading
      await expect(page.locator('main h1, .post h1, .container h1:not(nav h1)')).toBeVisible();
      
      // Should have substantial content
      const postContent = page.locator('.post');
      await expect(postContent).toBeVisible();
      
      // Check for footer
      const footer = page.locator('footer').or(page.locator('[role="contentinfo"]'));
      await expect(footer).toBeVisible();
    }
  });

  test('should have proper content structure in blog posts', async ({ page }) => {
    await page.goto('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Check for specific content from the actual post
    await expect(page.locator('h1:has-text("The Tightrope Walk")')).toBeVisible();
    
    // Check for anonymity disclaimer
    await expect(page.locator('text=All names, company references, role titles')).toBeVisible();
    
    // Check for substantial paragraph content
    await expect(page.locator('text=In a previous role, I found myself')).toBeVisible();
    
    // Check for interactive elements if they exist (flip cards)
    const flipCards = page.locator('[class*="flip"]');
    const flipCardCount = await flipCards.count();
    if (flipCardCount > 0) {
      await expect(flipCards.first()).toBeVisible();
    }
  });

  test('should have readable typography and accessible layout', async ({ page }) => {
    await page.goto('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Check for readable text container
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();
    
    // Container should have reasonable width
    const boundingBox = await container.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(200);
    
    // Check heading hierarchy
    await expect(page.locator('main h1, .post h1, .container h1:not(nav h1)')).toBeVisible();
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    expect(await headings.count()).toBeGreaterThan(0);
    
    // Check for proper paragraph structure
    const paragraphs = page.locator('.post p');
    expect(await paragraphs.count()).toBeGreaterThan(2);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test posts listing page on mobile
    await page.goto('/posts/');
    await expect(page.locator('.container.top-margin')).toBeVisible();
    await expect(page.locator('.blog-grid')).toBeVisible();
    
    // Blog cards should be visible and stack properly
    const blogCards = page.locator('.post-card');
    expect(await blogCards.count()).toBeGreaterThanOrEqual(2);
    
    // Test individual post on mobile
    await page.locator('#blog-post-one').click();
    await expect(page).toHaveURL('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Content should be readable on mobile
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();
    
    // Content should fit within mobile viewport
    const containerBox = await container.boundingBox();
    expect(containerBox?.width).toBeLessThanOrEqual(375);
    
    // Text should not overflow horizontally
    const postContent = page.locator('.post');
    await expect(postContent).toBeVisible();
  });

  test('should handle navigation back to posts from individual posts', async ({ page }) => {
    // Go to individual post
    await page.goto('/posts/2025-08-05-Giving-Difficult-Feedback/');
    
    // Navigate back to posts via header
    await page.locator('nav a[href="/posts"]').click();
    await expect(page).toHaveURL('/posts/');
    await expect(page.locator('h2:has-text("Posts")')).toBeVisible();
    
    // Test from second post
    await page.goto('/posts/2025-08-19-Recovering-Team-Performance/');
    await page.locator('nav a[href="/posts"]').click();
    await expect(page).toHaveURL('/posts/');
  });

  test('should have proper meta information and bylines', async ({ page }) => {
    await page.goto('/posts/');
    
    // Check for author bylines
    const bylines = page.locator('text=By Jason House');
    expect(await bylines.count()).toBeGreaterThanOrEqual(2);
    
    // Check for dates in meta
    await expect(page.locator('.meta:has-text("August 5, 2025")')).toBeVisible();
    await expect(page.locator('.meta:has-text("August 19, 2025")')).toBeVisible();
  });

  test('should load images properly', async ({ page }) => {
    await page.goto('/posts/');
    
    // Check that blog post images load
    const images = page.locator('.post-card img');
    expect(await images.count()).toBeGreaterThanOrEqual(2);
    
    // Test specific images
    await expect(page.locator('img[alt="Giving Difficult Feedback"]')).toBeVisible();
    await expect(page.locator('img[alt="Blog Post 2"]')).toBeVisible();
    await expect(page.locator('img[alt="Retrospectives: Looking Back to Move Forward"]')).toBeVisible();
    
    // Images should have loaded (not broken)
    const firstImage = images.first();
    const naturalWidth = await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });
});