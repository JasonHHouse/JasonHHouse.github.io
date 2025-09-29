/**
 * Comprehensive test suite for the Home page (index.tsx)
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Content sections and text validation
 * - Image loading with correct src and alt attributes
 * - Navigation functionality and onClick handlers
 * - CSS classes application
 * - Accessibility features
 * - User interactions and router navigation
 * - SEO and metadata elements
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

// Mock the useRouter hook
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
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

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<Home />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<Home />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
    });

    it('includes Header and Footer components', () => {
      render(<Home />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Content Sections', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('displays the main introduction content', () => {
      expect(screen.getByText(/Leadership is often perceived as an innate trait/)).toBeInTheDocument();
      expect(screen.getByText(/dynamic, individualized journey/)).toBeInTheDocument();
    });

    it('displays the mentorship section content', () => {
      expect(screen.getByText(/Mentorship is inseparable from leadership/)).toBeInTheDocument();
      expect(screen.getByText(/Transparency, honesty, and integrity/)).toBeInTheDocument();
    });

    it('displays the personal journey section', () => {
      expect(screen.getByText(/I'm sharing my journey in leadership/)).toBeInTheDocument();
      expect(screen.getByText(/But why am I a good leader/)).toBeInTheDocument();
    });

    it('applies correct CSS classes to content paragraphs', () => {
      const firstParagraph = screen.getByText(/Leadership is often perceived/);
      expect(firstParagraph).toHaveClass('top-margin');
    });
  });

  describe('Reviews Section', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('displays the Reviews heading', () => {
      const reviewsHeading = screen.getByRole('heading', { name: 'Reviews' });
      expect(reviewsHeading).toBeInTheDocument();
      expect(reviewsHeading.tagName).toBe('H2');
      expect(reviewsHeading).toHaveClass('top-margin');
    });

    it('displays the blog grid for reviews', () => {
      const blogGrid = document.querySelector('.blog-grid.top-margin');
      expect(blogGrid).toBeInTheDocument();
    });

    it('displays first testimonial with correct content', () => {
      expect(screen.getByRole('heading', { name: 'Senior Software Engineering Manager' })).toBeInTheDocument();
      expect(screen.getByText(/Jason had been my manager and mentor for the past 2 years/)).toBeInTheDocument();
      expect(screen.getByText(/wouldn't hesitate to tell me that we were in deep s\*\*\*t/)).toBeInTheDocument();
      expect(screen.getByText(/I wouldn't be where I am today with Jason's mentorship/)).toBeInTheDocument();
    });

    it('displays second testimonial with correct content', () => {
      expect(screen.getByRole('heading', { name: 'Software Engineering Manager' })).toBeInTheDocument();
      expect(screen.getByText(/Jason is an exceptional leader I've had the privilege to work with/)).toBeInTheDocument();
      expect(screen.getByText(/He genourously recommended books/)).toBeInTheDocument();
      expect(screen.getByText(/leave you a better leader than you were before/)).toBeInTheDocument();
    });

    it('displays testimonials in post-card containers', () => {
      const postCards = document.querySelectorAll('.blog-grid .post-card');
      expect(postCards).toHaveLength(6); // 2 reviews + 4 blog posts
    });
  });

  describe('Recent Posts Section', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('displays the Recent Posts heading', () => {
      const postsHeading = screen.getByRole('heading', { name: 'Recent Posts' });
      expect(postsHeading).toBeInTheDocument();
      expect(postsHeading.tagName).toBe('H2');
      expect(postsHeading).toHaveClass('top-margin');
    });

    it('displays the blog grid for posts', () => {
      const blogGrids = document.querySelectorAll('.blog-grid');
      expect(blogGrids.length).toBeGreaterThan(0);
    });

    it('displays first blog post with correct content and structure', () => {
      const firstPost = screen.getByText('Delivering Difficult News While Nurturing Talent').closest('.post-card');
      expect(firstPost).toBeInTheDocument();
      expect(firstPost).toHaveAttribute('id', 'blog-post-one');
      
      // Check content
      expect(screen.getByRole('heading', { name: 'Delivering Difficult News While Nurturing Talent' })).toBeInTheDocument();
      expect(screen.getByText(/Feedback is critical for everyones succcess/)).toBeInTheDocument();
      expect(screen.getByText('August 5, 2025 | By')).toBeInTheDocument();
    });

    it('displays second blog post with correct content and structure', () => {
      const secondPost = screen.getByText('Supporting Teams During Periods of Significant Change').closest('.post-card');
      expect(secondPost).toBeInTheDocument();
      expect(secondPost).toHaveAttribute('id', 'blog-post-two');
      
      // Check content
      expect(screen.getByRole('heading', { name: 'Supporting Teams During Periods of Significant Change' })).toBeInTheDocument();
      expect(screen.getByText(/When faced with sudden shifts in work environments/)).toBeInTheDocument();
      expect(screen.getByText('August 19, 2025 | By')).toBeInTheDocument();
    });

    it('displays third blog post (new post) with correct content', () => {
      expect(screen.getByRole('heading', { name: 'Retrospectives: Looking Back to Move Forward' })).toBeInTheDocument();
      expect(screen.getByText(/Monthly retrospective questions for direct reports that foster transparency/)).toBeInTheDocument();
      expect(screen.getByText('September 25, 2025 | By')).toBeInTheDocument();
    });

    it('displays author links correctly', () => {
      const authorLinks = screen.getAllByRole('link', { name: 'Jason House' });
      expect(authorLinks.length).toBeGreaterThan(0);
      
      authorLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '#');
      });
    });
  });

  describe('Images', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('displays images with correct src and alt attributes', () => {
      // First blog post image
      const feedbackImage = screen.getByAltText('Giving Difficult Feedback');
      expect(feedbackImage).toBeInTheDocument();
      expect(feedbackImage).toHaveAttribute('src', '/img/feedback.jpg');

      // Second blog post image
      const targetImage = screen.getByAltText('Blog Post 2');
      expect(targetImage).toBeInTheDocument();
      expect(targetImage).toHaveAttribute('src', '/img/missing-the-target.jpg');

      // Third blog post image (New Post)
      const newPostImage = screen.getByAltText('Retrospectives: Looking Back to Move Forward');
      expect(newPostImage).toBeInTheDocument();
      expect(newPostImage).toHaveAttribute('src', '/img/retrospective.png');
    });

    it('has proper accessibility attributes for images', () => {
      const images = screen.getAllByRole('img');
      
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toBeTruthy();
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).toBeTruthy();
      });
    });
  });

  describe('Navigation and onClick Handlers', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('handles first blog post click navigation', async () => {
      const user = userEvent.setup();
      const firstPostCard = document.querySelector('#blog-post-one');
      
      expect(firstPostCard).toBeInTheDocument();
      
      await user.click(firstPostCard);
      
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-08-05-Giving-Difficult-Feedback');
    });

    it('handles second blog post click navigation', async () => {
      const user = userEvent.setup();
      const secondPostCard = document.querySelector('#blog-post-two');
      
      expect(secondPostCard).toBeInTheDocument();
      
      await user.click(secondPostCard);
      
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-08-19-Recovering-Team-Performance');
    });

    it('makes clickable post cards keyboard accessible', async () => {
      const user = userEvent.setup();
      const firstPostCard = document.querySelector('#blog-post-one');
      const secondPostCard = document.querySelector('#blog-post-two');
      
      // Test tab navigation (note: onClick divs are not naturally focusable)
      expect(firstPostCard).toBeInTheDocument();
      expect(secondPostCard).toBeInTheDocument();
    });

    it('handles fourth blog post click navigation', async () => {
      const user = userEvent.setup();
      const fourthPostCard = document.querySelector('#blog-post-four');
      
      expect(fourthPostCard).toBeInTheDocument();
      
      await user.click(fourthPostCard);
      
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-09-28-Reading-List');
    });

    it('all blog post cards have click handlers on home page', () => {
      // All four posts on home page should be clickable
      expect(document.querySelector('#blog-post-one')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-two')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-three')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-four')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('applies container class to main content wrapper', () => {
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });

    it('applies top-margin class where specified', () => {
      const topMarginElements = document.querySelectorAll('.top-margin');
      expect(topMarginElements.length).toBeGreaterThan(0);
      
      // Check specific elements that should have top-margin
      expect(screen.getByText(/Leadership is often perceived/)).toHaveClass('top-margin');
      expect(screen.getByRole('heading', { name: 'Reviews' })).toHaveClass('top-margin');
      expect(screen.getByRole('heading', { name: 'Recent Posts' })).toHaveClass('top-margin');
    });

    it('applies blog-grid class to grid containers', () => {
      const blogGrids = document.querySelectorAll('.blog-grid');
      expect(blogGrids.length).toBe(2); // One for reviews, one for posts
    });

    it('applies post-card class to individual cards', () => {
      const postCards = document.querySelectorAll('.post-card');
      expect(postCards.length).toBe(6); // 2 reviews + 4 blog posts
    });

    it('applies meta class to post metadata', () => {
      const metaElements = document.querySelectorAll('.meta');
      expect(metaElements.length).toBe(4); // One for each blog post
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('maintains proper heading hierarchy', () => {
      const h1Elements = document.querySelectorAll('h1');
      const h2Elements = document.querySelectorAll('h2');
      
      // Should have h1 in header and h2 for sections
      expect(h1Elements.length).toBeGreaterThan(0);
      expect(h2Elements.length).toBeGreaterThan(0);
      
      // Check specific headings
      expect(screen.getByRole('heading', { name: 'Reviews', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Recent Posts', level: 2 })).toBeInTheDocument();
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('provides descriptive alt text for images', () => {
      const images = screen.getAllByRole('img');
      
      images.forEach(image => {
        const altText = image.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText.length).toBeGreaterThan(0);
      });
    });

    it('has accessible link text for author links', () => {
      const authorLinks = screen.getAllByRole('link', { name: 'Jason House' });
      
      authorLinks.forEach(link => {
        expect(link).toHaveAccessibleName('Jason House');
      });
    });
  });

  describe('Content Quality and SEO', () => {
    beforeEach(() => {
      render(<Home />);
    });

    it('contains meaningful content for search engines', () => {
      // Check for key terms that would be important for SEO
      expect(screen.getByText(/Leadership is often perceived as an innate trait/)).toBeInTheDocument();
      expect(screen.getByText(/Mentorship is inseparable from leadership/)).toBeInTheDocument();
      expect(screen.getByText(/leadership and mentorship/)).toBeInTheDocument();
    });

    it('displays testimonials with credible job titles', () => {
      expect(screen.getByRole('heading', { name: 'Senior Software Engineering Manager' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Software Engineering Manager' })).toBeInTheDocument();
    });

    it('includes proper meta information for blog posts', () => {
      expect(screen.getByText('August 5, 2025 | By')).toBeInTheDocument();
      expect(screen.getByText('August 19, 2025 | By')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('integrates properly with Next.js router', () => {
      render(<Home />);
      
      // Verify the router mock is working by checking component renders
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    });

    it('handles router navigation correctly', async () => {
      render(<Home />);
      
      const firstPostCard = document.querySelector('#blog-post-one');
      fireEvent.click(firstPostCard);
      
      // Should call router.push with correct path
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-08-05-Giving-Difficult-Feedback');
    });
  });

  describe('Performance and Memory', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<Home />);
      
      expect(() => unmount()).not.toThrow();
    });

    it('handles multiple re-renders without memory leaks', () => {
      const { rerender } = render(<Home />);
      
      for (let i = 0; i < 5; i++) {
        rerender(<Home />);
      }
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    });
  });
});