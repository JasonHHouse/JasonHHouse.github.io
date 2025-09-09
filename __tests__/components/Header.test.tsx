/**
 * Comprehensive test suite for the Header component
 * 
 * Tests cover:
 * - Component rendering and DOM structure
 * - Navigation links and their attributes
 * - CSS module class application
 * - Accessibility features and semantic structure
 * - User interactions (clicking and keyboard navigation)
 * - Content validation
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../../pages/common/Header';

// Mock the CSS module
jest.mock('../../pages/common/Header.module.css', () => ({
  headerContainer: 'headerContainer',
  horizontalBar: 'horizontalBar',
}));

// Mock window.location to prevent navigation warnings
delete window.location;
window.location = { ...window.location, assign: jest.fn() };

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the main title as a clickable link', () => {
      const titleLink = screen.getByRole('link', { name: /leadership and mentorship/i });
      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveAttribute('href', '/');
    });

    it('renders the title within an h1 element', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Leadership and Mentorship');
    });

    it('renders navigation menu with all expected links', () => {
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();

      // Check that all navigation links are present
      const navLinks = screen.getAllByRole('link');
      expect(navLinks).toHaveLength(4); // Title link + 3 nav links

      // Check specific navigation links
      expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /cyoa/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });

    it('renders horizontal bar element', () => {
      const horizontalBar = screen.getByTestId('horizontal-bar');
      expect(horizontalBar).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('has correct href attributes for all navigation links', () => {
      // Title link
      expect(screen.getByRole('link', { name: /leadership and mentorship/i }))
        .toHaveAttribute('href', '/');

      // Navigation links
      expect(screen.getByRole('link', { name: /posts/i }))
        .toHaveAttribute('href', '/posts');
      expect(screen.getByRole('link', { name: /cyoa/i }))
        .toHaveAttribute('href', '/cyoa');
      expect(screen.getByRole('link', { name: /about/i }))
        .toHaveAttribute('href', '/about');
    });

    it('renders navigation links in an unordered list', () => {
      const navList = screen.getByRole('list');
      expect(navList).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3); // Posts, CYOA, About
    });

    it('has proper list item structure for navigation', () => {
      const listItems = screen.getAllByRole('listitem');
      
      listItems.forEach((item) => {
        const link = item.querySelector('a');
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('CSS Classes', () => {
    it('applies correct CSS module classes', () => {
      const headerContainer = screen.getByRole('banner');
      expect(headerContainer).toHaveClass('headerContainer');

      const horizontalBar = screen.getByTestId('horizontal-bar');
      expect(horizontalBar).toHaveClass('horizontalBar');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure with nav element', () => {
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has accessible link text', () => {
      const links = screen.getAllByRole('link');
      
      links.forEach((link) => {
        const text = link.textContent?.trim();
        expect(text).toBeTruthy();
        expect(text?.length).toBeGreaterThan(0);
      });
    });

    it('provides proper landmark structure', () => {
      // Navigation landmark
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Banner landmark (header container)
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('has properly structured navigation list', () => {
      const navList = screen.getByRole('list');
      const listItems = screen.getAllByRole('listitem');
      
      expect(navList).toBeInTheDocument();
      expect(listItems).toHaveLength(3);
      
      // Each list item should contain a link
      listItems.forEach((item) => {
        const link = item.querySelector('a');
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    it('allows clicking on the title link', async () => {
      const user = userEvent.setup();
      const titleLink = screen.getByRole('link', { name: /leadership and mentorship/i });
      
      // Verify the link can be focused and clicked
      await user.click(titleLink);
      expect(titleLink).toHaveAttribute('href', '/');
    });

    it('allows clicking on navigation links', async () => {
      const user = userEvent.setup();
      
      const postsLink = screen.getByRole('link', { name: /posts/i });
      const cyoaLink = screen.getByRole('link', { name: /cyoa/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });

      // Test clicking each navigation link
      await user.click(postsLink);
      expect(postsLink).toHaveAttribute('href', '/posts');

      await user.click(cyoaLink);
      expect(cyoaLink).toHaveAttribute('href', '/cyoa');

      await user.click(aboutLink);
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      // Tab through all interactive elements
      await user.tab();
      expect(screen.getByRole('link', { name: /leadership and mentorship/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: /posts/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: /cyoa/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: /about/i })).toHaveFocus();
    });
  });

  describe('Component Structure', () => {
    it('maintains expected DOM structure', () => {
      const headerContainer = screen.getByRole('banner');
      const navigation = screen.getByRole('navigation');
      const heading = screen.getByRole('heading', { level: 1 });
      const navList = screen.getByRole('list');
      const horizontalBar = screen.getByTestId('horizontal-bar');

      // Check parent-child relationships
      expect(headerContainer).toContainElement(navigation);
      expect(headerContainer).toContainElement(horizontalBar);
      expect(navigation).toContainElement(heading);
      expect(navigation).toContainElement(navList);
    });

    it('has correct number of navigation items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);

      // Verify each list item has the expected key attribute (though not directly testable in DOM)
      const postsItem = screen.getByRole('link', { name: /posts/i }).closest('li');
      const cyoaItem = screen.getByRole('link', { name: /cyoa/i }).closest('li');
      const aboutItem = screen.getByRole('link', { name: /about/i }).closest('li');

      expect(postsItem).toBeInTheDocument();
      expect(cyoaItem).toBeInTheDocument();
      expect(aboutItem).toBeInTheDocument();
    });
  });

  describe('Content Validation', () => {
    it('displays correct text content for all links', () => {
      expect(screen.getByRole('link', { name: 'Leadership and Mentorship' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Posts' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'CYOA' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });

    it('does not render contact link (as per current implementation)', () => {
      expect(screen.queryByRole('link', { name: /contact/i })).not.toBeInTheDocument();
    });
  });
});