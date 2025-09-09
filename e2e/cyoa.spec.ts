import { test, expect } from '@playwright/test';

test.describe('CYOA (Choose Your Own Adventure)', () => {
  test('should load CYOA page with coming soon content', async ({ page }) => {
    await page.goto('/cyoa/');

    // Check that the page loads
    await expect(page).toHaveTitle(/leadership/i);
    
    // Check for header structure
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();
    
    // Check for main heading
    await expect(page.locator('h1:has-text("Interactive Leadership CYOA")')).toBeVisible();
    
    // Check for coming soon heading
    await expect(page.locator('h2:has-text("Coming Soon")')).toBeVisible();
  });

  test('should display comprehensive coming soon content', async ({ page }) => {
    await page.goto('/cyoa/');
    await page.waitForLoadState('networkidle');

    // Check for introduction text
    await expect(page.locator('text=Leadership isn\'t learned from textbooks alone')).toBeVisible();
    await expect(page.locator('text=That\'s why I\'m building something special for aspiring leaders')).toBeVisible();
    
    // Check for feature cards in blog grid
    const featureCards = page.locator('.post-card');
    expect(await featureCards.count()).toBeGreaterThanOrEqual(4);
    
    // Check for specific feature headings
    await expect(page.locator('h2:has-text("🎯 Real-World Scenarios")')).toBeVisible();
    await expect(page.locator('h2:has-text("⚡ Interactive Decision Making")')).toBeVisible();
    await expect(page.locator('h2:has-text("📚 Contextual Learning")')).toBeVisible();
    await expect(page.locator('h2:has-text("🔄 Multiple Pathways")')).toBeVisible();
  });

  test('should display feature descriptions', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check for feature descriptions
    await expect(page.locator('text=Face authentic leadership challenges drawn from my years')).toBeVisible();
    await expect(page.locator('text=Make choices that matter. See how your decisions play out')).toBeVisible();
    await expect(page.locator('text=After each scenario, dive deeper with explanations')).toBeVisible();
    await expect(page.locator('text=Explore different leadership styles and approaches')).toBeVisible();
  });

  test('should display what you will experience section', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check for section heading
    await expect(page.locator('h3:has-text("What You\'ll Experience")')).toBeVisible();
    
    // Check for experience categories
    await expect(page.locator('text=Difficult Conversations:')).toBeVisible();
    await expect(page.locator('text=Team Dynamics:')).toBeVisible();
    await expect(page.locator('text=Strategic Decisions:')).toBeVisible();
    await expect(page.locator('text=Crisis Management:')).toBeVisible();
    
    // Check for detailed descriptions
    await expect(page.locator('text=Navigate performance reviews, deliver challenging feedback')).toBeVisible();
    await expect(page.locator('text=Build trust within your team, motivate underperforming members')).toBeVisible();
    await expect(page.locator('text=Balance competing priorities, allocate limited resources')).toBeVisible();
    await expect(page.locator('text=Lead through uncertainty, communicate during organizational changes')).toBeVisible();
  });

  test('should display why choose your own adventure section', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check for explanation section
    const explanationCard = page.locator('.post-card:has-text("Why Choose Your Own Adventure?")');
    await expect(explanationCard).toBeVisible();
    
    // Check for explanation content
    await expect(page.locator('text=Traditional leadership training often feels abstract')).toBeVisible();
    await expect(page.locator('text=CYOA format lets you experience the messy, nuanced reality')).toBeVisible();
    await expect(page.locator('text=Each path through the adventure reveals different aspects')).toBeVisible();
  });

  test('should display call to action and blog reference', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check for call to action
    await expect(page.locator('text=Stay tuned—this interactive leadership journey will be launching soon')).toBeVisible();
    await expect(page.locator('text=In the meantime, explore my blog posts')).toBeVisible();
  });

  test('should have proper structure and layout', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check for container and top margin
    await expect(page.locator('.container.top-margin')).toBeVisible();
    
    // Check for blog grid layout
    await expect(page.locator('.blog-grid')).toBeVisible();
    
    // Check that content is organized in cards
    const cards = page.locator('.post-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
    
    // Check for footer
    const footer = page.locator('footer').or(page.locator('[role="contentinfo"]')).first();
    await expect(footer).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/cyoa/');
    await page.waitForLoadState('networkidle');
    
    // Content should be visible on mobile
    await expect(page.locator('.container').first()).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Feature cards should be visible and stack properly on mobile
    const cards = page.locator('.post-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
    
    // Content should fit within mobile viewport
    const container = page.locator('.container').first();
    const containerBox = await container.boundingBox();
    expect(containerBox?.width).toBeLessThanOrEqual(375);
    
    // Text should be readable on mobile
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('should maintain consistent navigation', async ({ page }) => {
    await page.goto('/cyoa/');
    
    // Check that header navigation is present and functional
    await expect(page.locator('[role="banner"]')).toBeVisible();
    
    // Test navigation back to other pages
    await page.getByRole('link', { name: /^posts$/i }).click();
    await expect(page).toHaveURL('/posts/');
    
    // Navigate back to CYOA
    await page.getByRole('link', { name: /^cyoa$/i }).click();
    await expect(page).toHaveURL('/cyoa/');
    await expect(page.locator('h1:has-text("Interactive Leadership CYOA")')).toBeVisible();
    
    // Test home navigation
    await page.getByRole('link', { name: /leadership and mentorship/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should handle tablet viewport appropriately', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/cyoa/');
    
    // Content should be visible and well-formatted on tablet
    await expect(page.locator('.container').first()).toBeVisible();
    await expect(page.locator('.blog-grid')).toBeVisible();
    
    // Cards should have appropriate spacing on tablet
    const cards = page.locator('.post-card');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
    
    // Should maintain readability
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h2').first()).toBeVisible();
  });

  // Note: We're not testing /story page since it's not mentioned in the actual codebase
  // The CYOA functionality is currently a "coming soon" page at /cyoa
});