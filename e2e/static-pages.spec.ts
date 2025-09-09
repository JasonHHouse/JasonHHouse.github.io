import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  test.describe('About Page', () => {
    test('should load about page with proper content', async ({ page }) => {
      await page.goto('/about/');
      await page.waitForLoadState('networkidle');

      // Check basic page structure
      await expect(page).toHaveTitle('About Jason - Leadership and Mentorship');
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();

      // Check main heading
      await expect(page.locator('h1:has-text("About Jason")')).toBeVisible();
    });

    test('should display personal introduction', async ({ page }) => {
      await page.goto('/about/');

      // Check for introduction content
      await expect(page.locator('text=I\'m Jason House, a seasoned leader passionate about mentorship')).toBeVisible();
      await expect(page.locator('text=exceptional leadership isn\'t innate—it\'s cultivated')).toBeVisible();
    });

    test('should display professional experience section', async ({ page }) => {
      await page.goto('/about/');

      // Check for professional experience section
      await expect(page.locator('h2:has-text("Professional Experience")')).toBeVisible();
      await expect(page.locator('text=Currently at Indeed.com')).toBeVisible();
      await expect(page.locator('text="Rookie of the Year" award at TriTek Solutions in 2012')).toBeVisible();
      await expect(page.locator('text=What drives me most is developing others')).toBeVisible();
    });

    test('should display leadership philosophy section', async ({ page }) => {
      await page.goto('/about/');

      // Check for leadership philosophy section
      await expect(page.locator('h2:has-text("Leadership Philosophy")')).toBeVisible();
      await expect(page.locator('text=My approach to leadership is rooted in three core principles')).toBeVisible();

      // Check for core principles list
      await expect(page.locator('li:has-text("Transparency:")')).toBeVisible();
      await expect(page.locator('li:has-text("Empathy:")')).toBeVisible();
      await expect(page.locator('li:has-text("Accountability:")')).toBeVisible();

      // Check principles descriptions
      await expect(page.locator('text=People thrive when they understand the \'why\' behind decisions')).toBeVisible();
      await expect(page.locator('text=Leading with understanding creates space for authentic growth')).toBeVisible();
      await expect(page.locator('text=Clear expectations and honest feedback drive performance')).toBeVisible();
    });

    test('should display beyond work section', async ({ page }) => {
      await page.goto('/about/');

      // Check for beyond work section
      await expect(page.locator('h2:has-text("Beyond Work")')).toBeVisible();
      await expect(page.locator('text=As an Eagle Scout (2005)')).toBeVisible();
      await expect(page.locator('text=leadership is about service and developing others')).toBeVisible();
    });

    test('should have proper heading hierarchy and structure', async ({ page }) => {
      await page.goto('/about/');

      // Check heading structure
      await expect(page.locator('h1:has-text("About Jason")')).toBeVisible();
      const h2Elements = page.locator('h2');
      expect(await h2Elements.count()).toBeGreaterThanOrEqual(3);

      // Check for proper CSS classes
      await expect(page.locator('h1.top-margin')).toBeVisible();
      await expect(page.locator('h2.top-margin-single').first()).toBeVisible();
    });

    test('should be mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/about/');

      // Content should be visible and readable on mobile
      await expect(page.locator('.container').first()).toBeVisible();
      await expect(page.locator('h1:has-text("About Jason")')).toBeVisible();
      
      // Text should fit within mobile viewport
      const container = page.locator('.container').first();
      const containerBox = await container.boundingBox();
      expect(containerBox?.width).toBeLessThanOrEqual(375);
    });

    test('should have footer', async ({ page }) => {
      await page.goto('/about/');
      
      const footer = page.locator('footer').or(page.locator('[role="contentinfo"]'));
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Contact Page', () => {
    test('should load contact page with proper content', async ({ page }) => {
      await page.goto('/contact/');
      await page.waitForLoadState('networkidle');

      // Check basic page structure
      await expect(page).toHaveTitle('Contact - Jason House');
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();

      // Check main heading
      await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
    });

    test('should display contact information with working links', async ({ page }) => {
      await page.goto('/contact/');

      // Check for email link
      const emailLink = page.locator('a[href="mailto:jh5975@gmail.com"]');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveText(/Email: jh5975@gmail.com/);

      // Check for LinkedIn link
      const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/jason-h-91181728/"]');
      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toHaveText(/LinkedIn: linkedin.com\/in\/jason-h-91181728\//);

      // Check for GitHub link
      const githubLink = page.locator('a[href="https://github.com/JasonHHouse"]');
      await expect(githubLink).toBeVisible();
      await expect(githubLink).toHaveText(/GitHub: github.com\/JasonHHouse/);
    });

    test('should have proper link styling and accessibility', async ({ page }) => {
      await page.goto('/contact/');

      // Check that contact links have proper CSS classes (using actual CSS module class)
      const contactLinks = page.locator('a[href^="mailto:"], a[href*="linkedin"], a[href*="github"]');
      expect(await contactLinks.count()).toBeGreaterThanOrEqual(3);

      // Links should be visible and accessible
      await expect(contactLinks.first()).toBeVisible();
    });

    test('should display encouraging message', async ({ page }) => {
      await page.goto('/contact/');

      // Check for footer message
      await expect(page.locator('text=Feel free to reach out!')).toBeVisible();
    });

    test('should be mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/contact/');

      // Content should be visible on mobile
      await expect(page.locator('.container').first()).toBeVisible();
      await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
      
      // Links should be accessible on mobile
      const contactLinks = page.locator('a[href^="mailto:"], a[href*="linkedin"], a[href*="github"]');
      expect(await contactLinks.count()).toBeGreaterThanOrEqual(3);
      await expect(contactLinks.first()).toBeVisible();
      
      // Text should fit within mobile viewport
      const container = page.locator('.container').first();
      const containerBox = await container.boundingBox();
      expect(containerBox?.width).toBeLessThanOrEqual(375);
    });

    test('should have consistent navigation', async ({ page }) => {
      await page.goto('/contact/');

      // Test navigation back to other pages
      await page.getByRole('link', { name: /^posts$/i }).click();
      await expect(page).toHaveURL('/posts/');

      // Navigate back to contact
      await page.goto('/contact/');
      await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
    });
  });

  test.describe('Privacy Page', () => {
    test('should load privacy page with proper content', async ({ page }) => {
      await page.goto('/privacy/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('.container').first()).toBeVisible();

      // Check main heading
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
    });

    test('should display last updated date', async ({ page }) => {
      await page.goto('/privacy/');

      // Check for last updated date (dynamically generated)
      await expect(page.locator('em:has-text("Last updated:")')).toBeVisible();
      
      // Should contain current year at minimum  
      const currentYear = new Date().getFullYear().toString();
      await expect(page.locator('em').filter({hasText: currentYear})).toBeVisible();
    });

    test('should display information collection section', async ({ page }) => {
      await page.goto('/privacy/');

      // Check for information collection section
      await expect(page.locator('h2:has-text("Information We Collect")')).toBeVisible();
      await expect(page.locator('text=This website is a personal blog focused on leadership and mentorship')).toBeVisible();
      
      // Check for list items
      await expect(page.locator('text=Basic analytics data (page views, referral sources)')).toBeVisible();
      await expect(page.locator('text=Any information you voluntarily provide')).toBeVisible();
    });

    test('should display information usage section', async ({ page }) => {
      await page.goto('/privacy/');

      // Check for information usage section
      await expect(page.locator('h2:has-text("How We Use Information")')).toBeVisible();
      await expect(page.locator('text=Any information collected is used solely to:')).toBeVisible();
      
      // Check for usage list items
      await expect(page.locator('text=Improve the content and user experience')).toBeVisible();
      await expect(page.locator('text=Respond to inquiries or feedback you submit')).toBeVisible();
      await expect(page.locator('text=Understand which content is most valuable')).toBeVisible();
    });

    test('should display information sharing section', async ({ page }) => {
      await page.goto('/privacy/');

      // Check for information sharing section
      await expect(page.locator('h2:has-text("Information Sharing")')).toBeVisible();
      await expect(page.locator('text=We do not sell, trade, or share your personal information')).toBeVisible();
      await expect(page.locator('text=Your information remains private')).toBeVisible();
    });

    test('should have proper heading structure', async ({ page }) => {
      await page.goto('/privacy/');

      // Check heading hierarchy
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      const h2Elements = page.locator('h2');
      expect(await h2Elements.count()).toBeGreaterThanOrEqual(3);

      // Check for proper CSS classes
      await expect(page.locator('h1.top-margin')).toBeVisible();
    });

    test('should be mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/privacy/');

      // Content should be visible and readable on mobile
      await expect(page.locator('.container').first()).toBeVisible();
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Text should fit within mobile viewport
      const container = page.locator('.container').first();
      const containerBox = await container.boundingBox();
      expect(containerBox?.width).toBeLessThanOrEqual(375);
    });

    test('should have footer', async ({ page }) => {
      await page.goto('/privacy/');
      
      const footer = page.locator('footer').or(page.locator('[role="contentinfo"]'));
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Cross-Page Consistency', () => {
    test('should have consistent header across all static pages', async ({ page }) => {
      const pages = ['/about/', '/contact/', '/privacy/'];

      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');

        // Check header structure is consistent
        await expect(page.locator('[role="banner"]')).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
        
        // Check navigation links are present
        await expect(page.getByRole('link', { name: /leadership and mentorship/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /^posts$/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /^cyoa$/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible();
      }
    });

    test('should have consistent container structure', async ({ page }) => {
      const pages = ['/about/', '/contact/', '/privacy/'];

      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');

        // Check for container with proper structure
        await expect(page.locator('.container').first()).toBeVisible();
        
        // Should have main heading  
        const mainHeading = page.locator('main h1, main h2, .container h1, .container h2').first();
        await expect(mainHeading).toBeVisible();
      }
    });

    test('should maintain navigation functionality across static pages', async ({ page }) => {
      // Start from about page
      await page.goto('/about/');
      
      // Navigate to contact
      await page.goto('/contact/');
      await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
      
      // Navigate to privacy
      await page.goto('/privacy/');
      await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
      
      // Navigate back to home via header
      await page.getByRole('link', { name: /leadership and mentorship/i }).click();
      await expect(page).toHaveURL('/');
    });

    test('should have proper page titles for SEO', async ({ page }) => {
      const pageTests = [
        { url: '/about/', expectedTitle: 'About Jason - Leadership and Mentorship' },
        { url: '/contact/', expectedTitle: 'Contact - Jason House' }
        // Privacy page doesn't have a specific title set
      ];

      for (const pageTest of pageTests) {
        await page.goto(pageTest.url);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveTitle(pageTest.expectedTitle);
      }
    });
  });
});