import { test, expect } from '@playwright/test';

test.describe('CYOA (Choose Your Own Adventure)', () => {
  test('should load CYOA story selection page', async ({ page }) => {
    await page.goto('/cyoa/');

    // Check that the page loads
    await expect(page).toHaveTitle(/leadership/i);

    // Check for header structure
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();

    // Check for main heading
    await expect(page.locator('h1:has-text("Choose Your Own Adventure")')).toBeVisible();

    // Check for subtitle
    await expect(page.locator('text=Select a story to begin your interactive journey')).toBeVisible();
  });

  test('should display story cards', async ({ page }) => {
    await page.goto('/cyoa/');

    // Wait for stories to load
    await page.waitForSelector('text=The Dark Forest', { timeout: 5000 });

    // Check that stories are displayed
    await expect(page.locator('text=The Dark Forest')).toBeVisible();
    await expect(page.locator('text=The Project Discussion')).toBeVisible();
  });

  test('should display story descriptions and metadata', async ({ page }) => {
    await page.goto('/cyoa/');

    // Wait for content to load
    await page.waitForSelector('text=The Dark Forest', { timeout: 5000 });

    // Check for story descriptions
    await expect(page.locator('text=dark forest filled with mystery')).toBeVisible();
    await expect(page.locator('text=professional conversation about an upcoming')).toBeVisible();

    // Check for difficulty levels
    await expect(page.locator('text=Difficulty: Easy')).toBeVisible();
    await expect(page.locator('text=Difficulty: Medium')).toBeVisible();

    // Check for themes
    await expect(page.locator('text=Adventure')).toBeVisible();
    await expect(page.locator('text=Leadership')).toBeVisible();
  });

  test('should navigate to story when card is clicked', async ({ page }) => {
    await page.goto('/cyoa/');

    // Wait for stories to load
    await page.waitForSelector('text=The Dark Forest', { timeout: 5000 });

    // Click on the first story card
    await page.locator('text=The Dark Forest').click();

    // Should navigate to story page with ID parameter
    await expect(page).toHaveURL(/\/story\?id=forest-adventure/);
  });

  test('story page should load and display content', async ({ page }) => {
    await page.goto('/story?id=forest-adventure');

    // Wait for story to load
    await page.waitForSelector('text=You find yourself in a dark forest', { timeout: 5000 });

    // Check that story content is displayed
    await expect(page.locator('text=You find yourself in a dark forest')).toBeVisible();

    // Check for message senders
    await expect(page.locator('text=— Narrator')).toBeVisible();
  });

  test('story page should display options', async ({ page }) => {
    await page.goto('/story?id=forest-adventure');

    // Wait for story to load
    await page.waitForSelector('[role="button"]', { timeout: 5000 });

    // Check for "What do you do?" heading
    await expect(page.locator('text=What do you do?')).toBeVisible();

    // Check that option buttons are present
    const optionButtons = page.locator('[role="button"]');
    expect(await optionButtons.count()).toBeGreaterThan(0);
  });

  test('story page should handle option clicks', async ({ page }) => {
    await page.goto('/story?id=forest-adventure');

    // Wait for story to load
    await page.waitForSelector('[role="button"]', { timeout: 5000 });

    // Click the first option
    const firstOption = page.locator('[role="button"]').first();
    await firstOption.click();

    // The story should update with new content
    // (Content will change based on the choice made)
    await page.waitForTimeout(500);

    // Verify page is still showing story content
    const messageBoxes = page.locator('.messageBox');
    expect(await messageBoxes.count()).toBeGreaterThan(0);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/cyoa/');

    // Wait for content to load
    await page.waitForSelector('text=Choose Your Own Adventure', { timeout: 5000 });

    // Content should be visible on mobile
    await expect(page.locator('.container').first()).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();

    // Story cards should be visible
    await expect(page.locator('text=The Dark Forest')).toBeVisible();
  });

  test('should maintain navigation without CYOA link in header', async ({ page }) => {
    await page.goto('/cyoa/');

    // Wait for page to load
    await page.waitForSelector('[role="banner"]', { timeout: 5000 });

    // Check that header navigation is present
    await expect(page.locator('[role="banner"]')).toBeVisible();

    // CYOA link should NOT be in navigation (it's a secret page)
    const cyoaLink = page.getByRole('link', { name: /^cyoa$/i });
    await expect(cyoaLink).not.toBeVisible();

    // Other navigation links should be present
    await expect(page.getByRole('link', { name: /^posts$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible();

    // Test navigation to other pages
    await page.getByRole('link', { name: /^posts$/i }).click();
    await expect(page).toHaveURL(/\/posts\/?$/);
  });

  test('should handle tablet viewport appropriately', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/cyoa/');

    // Wait for content to load
    await page.waitForSelector('text=Choose Your Own Adventure', { timeout: 5000 });

    // Content should be visible and well-formatted on tablet
    await expect(page.locator('.container').first()).toBeVisible();

    // Story cards should be visible
    await expect(page.locator('text=The Dark Forest')).toBeVisible();
    await expect(page.locator('text=The Project Discussion')).toBeVisible();

    // Should maintain readability
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should handle keyboard navigation on story cards', async ({ page }) => {
    await page.goto('/cyoa/');

    // Wait for stories to load
    await page.waitForSelector('text=The Dark Forest', { timeout: 5000 });

    // Get story card
    const storyCard = page.locator('text=The Dark Forest').locator('..').locator('..');

    // Tab to focus on the card
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Press Enter to navigate
    await storyCard.press('Enter');

    // Should navigate to story
    await page.waitForURL(/\/story\?id=forest-adventure/, { timeout: 5000 });
  });
});
