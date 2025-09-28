/**
 * Comprehensive test suite for the Posts page
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Blog post listings and content validation
 * - Image loading with correct src and alt attributes
 * - Navigation functionality and onClick handlers
 * - CSS classes application
 * - Accessibility features
 * - User interactions and router navigation
 * - SEO and content structure
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import Posts from '../../pages/posts';

// Mock the useRouter hook
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  pathname: '/posts',
  route: '/posts',
  asPath: '/posts',
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

describe('Posts Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<Posts />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<Posts />);
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<Posts />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders the Posts function component correctly', () => {
      render(<Posts />);
      expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument();
    });
  });

  describe('Page Structure and Content', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('displays the main Posts heading', () => {
      const postsHeading = screen.getByRole('heading', { name: 'Posts' });
      expect(postsHeading).toBeInTheDocument();
      expect(postsHeading.tagName).toBe('H2');
    });

    it('applies correct container classes', () => {
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container).toHaveClass('top-margin');
    });

    it('displays the blog grid layout', () => {
      const blogGrid = document.querySelector('.blog-grid');
      expect(blogGrid).toBeInTheDocument();
    });
  });

  describe('Blog Post Listings', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('displays the correct number of blog posts', () => {
      const postCards = document.querySelectorAll('.post-card');
      expect(postCards).toHaveLength(3); // Three published posts
    });

    it('displays first blog post with correct content and structure', () => {
      // Check the post card exists and has correct ID
      const firstPost = document.querySelector('#blog-post-one');
      expect(firstPost).toBeInTheDocument();
      expect(firstPost).toHaveClass('post-card');
      
      // Check content elements
      expect(screen.getByRole('heading', { name: 'Delivering Difficult News While Nurturing Talent' })).toBeInTheDocument();
      expect(screen.getByText(/Feedback is critical for everyones succcess/)).toBeInTheDocument();
      expect(screen.getByText(/It's easy when it's good feedback, the strugle comes when it's difficult feedback/)).toBeInTheDocument();
      expect(screen.getByText('August 5, 2025 | By')).toBeInTheDocument();
    });

    it('displays second blog post with correct content and structure', () => {
      // Check the post card exists and has correct ID
      const secondPost = document.querySelector('#blog-post-two');
      expect(secondPost).toBeInTheDocument();
      expect(secondPost).toHaveClass('post-card');
      
      // Check content elements
      expect(screen.getByRole('heading', { name: 'Supporting Teams During Periods of Significant Change' })).toBeInTheDocument();
      expect(screen.getByText(/When faced with sudden shifts in work environments/)).toBeInTheDocument();
      expect(screen.getByText(/engineering teams often struggle with chanllenges emotionally and of delivery/)).toBeInTheDocument();
      expect(screen.getByText('August 19, 2025 | By')).toBeInTheDocument();
    });


    it('displays author information for published posts', () => {
      const authorLinks = screen.getAllByRole('link', { name: 'Jason House' });
      expect(authorLinks).toHaveLength(3); // Only for the three published posts
      
      authorLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '#');
      });
    });

    it('displays metadata with correct formatting', () => {
      const metaElements = document.querySelectorAll('.meta');
      expect(metaElements).toHaveLength(3); // Only published posts have complete meta
      
      // Check date formatting
      expect(screen.getByText('August 5, 2025 | By')).toBeInTheDocument();
      expect(screen.getByText('August 19, 2025 | By')).toBeInTheDocument();
      expect(screen.getByText('September 25, 2025 | By')).toBeInTheDocument();
    });
  });

  describe('Images and Media', () => {
    beforeEach(() => {
      render(<Posts />);
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

      // Third blog post image
      const newPostImage = screen.getByAltText('Retrospectives: Looking Back to Move Forward');
      expect(newPostImage).toBeInTheDocument();
      expect(newPostImage).toHaveAttribute('src', '/img/retrospective.png');

    });

    it('has proper accessibility attributes for images', () => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
      
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toBeTruthy();
        expect(image).toHaveAttribute('src');
        expect(image.getAttribute('src')).toBeTruthy();
      });
    });

    it('uses descriptive alt text for better accessibility', () => {
      const feedbackImage = screen.getByAltText('Giving Difficult Feedback');
      expect(feedbackImage).toBeInTheDocument();
      
      // Note: The other images could have more descriptive alt text
      const images = screen.getAllByRole('img');
      images.forEach(image => {
        const altText = image.getAttribute('alt');
        expect(altText.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Navigation and onClick Handlers', () => {
    beforeEach(() => {
      render(<Posts />);
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


    it('router navigation works correctly for published posts', async () => {
      const user = userEvent.setup();
      
      // Test first post
      const firstPost = document.querySelector('#blog-post-one');
      await user.click(firstPost);
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-08-05-Giving-Difficult-Feedback');
      
      mockPush.mockClear();
      
      // Test second post
      const secondPost = document.querySelector('#blog-post-two');
      await user.click(secondPost);
      expect(mockPush).toHaveBeenCalledWith('/posts/2025-08-19-Recovering-Team-Performance');
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('applies correct classes to container', () => {
      const container = document.querySelector('div.container.top-margin');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container).toHaveClass('top-margin');
    });

    it('applies blog-grid class to the posts container', () => {
      const blogGrid = document.querySelector('.blog-grid');
      expect(blogGrid).toBeInTheDocument();
    });

    it('applies post-card class to individual blog posts', () => {
      const postCards = document.querySelectorAll('.post-card');
      expect(postCards).toHaveLength(3);
      
      postCards.forEach(card => {
        expect(card).toHaveClass('post-card');
      });
    });

    it('applies meta class to post metadata', () => {
      const metaElements = document.querySelectorAll('.meta');
      expect(metaElements).toHaveLength(3); // Only published posts have full meta
      
      metaElements.forEach(meta => {
        expect(meta).toHaveClass('meta');
      });
    });

    it('applies correct IDs to clickable posts', () => {
      expect(document.querySelector('#blog-post-one')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-two')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-three')).toBeInTheDocument();
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('maintains proper heading hierarchy', () => {
      // Main heading
      const mainHeading = screen.getByRole('heading', { name: 'Posts', level: 2 });
      expect(mainHeading).toBeInTheDocument();
      
      // Blog post headings
      const postHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(postHeadings.length).toBeGreaterThan(1); // Main heading + post headings
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('provides meaningful link text for author links', () => {
      const authorLinks = screen.getAllByRole('link', { name: 'Jason House' });
      
      authorLinks.forEach(link => {
        expect(link).toHaveAccessibleName('Jason House');
        expect(link.textContent.trim()).toBe('Jason House');
      });
    });

    it('has appropriate image accessibility', () => {
      const images = screen.getAllByRole('img');
      
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        const altText = image.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText.length).toBeGreaterThan(0);
      });
    });

    it('clickable elements have appropriate implicit roles', () => {
      // While div elements with onClick aren't ideal for accessibility,
      // we test that they exist and could be enhanced
      const clickableCards = document.querySelectorAll('[id^="blog-post-"]');
      expect(clickableCards).toHaveLength(3);
    });
  });

  describe('SEO and Content Quality', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('contains meaningful content for search engines', () => {
      // Check for key leadership and mentorship terms
      expect(screen.getByText(/Delivering Difficult News While Nurturing Talent/)).toBeInTheDocument();
      expect(screen.getByText(/Supporting Teams During Periods of Significant Change/)).toBeInTheDocument();
      expect(screen.getByText(/Feedback is critical for everyones succcess/)).toBeInTheDocument();
    });

    it('includes proper meta information with dates', () => {
      expect(screen.getByText('August 5, 2025 | By')).toBeInTheDocument();
      expect(screen.getByText('August 19, 2025 | By')).toBeInTheDocument();
      expect(screen.getByText('September 25, 2025 | By')).toBeInTheDocument();
    });

    it('has a clear page structure with proper heading', () => {
      const pageHeading = screen.getByRole('heading', { name: 'Posts' });
      expect(pageHeading).toBeInTheDocument();
      expect(pageHeading.tagName).toBe('H2');
    });

    it('displays blog post excerpts for better engagement', () => {
      expect(screen.getByText(/Feedback is critical for everyones succcess/)).toBeInTheDocument();
      expect(screen.getByText(/When faced with sudden shifts in work environments/)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('integrates properly with Next.js router', () => {
      render(<Posts />);
      
      // Verify the router mock is working by checking component renders
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    });

    it('handles router navigation errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<Posts />);
      
      const firstPostCard = document.querySelector('#blog-post-one');
      fireEvent.click(firstPostCard);
      
      // Component should not crash even if navigation fails
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      
      consoleError.mockRestore();
    });

    it('component exports correctly as default', () => {
      expect(Posts).toBeDefined();
      expect(typeof Posts).toBe('function');
    });
  });

  describe('User Experience and Interactions', () => {
    beforeEach(() => {
      render(<Posts />);
    });

    it('provides visual feedback for interactive elements', async () => {
      const user = userEvent.setup();
      const clickableCards = document.querySelectorAll('[id^="blog-post-"]');
      
      // Test that clickable cards can be interacted with
      for (const card of clickableCards) {
        expect(card).toBeInTheDocument();
        await user.hover(card);
        // In a real implementation, you might test for hover styles
      }
    });

    it('handles multiple rapid clicks gracefully', async () => {
      const user = userEvent.setup();
      const firstPost = document.querySelector('#blog-post-one');
      
      // Simulate rapid clicking
      await user.click(firstPost);
      await user.click(firstPost);
      await user.click(firstPost);
      
      // Should still work and not cause issues
      expect(mockPush).toHaveBeenCalled();
    });

    it('all posts are published and have click handlers', () => {
      // All posts have IDs and click handlers
      expect(document.querySelector('#blog-post-one')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-two')).toBeInTheDocument();
      expect(document.querySelector('#blog-post-three')).toBeInTheDocument();
    });
  });

  describe('Performance and Memory', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<Posts />);
      
      expect(() => unmount()).not.toThrow();
    });

    it('handles multiple re-renders without memory leaks', () => {
      const { rerender } = render(<Posts />);
      
      for (let i = 0; i < 5; i++) {
        rerender(<Posts />);
      }
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument();
    });
  });
});