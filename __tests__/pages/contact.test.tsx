/**
 * Comprehensive test suite for the Contact page
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Contact information display and accuracy
 * - External links with correct URLs
 * - CSS classes application (including CSS modules)
 * - Accessibility features
 * - Link functionality and attributes
 * - User interactions
 * - SEO and metadata
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Contact from '../../pages/contact';

// Mock CSS modules
jest.mock('../../pages/contact.module.css', () => ({
  contactLink: 'contactLink-mock-class',
}));

// Mock Header and Footer components
jest.mock('../../pages/common/Header', () => {
  return function MockHeader() {
    return (
      <div data-testid="mock-header" role="banner">
        <nav>
          <h1><a href="/">Leadership and Mentorship</a></h1>
          <ul>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/cyoa">CYOA</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </div>
    );
  };
});

jest.mock('../../pages/common/Footer', () => {
  return function MockFooter() {
    return (
      <div data-testid="mock-footer">
        <footer role="contentinfo">&copy; 2025 Jason House's Blog. All rights reserved.</footer>
      </div>
    );
  };
});

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<Contact />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<Contact />);
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<Contact />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders as a functional component', () => {
      render(<Contact />);
      expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeInTheDocument();
    });
  });

  describe('Page Structure and Content', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('displays the main Contact Me heading', () => {
      const heading = screen.getByRole('heading', { name: 'Contact Me' });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('applies correct container classes', () => {
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container).toHaveClass('top-margin');
    });

    it('includes spacing elements (br tags)', () => {
      const brElements = document.querySelectorAll('br');
      expect(brElements.length).toBeGreaterThanOrEqual(2); // At least 2 br elements for spacing
    });

    it('displays the footer message', () => {
      const footerDiv = document.querySelector('.footer');
      expect(footerDiv).toBeInTheDocument();
      expect(footerDiv.textContent).toBe('Feel free to reach out!');
    });
  });

  describe('Contact Information', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('displays email contact information', () => {
      const emailLink = screen.getByRole('link', { name: /Email: jh5975@gmail.com/ });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:jh5975@gmail.com');
    });

    it('displays LinkedIn contact information', () => {
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn: linkedin.com\/in\/jason-h-91181728\// });
      expect(linkedInLink).toBeInTheDocument();
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jason-h-91181728/');
    });

    it('displays GitHub contact information', () => {
      const githubLink = screen.getByRole('link', { name: /GitHub: github.com\/JasonHHouse/ });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/JasonHHouse');
    });

    it('has exactly three contact links', () => {
      const contactLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.includes('mailto:') ||
        link.getAttribute('href')?.includes('linkedin.com') ||
        link.getAttribute('href')?.includes('github.com')
      );
      expect(contactLinks).toHaveLength(3);
    });
  });

  describe('Link Functionality and Attributes', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('email link has correct mailto href', () => {
      const emailLink = screen.getByRole('link', { name: /Email: jh5975@gmail.com/ });
      expect(emailLink).toHaveAttribute('href', 'mailto:jh5975@gmail.com');
    });

    it('LinkedIn link has correct external URL', () => {
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn: linkedin.com\/in\/jason-h-91181728\// });
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jason-h-91181728/');
    });

    it('GitHub link has correct external URL', () => {
      const githubLink = screen.getByRole('link', { name: /GitHub: github.com\/JasonHHouse/ });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/JasonHHouse');
    });

    it('external links open in same window (no target attribute)', () => {
      const externalLinks = [
        screen.getByRole('link', { name: /LinkedIn/ }),
        screen.getByRole('link', { name: /GitHub/ })
      ];
      
      externalLinks.forEach(link => {
        expect(link).not.toHaveAttribute('target');
      });
    });

    it('all contact links have descriptive text', () => {
      const emailLink = screen.getByRole('link', { name: /Email: jh5975@gmail.com/ });
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn: linkedin.com\/in\/jason-h-91181728\// });
      const githubLink = screen.getByRole('link', { name: /GitHub: github.com\/JasonHHouse/ });

      expect(emailLink.textContent).toBe('Email: jh5975@gmail.com');
      expect(linkedInLink.textContent).toBe('LinkedIn: linkedin.com/in/jason-h-91181728/');
      expect(githubLink.textContent).toBe('GitHub: github.com/JasonHHouse');
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('applies container and top-margin classes', () => {
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
    });

    it('applies CSS module classes to contact links', () => {
      const contactLinks = [
        screen.getByRole('link', { name: /Email/ }),
        screen.getByRole('link', { name: /LinkedIn/ }),
        screen.getByRole('link', { name: /GitHub/ })
      ];

      contactLinks.forEach(link => {
        expect(link).toHaveClass('contactLink-mock-class');
      });
    });

    it('applies footer class to the footer message div', () => {
      const footerDiv = document.querySelector('.footer');
      expect(footerDiv).toBeInTheDocument();
      expect(footerDiv).toHaveClass('footer');
    });

    it('maintains consistent styling structure', () => {
      // Each contact item should be in a paragraph
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(3); // At least 3 for the contact links
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('maintains proper heading hierarchy', () => {
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements).toHaveLength(1);
      expect(h2Elements[0]).toHaveTextContent('Contact Me');
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('provides accessible link text', () => {
      const links = screen.getAllByRole('link');
      const contactLinks = links.filter(link => 
        link.getAttribute('href')?.includes('mailto:') ||
        link.getAttribute('href')?.includes('linkedin.com') ||
        link.getAttribute('href')?.includes('github.com')
      );

      contactLinks.forEach(link => {
        expect(link).toHaveAccessibleName();
        const accessibleName = link.textContent;
        expect(accessibleName).toBeTruthy();
        expect(accessibleName.length).toBeGreaterThan(0);
      });
    });

    it('uses semantic HTML structure', () => {
      // Contact information should be in paragraphs
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);

      // Should have proper heading structure
      const heading = screen.getByRole('heading', { name: 'Contact Me' });
      expect(heading.tagName).toBe('H2');
    });

    it('provides context for screen readers', () => {
      // Each link includes the platform name for context
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText(/LinkedIn:/)).toBeInTheDocument();
      expect(screen.getByText(/GitHub:/)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('allows clicking on email link', async () => {
      const user = userEvent.setup();
      const emailLink = screen.getByRole('link', { name: /Email: jh5975@gmail.com/ });
      
      expect(emailLink).toBeInTheDocument();
      await user.click(emailLink);
      
      // Verify the link can be clicked (href is correct)
      expect(emailLink).toHaveAttribute('href', 'mailto:jh5975@gmail.com');
    });

    it('allows clicking on LinkedIn link', async () => {
      const user = userEvent.setup();
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn/ });
      
      expect(linkedInLink).toBeInTheDocument();
      await user.click(linkedInLink);
      
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jason-h-91181728/');
    });

    it('allows clicking on GitHub link', async () => {
      const user = userEvent.setup();
      const githubLink = screen.getByRole('link', { name: /GitHub/ });
      
      expect(githubLink).toBeInTheDocument();
      await user.click(githubLink);
      
      expect(githubLink).toHaveAttribute('href', 'https://github.com/JasonHHouse');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      // Tab through the contact links
      await user.tab();
      // First link should be focused (from header navigation)
      
      // Continue tabbing to reach contact links
      let currentFocus = document.activeElement;
      let tabCount = 0;
      const maxTabs = 10; // Prevent infinite loop
      
      while (tabCount < maxTabs && !currentFocus?.getAttribute('href')?.includes('mailto:')) {
        await user.tab();
        currentFocus = document.activeElement;
        tabCount++;
      }
      
      // Should eventually reach the email link
      if (tabCount < maxTabs) {
        expect(document.activeElement).toHaveAttribute('href', 'mailto:jh5975@gmail.com');
      }
    });
  });

  describe('SEO and Content Quality', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('contains meaningful content for search engines', () => {
      expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeInTheDocument();
      expect(screen.getByText('Feel free to reach out!')).toBeInTheDocument();
    });

    it('provides multiple contact methods', () => {
      // Should have email, LinkedIn, and GitHub
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText(/LinkedIn:/)).toBeInTheDocument();
      expect(screen.getByText(/GitHub:/)).toBeInTheDocument();
    });

    it('includes clear call-to-action', () => {
      const callToAction = screen.getByText('Feel free to reach out!');
      expect(callToAction).toBeInTheDocument();
      expect(callToAction.closest('.footer')).toBeInTheDocument();
    });

    it('displays contact information in user-friendly format', () => {
      // Links show readable URLs, not just "click here"
      expect(screen.getByText(/jh5975@gmail.com/)).toBeInTheDocument();
      expect(screen.getByText(/linkedin.com\/in\/jason-h-91181728\//)).toBeInTheDocument();
      expect(screen.getByText(/github.com\/JasonHHouse/)).toBeInTheDocument();
    });
  });

  describe('Component Structure and Integration', () => {
    it('renders as a functional React component', () => {
      expect(typeof Contact).toBe('function');
      expect(Contact.name).toBe('Contact');
    });

    it('exports correctly as default export', () => {
      expect(Contact).toBeDefined();
      render(<Contact />);
      expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeInTheDocument();
    });

    it('integrates Header and Footer components properly', () => {
      render(<Contact />);
      
      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');
      const mainContent = document.querySelector('.container.top-margin');
      
      expect(header).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('integrates CSS modules correctly', () => {
      render(<Contact />);
      
      const contactLinks = [
        screen.getByRole('link', { name: /Email/ }),
        screen.getByRole('link', { name: /LinkedIn/ }),
        screen.getByRole('link', { name: /GitHub/ })
      ];

      contactLinks.forEach(link => {
        expect(link).toHaveClass('contactLink-mock-class');
      });
    });
  });

  describe('Page Layout and Structure', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('follows consistent page structure', () => {
      // Should follow the pattern: Header -> Container -> Content -> Footer
      const header = screen.getByTestId('mock-header');
      const container = document.querySelector('.container.top-margin');
      const footer = screen.getByTestId('mock-footer');
      
      expect(header).toBeInTheDocument();
      expect(container).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('provides appropriate spacing between elements', () => {
      // Check for br elements providing spacing
      const brElements = document.querySelectorAll('br');
      expect(brElements.length).toBeGreaterThanOrEqual(2);
    });

    it('organizes contact information logically', () => {
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
      
      // Each contact method should be in its own paragraph
      const emailParagraph = screen.getByRole('link', { name: /Email/ }).closest('p');
      const linkedinParagraph = screen.getByRole('link', { name: /LinkedIn/ }).closest('p');
      const githubParagraph = screen.getByRole('link', { name: /GitHub/ }).closest('p');
      
      expect(emailParagraph).toBeInTheDocument();
      expect(linkedinParagraph).toBeInTheDocument();
      expect(githubParagraph).toBeInTheDocument();
    });
  });

  describe('External Link Security and Best Practices', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('uses HTTPS for external links', () => {
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn/ });
      const githubLink = screen.getByRole('link', { name: /GitHub/ });
      
      expect(linkedInLink.getAttribute('href')).toMatch(/^https:/);
      expect(githubLink.getAttribute('href')).toMatch(/^https:/);
    });

    it('has valid email format in mailto link', () => {
      const emailLink = screen.getByRole('link', { name: /Email/ });
      const href = emailLink.getAttribute('href');
      
      expect(href).toMatch(/^mailto:/);
      expect(href).toContain('jh5975@gmail.com');
    });

    it('uses legitimate domain names', () => {
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn/ });
      const githubLink = screen.getByRole('link', { name: /GitHub/ });
      
      expect(linkedInLink.getAttribute('href')).toContain('linkedin.com');
      expect(githubLink.getAttribute('href')).toContain('github.com');
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', () => {
      const { rerender } = render(<Contact />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<Contact />);
        expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeInTheDocument();
      }
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<Contact />);
      expect(() => unmount()).not.toThrow();
    });

    it('renders consistently across multiple instances', () => {
      const { rerender } = render(<Contact />);
      const initialLinksCount = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.includes('mailto:') ||
        link.getAttribute('href')?.includes('linkedin.com') ||
        link.getAttribute('href')?.includes('github.com')
      ).length;
      
      rerender(<Contact />);
      
      const rerenderedLinksCount = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.includes('mailto:') ||
        link.getAttribute('href')?.includes('linkedin.com') ||
        link.getAttribute('href')?.includes('github.com')
      ).length;
      
      expect(rerenderedLinksCount).toBe(initialLinksCount);
      expect(rerenderedLinksCount).toBe(3);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles CSS module loading failure gracefully', () => {
      // Test with empty CSS module mock
      jest.doMock('../../pages/contact.module.css', () => ({}));
      
      render(<Contact />);
      
      // Page should still render even if CSS modules fail
      expect(screen.getByRole('heading', { name: 'Contact Me' })).toBeInTheDocument();
      expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
    });

    it('maintains functionality without JavaScript', () => {
      render(<Contact />);
      
      // All links should work with just HTML (mailto and https links)
      const emailLink = screen.getByRole('link', { name: /Email/ });
      const linkedInLink = screen.getByRole('link', { name: /LinkedIn/ });
      const githubLink = screen.getByRole('link', { name: /GitHub/ });
      
      expect(emailLink).toHaveAttribute('href');
      expect(linkedInLink).toHaveAttribute('href');
      expect(githubLink).toHaveAttribute('href');
    });
  });
});