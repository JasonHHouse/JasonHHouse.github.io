/**
 * Comprehensive test suite for the About page
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Content sections and biographical information
 * - Navigation links and internal references
 * - CSS classes application
 * - Accessibility features
 * - SEO content validation
 * - Link functionality and attributes
 * - Text content accuracy
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import About from '../../pages/about';

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

describe('About Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<About />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<About />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<About />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders as a functional component', () => {
      render(<About />);
      expect(screen.getByRole('heading', { name: 'About Jason' })).toBeInTheDocument();
    });
  });

  describe('Page Structure and Headings', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('displays the main page heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'About Jason' });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading.tagName).toBe('H1');
      expect(mainHeading).toHaveClass('top-margin');
    });

    it('displays all section headings with proper hierarchy', () => {
      expect(screen.getByRole('heading', { name: 'Professional Experience', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Leadership Philosophy', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Beyond Work', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Education', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Why I Share', level: 2 })).toBeInTheDocument();
    });

    it('applies correct CSS classes to section headings', () => {
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      
      sectionHeadings.forEach(heading => {
        expect(heading).toHaveClass('top-margin-single');
      });
    });
  });

  describe('Introduction Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('displays the personal introduction', () => {
      const intro = screen.getByText(/I'm Jason House, a seasoned leader passionate about mentorship/);
      expect(intro).toBeInTheDocument();
      expect(intro.textContent).toContain('team development');
      expect(intro.textContent).toContain('technology companies, scouting, and sports');
      expect(intro.textContent).toContain('exceptional leadership isn\'t innate');
    });

    it('contains key leadership philosophy elements', () => {
      expect(screen.getByText(/continuous learning, authentic connection, and purposeful action/)).toBeInTheDocument();
    });
  });

  describe('Professional Experience Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('mentions current role at Indeed.com', () => {
      const indeedMention = screen.getByText(/Currently at Indeed.com/);
      expect(indeedMention).toBeInTheDocument();
      expect(indeedMention.textContent).toContain('cross-functional teams');
      expect(indeedMention.textContent).toContain('driving meaningful outcomes');
    });

    it('includes specific achievements and recognition', () => {
      expect(screen.getByText(/Rookie of the Year.*award at TriTek Solutions in 2012/)).toBeInTheDocument();
      expect(screen.getByText(/exceptional leader.*genuinely cares about his people/)).toBeInTheDocument();
    });

    it('emphasizes mentorship and development focus', () => {
      const mentorshipText = screen.getByText(/What drives me most is developing others/);
      expect(mentorshipText).toBeInTheDocument();
      expect(mentorshipText.textContent).toContain('colleagues who\'ve gone on to become better managers');
      expect(mentorshipText.textContent).toContain('growth you enable in others');
    });
  });

  describe('Leadership Philosophy Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('introduces the philosophy section', () => {
      const philosophyIntro = screen.getByText(/My approach to leadership is rooted in three core principles/);
      expect(philosophyIntro).toBeInTheDocument();
    });

    it('displays the three core principles in a list', () => {
      // Get all lists and find the one with the leadership principles (should have 3 items)
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
      
      // Find the principles list by checking which list has exactly 3 items
      const listItems = screen.getAllByRole('listitem');
      const principlesListItems = listItems.filter(item => {
        // Filter to only the items that contain our principles
        return item.textContent?.includes('Transparency:') || 
               item.textContent?.includes('Empathy:') || 
               item.textContent?.includes('Accountability:');
      });
      expect(principlesListItems).toHaveLength(3);
    });

    it('lists Transparency principle correctly', () => {
      const transparencyItem = screen.getByText(/Transparency:/);
      expect(transparencyItem.tagName).toBe('STRONG');
      expect(screen.getByText(/People thrive when they understand the 'why' behind decisions/)).toBeInTheDocument();
    });

    it('lists Empathy principle correctly', () => {
      const empathyItem = screen.getByText(/Empathy:/);
      expect(empathyItem.tagName).toBe('STRONG');
      expect(screen.getByText(/Leading with understanding creates space for authentic growth/)).toBeInTheDocument();
    });

    it('lists Accountability principle correctly', () => {
      const accountabilityItem = screen.getByText(/Accountability:/);
      expect(accountabilityItem.tagName).toBe('STRONG');
      expect(screen.getByText(/Clear expectations and honest feedback drive performance/)).toBeInTheDocument();
    });

    it('includes additional philosophy explanation', () => {
      const additionalText = screen.getByText(/I thrive in the complexity of human dynamics/);
      expect(additionalText).toBeInTheDocument();
      expect(additionalText.textContent).toContain('take genuine joy in helping others achieve their goals');
      expect(additionalText.textContent).toContain('empathy and a commitment to shared success');
    });
  });

  describe('Beyond Work Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('mentions Eagle Scout achievement and its significance', () => {
      const eagleScout = screen.getByText(/As an Eagle Scout \(2005\)/);
      expect(eagleScout).toBeInTheDocument();
      expect(eagleScout.textContent).toContain('leadership is about service and developing others');
    });

    it('describes technology and innovation projects', () => {
      expect(screen.getByText(/FileHog \(an Android app for mobile file management\)/)).toBeInTheDocument();
      expect(screen.getByText(/Gaps \(a Plex Server collection management tool\)/)).toBeInTheDocument();
    });

    it('connects projects to leadership philosophy', () => {
      const connectionText = screen.getByText(/great leaders must stay curious and continue learning/);
      expect(connectionText).toBeInTheDocument();
    });
  });

  describe('Education Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('mentions RIT education with correct years', () => {
      const education = screen.getByText(/Rochester Institute of Technology \(2006-2010\)/);
      expect(education).toBeInTheDocument();
      expect(education.textContent).toContain('technical skills and leadership capabilities');
      expect(education.textContent).toContain('continue to serve me today');
    });
  });

  describe('Why I Share Section', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('explains the connection between leadership and mentorship', () => {
      const connection = screen.getByText(/Leadership and mentorship are inseparable/);
      expect(connection).toBeInTheDocument();
    });

    it('describes the purpose of sharing experiences', () => {
      const purpose = screen.getByText(/share real experiences, challenges, and lessons learned/);
      expect(purpose).toBeInTheDocument();
      expect(purpose.textContent).toContain('helping others navigate their own leadership journey');
      expect(purpose.textContent).toContain('confidence and clarity');
    });

    it('emphasizes authenticity', () => {
      const authenticity = screen.getByText(/Every story shared is grounded in authenticity/);
      expect(authenticity).toBeInTheDocument();
      expect(authenticity.textContent).toContain('people recognize insincerity');
      expect(authenticity.textContent).toContain('genuine leadership requires genuine connection');
    });

    it('includes call-to-action with contact link', () => {
      const callToAction = screen.getByText(/If you're looking to grow as a leader/);
      expect(callToAction).toBeInTheDocument();
      
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('Links and Navigation', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('contains contact page link with correct href', () => {
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('contact link is properly integrated in context', () => {
      const linkContext = screen.getByText(/Reach out through the/);
      expect(linkContext).toBeInTheDocument();
      
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toBeInTheDocument();
    });

    it('contact link has proper accessibility', () => {
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toHaveAccessibleName('contact page');
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('applies container class to main wrapper', () => {
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });

    it('applies top-margin class to main heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'About Jason' });
      expect(mainHeading).toHaveClass('top-margin');
    });

    it('applies top-margin-single class to section headings', () => {
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      
      sectionHeadings.forEach(heading => {
        expect(heading).toHaveClass('top-margin-single');
      });
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('maintains proper heading hierarchy', () => {
      // Should have two H1 elements (one from Header mock, one from page content)
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(2);
      // Find the page content H1
      const pageH1 = h1Elements.find(h1 => h1.textContent === 'About Jason');
      expect(pageH1).toBeTruthy();
      
      // Should have multiple H2 elements for sections
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBe(5); // 5 main sections
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('uses semantic HTML elements appropriately', () => {
      // Check for proper use of strong elements in philosophy section
      const strongElements = document.querySelectorAll('strong');
      expect(strongElements.length).toBe(3); // Three principles
      
      // Check for proper list structure - there are multiple lists (nav + principles)
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(3); // Nav items + principle items
    });

    it('provides meaningful content structure for screen readers', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(7); // 2 H1 (Header + page) + 5 H2 elements
      
      // Verify each heading has meaningful text
      headings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    it('has accessible link implementation', () => {
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toBeTruthy();
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('SEO and Content Quality', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('contains leadership and mentorship focused keywords', () => {
      expect(screen.getByText(/seasoned leader passionate about mentorship/)).toBeInTheDocument();
      expect(screen.getAllByText(/leadership journey/)).toHaveLength(3); // Appears in multiple places
      expect(screen.getByText(/Leadership Philosophy/)).toBeInTheDocument();
      expect(screen.getByText(/Leadership and mentorship are inseparable/)).toBeInTheDocument();
    });

    it('includes credible professional information', () => {
      expect(screen.getByText(/Indeed.com/)).toBeInTheDocument();
      expect(screen.getByText(/TriTek Solutions/)).toBeInTheDocument();
      expect(screen.getByText(/Rochester Institute of Technology/)).toBeInTheDocument();
      expect(screen.getByText(/Eagle Scout \(2005\)/)).toBeInTheDocument();
    });

    it('provides comprehensive biographical information', () => {
      // Professional experience
      expect(screen.getByText(/cross-functional teams/)).toBeInTheDocument();
      expect(screen.getByText(/Rookie of the Year/)).toBeInTheDocument();
      
      // Personal development
      expect(screen.getByText(/FileHog/)).toBeInTheDocument();
      expect(screen.getByText(/Gaps/)).toBeInTheDocument();
      
      // Education and background
      expect(screen.getByText(/2006-2010/)).toBeInTheDocument();
    });

    it('demonstrates expertise and credibility', () => {
      expect(screen.getByText(/exceptional leader.*genuinely cares/)).toBeInTheDocument();
      expect(screen.getByText(/better managers and leaders themselves/)).toBeInTheDocument();
    });
  });

  describe('Content Quality and Accuracy', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('maintains consistent tone and voice', () => {
      // First person throughout
      expect(screen.getByText(/I'm Jason House/)).toBeInTheDocument();
      expect(screen.getByText(/My approach to leadership/)).toBeInTheDocument();
      expect(screen.getByText(/I thrive in the complexity/)).toBeInTheDocument();
      expect(screen.getByText(/I'm also passionate about/)).toBeInTheDocument();
    });

    it('provides specific, concrete examples', () => {
      // Specific companies and roles
      expect(screen.getByText(/Indeed.com/)).toBeInTheDocument();
      expect(screen.getByText(/TriTek Solutions in 2012/)).toBeInTheDocument();
      
      // Specific projects
      expect(screen.getByText(/FileHog \(an Android app for mobile file management\)/)).toBeInTheDocument();
      expect(screen.getByText(/Gaps \(a Plex Server collection management tool\)/)).toBeInTheDocument();
      
      // Specific achievements
      expect(screen.getByText(/Eagle Scout \(2005\)/)).toBeInTheDocument();
      expect(screen.getByText(/Rochester Institute of Technology \(2006-2010\)/)).toBeInTheDocument();
    });

    it('balances professional and personal elements', () => {
      // Professional content
      expect(screen.getByText(/Professional Experience/)).toBeInTheDocument();
      expect(screen.getByText(/Leadership Philosophy/)).toBeInTheDocument();
      
      // Personal content
      expect(screen.getByText(/Beyond Work/)).toBeInTheDocument();
      expect(screen.getByText(/Why I Share/)).toBeInTheDocument();
    });
  });

  describe('Component Structure and Integration', () => {
    it('renders as a functional React component', () => {
      expect(typeof About).toBe('function');
      expect(About.name).toBe('About');
    });

    it('exports correctly as default export', () => {
      expect(About).toBeDefined();
      render(<About />);
      expect(screen.getByRole('heading', { name: 'About Jason' })).toBeInTheDocument();
    });

    it('integrates Header and Footer components properly', () => {
      render(<About />);
      
      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');
      const mainContent = document.querySelector('.container');
      
      expect(header).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('maintains consistent styling with other pages', () => {
      render(<About />);
      
      expect(document.querySelector('.container')).toBeInTheDocument();
      expect(document.querySelectorAll('.top-margin').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.top-margin-single').length).toBeGreaterThan(0);
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', () => {
      const { rerender } = render(<About />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<About />);
        expect(screen.getByRole('heading', { name: 'About Jason' })).toBeInTheDocument();
      }
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<About />);
      expect(() => unmount()).not.toThrow();
    });

    it('renders consistently across multiple instances', () => {
      const { rerender } = render(<About />);
      const initialHeadingsCount = screen.getAllByRole('heading').length;
      const initialLinksCount = screen.getAllByRole('link').length;
      
      rerender(<About />);
      
      expect(screen.getAllByRole('heading')).toHaveLength(initialHeadingsCount);
      expect(screen.getAllByRole('link')).toHaveLength(initialLinksCount);
    });
  });

  describe('User Experience', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('provides clear call-to-action for engagement', () => {
      const callToAction = screen.getByText(/If you're looking to grow as a leader/);
      expect(callToAction).toBeInTheDocument();
      expect(callToAction.textContent).toContain('face a challenging team dynamic');
      expect(callToAction.textContent).toContain('connect about leadership and mentorship');
    });

    it('makes contact information easily accessible', () => {
      const contactReference = screen.getByText(/Reach out through the/);
      expect(contactReference).toBeInTheDocument();
      
      const contactLink = screen.getByRole('link', { name: 'contact page' });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('presents information in scannable format', () => {
      // Multiple clear sections with headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings).toHaveLength(5);
      
      // Each section is distinct and focused
      sectionHeadings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });
});