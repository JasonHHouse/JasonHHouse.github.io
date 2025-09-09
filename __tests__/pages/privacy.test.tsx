/**
 * Comprehensive test suite for the Privacy Policy page
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Privacy policy content sections and accuracy
 * - Legal information display and completeness
 * - Contact link integration
 * - CSS classes application
 * - Accessibility features
 * - SEO and content structure
 * - Dynamic date display
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Privacy from '../../pages/privacy';

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

describe('Privacy Policy Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<Privacy />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<Privacy />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<Privacy />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders as a functional component', () => {
      render(<Privacy />);
      expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
    });
  });

  describe('Page Structure and Headings', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('displays the main page heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'Privacy Policy' });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading.tagName).toBe('H1');
      expect(mainHeading).toHaveClass('top-margin');
    });

    it('displays all section headings with proper hierarchy', () => {
      expect(screen.getByRole('heading', { name: 'Information We Collect', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'How We Use Information', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Information Sharing', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Cookies', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'External Links', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Data Security', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Changes to This Policy', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Contact', level: 2 })).toBeInTheDocument();
    });

    it('applies correct CSS classes to section headings', () => {
      const topMarginSingleHeadings = [
        screen.getByRole('heading', { name: 'Information We Collect' }),
        screen.getByRole('heading', { name: 'Cookies' }),
        screen.getByRole('heading', { name: 'External Links' }),
        screen.getByRole('heading', { name: 'Data Security' }),
        screen.getByRole('heading', { name: 'Changes to This Policy' }),
        screen.getByRole('heading', { name: 'Contact' })
      ];
      
      topMarginSingleHeadings.forEach(heading => {
        expect(heading).toHaveClass('top-margin-single');
      });
    });
  });

  describe('Last Updated Date', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('displays the last updated date', () => {
      const lastUpdated = screen.getByText(/Last updated:/);
      expect(lastUpdated).toBeInTheDocument();
      expect(lastUpdated.tagName).toBe('EM');
    });

    it('includes current date in last updated field', () => {
      const expectedDate = new Date().toLocaleDateString();
      const lastUpdated = screen.getByText(new RegExp(`Last updated: ${expectedDate}`));
      expect(lastUpdated).toBeInTheDocument();
    });

    it('formats the date correctly', () => {
      const lastUpdated = screen.getByText(/Last updated:/);
      const dateRegex = /Last updated: \d{1,2}\/\d{1,2}\/\d{4}/;
      expect(lastUpdated.textContent).toMatch(dateRegex);
    });
  });

  describe('Information We Collect Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('explains what information is collected', () => {
      const introText = screen.getByText(/This website is a personal blog focused on leadership and mentorship content/);
      expect(introText).toBeInTheDocument();
      expect(introText.textContent).toContain('We collect minimal information');
    });

    it('lists specific information collected', () => {
      expect(screen.getByText(/Basic analytics data \(page views, referral sources\) through standard web server logs/)).toBeInTheDocument();
      expect(screen.getByText(/Any information you voluntarily provide through contact forms or comments/)).toBeInTheDocument();
    });

    it('displays information in a list format', () => {
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThanOrEqual(2); // Header nav + content lists
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThanOrEqual(2);
      
      // Verify the content lists contain expected information
      expect(screen.getByText('Basic analytics data (page views, referral sources) through standard web server logs')).toBeInTheDocument();
      expect(screen.getByText('Any information you voluntarily provide through contact forms or comments')).toBeInTheDocument();
    });
  });

  describe('How We Use Information Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('explains information usage purpose', () => {
      const purposeText = screen.getByText(/Any information collected is used solely to:/);
      expect(purposeText).toBeInTheDocument();
    });

    it('lists specific uses of information', () => {
      expect(screen.getByText(/Improve the content and user experience of this blog/)).toBeInTheDocument();
      expect(screen.getByText(/Respond to inquiries or feedback you submit/)).toBeInTheDocument();
      expect(screen.getByText(/Understand which content is most valuable to readers/)).toBeInTheDocument();
    });

    it('displays usage information in a list format', () => {
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThanOrEqual(2); // At least two lists on the page
    });
  });

  describe('Information Sharing Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('clearly states no sharing policy', () => {
      const noSharingText = screen.getByText(/We do not sell, trade, or share your personal information with third parties/);
      expect(noSharingText).toBeInTheDocument();
      expect(noSharingText.textContent).toContain('Your information remains private');
      expect(noSharingText.textContent).toContain('only used for the purposes stated above');
    });
  });

  describe('Cookies Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('explains cookie usage', () => {
      const cookieText = screen.getByText(/This website may use minimal cookies for basic functionality and analytics/);
      expect(cookieText).toBeInTheDocument();
      expect(cookieText.textContent).toContain('do not store personal information');
      expect(cookieText.textContent).toContain('improve your browsing experience');
    });
  });

  describe('External Links Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('disclaims responsibility for external sites', () => {
      const externalText = screen.getByText(/This blog may contain links to external websites/);
      expect(externalText).toBeInTheDocument();
      expect(externalText.textContent).toContain('not responsible for the privacy practices of other sites');
      expect(externalText.textContent).toContain('encourage you to review their privacy policies');
    });
  });

  describe('Data Security Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('mentions security measures', () => {
      const securityText = screen.getByText(/We implement reasonable security measures/);
      expect(securityText).toBeInTheDocument();
      expect(securityText.textContent).toContain('protect any information collected through this website');
    });
  });

  describe('Changes to Policy Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('explains policy update process', () => {
      const changesText = screen.getByText(/This privacy policy may be updated from time to time/);
      expect(changesText).toBeInTheDocument();
      expect(changesText.textContent).toContain('Any changes will be reflected with an updated date');
      expect(changesText.textContent).toContain('at the top of this page');
    });
  });

  describe('Contact Section', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('provides contact information for policy questions', () => {
      const contactText = screen.getByText(/If you have questions about this privacy policy/);
      expect(contactText).toBeInTheDocument();
      expect(contactText.textContent).toContain('please contact us through the');
    });

    it('includes functional contact page link', () => {
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('contact link is properly integrated in context', () => {
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toHaveAccessibleName('contact page');
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('applies container class to main wrapper', () => {
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });

    it('applies top-margin class to main heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'Privacy Policy' });
      expect(mainHeading).toHaveClass('top-margin');
    });

    it('applies top-margin-single class to appropriate section headings', () => {
      const topMarginSingleHeadings = document.querySelectorAll('h2.top-margin-single');
      expect(topMarginSingleHeadings.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('maintains proper heading hierarchy', () => {
      // Should have two H1 elements (Header + Privacy page)
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(2);
      
      // Find the Privacy Policy H1 specifically 
      const privacyH1 = screen.getByRole('heading', { name: 'Privacy Policy', level: 1 });
      expect(privacyH1).toBeInTheDocument();
      expect(privacyH1).toHaveTextContent('Privacy Policy');
      
      // Should have multiple H2 elements for sections
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBe(8); // 8 main sections
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('uses semantic HTML elements appropriately', () => {
      // Check for proper list structure
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThanOrEqual(2);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThanOrEqual(5);
    });

    it('provides meaningful content structure for screen readers', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(10); // 2 H1 elements (Header + Privacy page) + 8 H2 elements
      
      // Verify each heading has meaningful text
      headings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    it('has accessible link implementation', () => {
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toHaveAttribute('href');
      expect(contactLink.getAttribute('href')).toBeTruthy();
      expect(contactLink.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  describe('SEO and Legal Content Quality', () => {
    beforeEach(() => {
      render(<Privacy />);
    });

    it('contains comprehensive privacy policy information', () => {
      expect(screen.getByText(/personal blog focused on leadership and mentorship/)).toBeInTheDocument();
      expect(screen.getByText(/minimal information/)).toBeInTheDocument();
      expect(screen.getByText(/do not sell, trade, or share/)).toBeInTheDocument();
      expect(screen.getByText(/reasonable security measures/)).toBeInTheDocument();
    });

    it('includes all required privacy policy sections', () => {
      const requiredSections = [
        'Information We Collect',
        'How We Use Information', 
        'Information Sharing',
        'Cookies',
        'External Links',
        'Data Security',
        'Changes to This Policy',
        'Contact'
      ];
      
      requiredSections.forEach(section => {
        expect(screen.getByRole('heading', { name: section })).toBeInTheDocument();
      });
    });

    it('provides clear and transparent language', () => {
      expect(screen.getByText(/We collect minimal information/)).toBeInTheDocument();
      expect(screen.getByText(/used solely to/)).toBeInTheDocument();
      expect(screen.getByText(/We do not sell, trade, or share/)).toBeInTheDocument();
      expect(screen.getByText(/Your information remains private/)).toBeInTheDocument();
    });

    it('includes proper contact information for legal inquiries', () => {
      expect(screen.getByText(/questions about this privacy policy/)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'contact page' })).toBeInTheDocument();
    });
  });

  describe('Component Structure and Integration', () => {
    it('renders as a functional React component', () => {
      expect(typeof Privacy).toBe('function');
      expect(Privacy.name).toBe('Privacy');
    });

    it('exports correctly as default export', () => {
      expect(Privacy).toBeDefined();
      render(<Privacy />);
      expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
    });

    it('integrates Header and Footer components properly', () => {
      render(<Privacy />);
      
      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');
      const mainContent = document.querySelector('.container');
      
      expect(header).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('maintains consistent styling with other pages', () => {
      render(<Privacy />);
      
      expect(document.querySelector('.container')).toBeInTheDocument();
      expect(document.querySelectorAll('.top-margin').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.top-margin-single').length).toBeGreaterThan(0);
    });
  });

  describe('Dynamic Content', () => {
    it('generates current date dynamically', () => {
      render(<Privacy />);
      
      const today = new Date().toLocaleDateString();
      const dateElement = screen.getByText(new RegExp(today));
      expect(dateElement).toBeInTheDocument();
    });

    it('date updates when component re-renders', () => {
      const { rerender } = render(<Privacy />);
      
      const firstRenderDate = screen.getByText(/Last updated:/).textContent;
      
      // Rerender the component
      rerender(<Privacy />);
      
      const secondRenderDate = screen.getByText(/Last updated:/).textContent;
      expect(secondRenderDate).toBe(firstRenderDate); // Should be consistent within same day
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', () => {
      const { rerender } = render(<Privacy />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<Privacy />);
        expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument();
      }
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<Privacy />);
      expect(() => unmount()).not.toThrow();
    });

    it('renders consistently across multiple instances', () => {
      const { rerender } = render(<Privacy />);
      const initialHeadingsCount = screen.getAllByRole('heading').length;
      const initialLinksCount = screen.getAllByRole('link').length;
      
      rerender(<Privacy />);
      
      expect(screen.getAllByRole('heading')).toHaveLength(initialHeadingsCount);
      expect(screen.getAllByRole('link')).toHaveLength(initialLinksCount);
    });
  });
});