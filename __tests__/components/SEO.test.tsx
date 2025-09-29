/**
 * Test suite for the SEO component and helper functions
 * 
 * Tests cover:
 * - Component rendering without crashing
 * - Helper functions (calculateReadingTime, generateMetaDescription)
 * - PropTypes and TypeScript interface compliance
 */
import React from 'react';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import SEO, { calculateReadingTime, generateMetaDescription } from '../../pages/common/SEO';

// Mock the useRouter hook
const mockRouter = {
  pathname: '/',
  asPath: '/',
  route: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
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

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-head">{children}</div>;
  };
});

describe('SEO Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders without crashing with default props', () => {
      const { container } = render(<SEO />);
      expect(container).toBeInTheDocument();
    });

    it('renders the Head component wrapper', () => {
      const { getByTestId } = render(<SEO />);
      expect(getByTestId('mock-head')).toBeInTheDocument();
    });

    it('handles custom props correctly', () => {
      const customProps = {
        title: 'Custom Page Title',
        description: 'Custom page description',
        keywords: ['custom', 'keywords'],
        author: 'Custom Author',
        type: 'article' as const,
        image: '/custom-image.jpg',
        publishedTime: '2025-01-01T00:00:00Z',
        modifiedTime: '2025-01-02T00:00:00Z',
        tags: ['tag1', 'tag2'],
        readingTime: '5',
        canonical: 'https://example.com/custom',
        noindex: true
      };

      const { container } = render(<SEO {...customProps} />);
      expect(container).toBeInTheDocument();
    });

    it('handles different content types', () => {
      const { rerender, container } = render(<SEO type="website" />);
      expect(container).toBeInTheDocument();

      rerender(<SEO type="article" />);
      expect(container).toBeInTheDocument();
    });

    it('handles optional props gracefully', () => {
      const { container } = render(
        <SEO 
          publishedTime="2025-01-01T00:00:00Z"
          tags={['leadership', 'mentorship']}
          readingTime="5"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Router Integration', () => {
    it('works with different router paths', () => {
      mockRouter.pathname = '/posts/test-article';
      mockRouter.asPath = '/posts/test-article';
      
      const { container } = render(<SEO />);
      expect(container).toBeInTheDocument();
    });

    it('works with homepage path', () => {
      mockRouter.pathname = '/';
      mockRouter.asPath = '/';
      
      const { container } = render(<SEO />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('exports correctly as default export', () => {
      expect(SEO).toBeDefined();
      expect(typeof SEO).toBe('function');
    });

    it('has correct component name', () => {
      expect(SEO.name).toBe('SEO');
    });
  });
});

describe('SEO Helper Functions', () => {
  describe('calculateReadingTime', () => {
    it('calculates reading time for short content', () => {
      const shortContent = 'This is a short piece of content with about twenty words total.';
      const readingTime = calculateReadingTime(shortContent);
      expect(readingTime).toBe(1); // Minimum 1 minute
    });

    it('calculates reading time for longer content', () => {
      const longContent = Array(400).fill('word').join(' '); // 400 words
      const readingTime = calculateReadingTime(longContent);
      expect(readingTime).toBe(2); // 400 words / 200 wpm = 2 minutes
    });

    it('rounds up reading time to nearest minute', () => {
      const content = Array(250).fill('word').join(' '); // 250 words
      const readingTime = calculateReadingTime(content);
      expect(readingTime).toBe(2); // 250 / 200 = 1.25, rounded up to 2
    });

    it('handles empty content', () => {
      const readingTime = calculateReadingTime('');
      expect(readingTime).toBe(1); // Math.ceil(0 / 200) results in 1
    });

    it('handles content with multiple spaces', () => {
      const content = 'Word    with    multiple    spaces';
      const readingTime = calculateReadingTime(content);
      expect(readingTime).toBe(1);
    });

    it('calculates correctly for exact word counts', () => {
      const content = Array(200).fill('word').join(' '); // Exactly 200 words
      const readingTime = calculateReadingTime(content);
      expect(readingTime).toBe(1); // 200 / 200 = 1 minute
    });

    it('handles very long content', () => {
      const content = Array(1000).fill('word').join(' '); // 1000 words
      const readingTime = calculateReadingTime(content);
      expect(readingTime).toBe(5); // 1000 / 200 = 5 minutes
    });
  });

  describe('generateMetaDescription', () => {
    it('returns content as-is when under length limit', () => {
      const shortContent = 'This is a short description.';
      const result = generateMetaDescription(shortContent, 160);
      expect(result).toBe(shortContent);
    });

    it('truncates content at word boundary when over limit', () => {
      const longContent = 'This is a very long description that exceeds the character limit and should be truncated at a word boundary to maintain readability.';
      const result = generateMetaDescription(longContent, 50);
      expect(result).toBe('This is a very long description that exceeds the...');
      expect(result.length).toBeLessThanOrEqual(53); // 50 + '...'
    });

    it('removes HTML tags from content', () => {
      const htmlContent = '<p>This is <strong>bold</strong> text with <a href="#">links</a>.</p>';
      const result = generateMetaDescription(htmlContent, 160);
      expect(result).toBe('This is bold text with links.');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('normalizes multiple spaces', () => {
      const spacedContent = 'This   has    multiple     spaces.';
      const result = generateMetaDescription(spacedContent, 160);
      expect(result).toBe('This has multiple spaces.');
    });

    it('handles content with no spaces when truncating', () => {
      const noSpaceContent = 'Thisisaverylongstringwithoutanyspacesthatexceedsthelimit';
      const result = generateMetaDescription(noSpaceContent, 20);
      expect(result).toBe('Thisisaverylongstrin...');
      expect(result.length).toBe(23); // 20 + '...'
    });

    it('uses default length of 160 characters', () => {
      const longContent = Array(50).fill('word').join(' '); // Much longer than 160 chars
      const result = generateMetaDescription(longContent);
      expect(result.length).toBeLessThanOrEqual(163); // 160 + '...'
    });

    it('trims whitespace from content', () => {
      const whitespaceContent = '   Content with leading and trailing spaces   ';
      const result = generateMetaDescription(whitespaceContent, 160);
      expect(result).toBe('Content with leading and trailing spaces');
    });

    it('handles complex HTML content', () => {
      const complexHtml = '<div class="content"><h1>Title</h1><p>This is a paragraph with <em>emphasis</em> and <strong>strong</strong> text.</p></div>';
      const result = generateMetaDescription(complexHtml, 100);
      expect(result).toBe('TitleThis is a paragraph with emphasis and strong text.');
    });

    it('handles content that is exactly at the limit', () => {
      const exactContent = 'A'.repeat(50);
      const result = generateMetaDescription(exactContent, 50);
      expect(result).toBe(exactContent);
      expect(result.length).toBe(50);
    });

    it('handles very short limits', () => {
      const content = 'This is a test';
      const result = generateMetaDescription(content, 5);
      expect(result).toBe('This...');
      expect(result.length).toBe(7); // 5 + '...' but no word boundary found
    });
  });

  describe('Function exports', () => {
    it('exports calculateReadingTime function', () => {
      expect(calculateReadingTime).toBeDefined();
      expect(typeof calculateReadingTime).toBe('function');
    });

    it('exports generateMetaDescription function', () => {
      expect(generateMetaDescription).toBeDefined();
      expect(typeof generateMetaDescription).toBe('function');
    });
  });
});