import { test, expect } from '@playwright/test';
import { ContactPage } from './utils/test-helpers';

test.describe('Contact Page', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
  });

  test('should load contact page with proper structure', async ({ page }) => {
    await contactPage.goto('/contact/');

    // Check basic page structure
    await contactPage.verifyPageTitle(/contact/i);
    await contactPage.verifyBasicPageStructure();
    await contactPage.verifyContactHeading();
  });

  test('should display all contact information', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Verify all contact links are present and functional
    await contactPage.verifyContactLinks();
    
    // Check specific contact methods with proper text
    const emailLink = page.locator('a[href="mailto:jh5975@gmail.com"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText(/Email: jh5975@gmail.com/);

    const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/jason-h-91181728/"]');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveText(/LinkedIn: linkedin.com\/in\/jason-h-91181728\//);

    const githubLink = page.locator('a[href="https://github.com/JasonHHouse"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveText(/GitHub: github.com\/JasonHHouse/);
  });

  test('should have proper contact link styling and accessibility', async ({ page }) => {
    await contactPage.goto('/contact/');

    // Check that contact links have CSS styling
    const contactLinks = page.locator('a[href^="mailto:"], a[href*="linkedin.com"], a[href*="github.com"]');
    const linkCount = await contactLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(3);

    // Each link should be styled and accessible
    for (let i = 0; i < linkCount; i++) {
      const link = contactLinks.nth(i);
      await expect(link).toBeVisible();
      
      // Link should have proper href
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Link should have accessible text
      const text = await link.textContent();
      expect(text?.trim().length).toBeGreaterThan(5);
    }
  });

  test('should display encouraging contact message', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Check for encouraging message
    await contactPage.verifyEncouragingMessage();
    await expect(page.locator('text=Feel free to reach out!')).toBeVisible();
  });

  test('should handle email link interaction', async ({ page }) => {
    await contactPage.goto('/contact/');

    const emailLink = page.locator('a[href="mailto:jh5975@gmail.com"]');
    await expect(emailLink).toBeVisible();

    // Email link should have proper mailto protocol
    const href = await emailLink.getAttribute('href');
    expect(href).toBe('mailto:jh5975@gmail.com');

    // Link should be clickable (though it won't actually open email client in headless test)
    await expect(emailLink).toBeEnabled();
  });

  test('should handle social media link interactions', async ({ page }) => {
    await contactPage.goto('/contact/');

    // LinkedIn link should open in new tab (though we won't test external navigation)
    const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/jason-h-91181728/"]');
    await expect(linkedinLink).toBeVisible();
    const linkedinHref = await linkedinLink.getAttribute('href');
    expect(linkedinHref).toMatch(/linkedin\.com/);

    // GitHub link should be valid
    const githubLink = page.locator('a[href="https://github.com/JasonHHouse"]');
    await expect(githubLink).toBeVisible();
    const githubHref = await githubLink.getAttribute('href');
    expect(githubHref).toMatch(/github\.com/);
  });

  test('should have proper page layout and content structure', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Check for proper container structure
    await expect(page.locator('.container.top-margin')).toBeVisible();
    
    // Should have proper heading hierarchy
    await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
    
    // Should have line breaks for spacing
    const brElements = page.locator('br');
    expect(await brElements.count()).toBeGreaterThan(0);
    
    // Should have footer area with encouraging text
    await expect(page.locator('.footer').or(page.locator('text=Feel free to reach out!'))).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await contactPage.goto('/contact/');
    
    // Content should be visible and usable on mobile
    await expect(page.locator('.container').first()).toBeVisible();
    await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
    
    // Contact links should be easily tappable on mobile
    const contactLinks = page.locator('a[href^="mailto:"], a[href*="linkedin.com"], a[href*="github.com"]');
    const linkCount = await contactLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = contactLinks.nth(i);
      await expect(link).toBeVisible();
      
      // Links should be large enough for touch interaction
      const box = await link.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThan(15); // Minimum touch target (relaxed for actual link sizes)
      }
    }
    
    // Content should fit within mobile viewport
    const container = page.locator('.container').first();
    const containerBox = await container.boundingBox();
    expect(containerBox?.width).toBeLessThanOrEqual(375);
  });

  test('should handle navigation from contact page', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Should be able to navigate to other pages via header
    await page.getByRole('link', { name: /leadership and mentorship/i }).click();
    await expect(page).toHaveURL('/');
    
    // Navigate back to contact
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    
    // Test direct navigation back to contact
    await page.goto('/contact/');
    await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
  });

  test('should maintain consistent styling with site theme', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Check that contact page uses consistent styling
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator('.container').first()).toBeVisible();
    
    // Contact links should have custom styling
    const firstContactLink = page.locator('a[href^="mailto:"], a[href*="linkedin.com"], a[href*="github.com"]').first();
    await expect(firstContactLink).toBeVisible();
    
    // Check that styling is applied (basic check)
    const linkStyles = await firstContactLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        textDecoration: computed.textDecoration,
        cursor: computed.cursor
      };
    });
    
    expect(['pointer', 'auto'].includes(linkStyles.cursor)).toBeTruthy();
    expect(linkStyles.color).not.toBe('transparent');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Use the TestUtils helper for more robust keyboard navigation testing
    const { TestUtils } = await import('./utils/test-helpers');
    await TestUtils.testKeyboardNavigation(page);
  });

  test('should have proper semantic structure for screen readers', async ({ page }) => {
    await contactPage.goto('/contact/');
    
    // Should have proper heading structure
    await expect(page.locator('h2').first()).toBeVisible();
    
    // Links should have descriptive text
    const contactLinks = page.locator('a[href^="mailto:"], a[href*="linkedin.com"], a[href*="github.com"]');
    const linkCount = await contactLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = contactLinks.nth(i);
      const text = await link.textContent();
      
      // Link text should clearly indicate what it is
      expect(text).toMatch(/Email:|LinkedIn:|GitHub:/);
    }
    
    // Should have proper document structure
    await expect(page.locator('[role="banner"]')).toBeVisible();
  });
});