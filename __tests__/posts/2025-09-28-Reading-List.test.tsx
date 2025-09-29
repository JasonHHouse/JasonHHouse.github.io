/**
 * Comprehensive test suite for the Reading List blog post
 * 
 * Tests cover:
 * - Component rendering and structure
 * - Content validation and book recommendations
 * - Image loading and alt text
 * - CSS module integration
 * - Accessibility features
 * - SEO meta data
 * - Tag list component integration
 * - Book categorization and content completeness
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadingList from '../../pages/posts/2025-09-28-Reading-List';

// Mock the CSS modules
jest.mock('../../pages/posts/2025-09-28-Reading-List.module.css', () => ({
  header1: 'header1',
  categoryHeader: 'categoryHeader',
  bookCard: 'bookCard',
  bookTitle: 'bookTitle',
  author: 'author',
  description: 'description',
  keyTakeaway: 'keyTakeaway',
  practiceList: 'practiceList',
}));

// Mock Header and Footer components
jest.mock('../../pages/common/Header', () => {
  return function MockHeader() {
    return <header data-testid="header" role="banner">Mock Header</header>;
  };
});

jest.mock('../../pages/common/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer" role="contentinfo">Mock Footer</footer>;
  };
});

// Mock TagList component
jest.mock('../../components/TagList', () => {
  return function MockTagList({ tags }: { tags: string[] }) {
    return (
      <div data-testid="tag-list">
        {tags.map((tag, index) => (
          <span key={index} data-testid={`tag-${tag}`}>
            {tag}
          </span>
        ))}
      </div>
    );
  };
});

// Mock SEO component
jest.mock('../../pages/common/SEO', () => {
  return function MockSEO({ title, description, keywords, type, publishedTime, tags, readingTime, image }: any) {
    return (
      <div data-testid="seo-component">
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="type" content={type} />
        <meta name="publishedTime" content={publishedTime} />
        <meta name="readingTime" content={readingTime} />
        <meta name="image" content={image} />
      </div>
    );
  };
});

describe('Reading List Blog Post', () => {
  beforeEach(() => {
    // Clear any previous DOM manipulations
    document.body.innerHTML = '';
  });

  describe('Component Rendering', () => {
    test('renders the component without crashing', () => {
      render(<ReadingList />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders the blog post main title', () => {
      render(<ReadingList />);
      expect(
        screen.getByRole('heading', { 
          name: /Essential Leadership Reading List/i 
        })
      ).toBeInTheDocument();
    });

    test('renders the publication date', () => {
      render(<ReadingList />);
      expect(screen.getByText('September 28, 2025')).toBeInTheDocument();
    });

    test('renders the privacy disclaimer', () => {
      render(<ReadingList />);
      expect(
        screen.getByText(/All names, company references, role titles/i)
      ).toBeInTheDocument();
    });

    test('includes proper container structure', () => {
      render(<ReadingList />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Content Structure and Categories', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('renders all book category headings', () => {
      const categories = [
        'Core Leadership Foundations',
        'Coaching and Development',
        'Organizational Excellence',
        'Personal Effectiveness',
        'Leading Through Change',
        'Building Your Reading Practice'
      ];

      categories.forEach(category => {
        expect(screen.getByRole('heading', { name: new RegExp(category, 'i') })).toBeInTheDocument();
      });
    });

    test('applies correct CSS classes to category headings', () => {
      const categoryHeadings = document.querySelectorAll('.categoryHeader');
      expect(categoryHeadings.length).toBeGreaterThan(4); // Should have multiple category headers
      
      categoryHeadings.forEach(heading => {
        expect(heading).toHaveClass('categoryHeader');
      });
    });

    test('renders book cards with correct structure', () => {
      const bookCards = document.querySelectorAll('.bookCard');
      expect(bookCards.length).toBeGreaterThan(8); // Should have multiple book recommendations
      
      bookCards.forEach(card => {
        expect(card).toHaveClass('bookCard');
      });
    });

    test('maintains proper heading hierarchy', () => {
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      
      expect(h1Elements).toHaveLength(1); // Main title
      expect(h2Elements.length).toBeGreaterThan(4); // Category headers
      expect(h3Elements.length).toBeGreaterThan(8); // Book titles
    });
  });

  describe('Book Recommendations', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('displays essential leadership books', () => {
      const essentialBooks = [
        'The Five Dysfunctions of a Team',
        'First, Break All the Rules',
        'The Culture Code',
        'The Coaching Habit',
        'Crucial Conversations',
        'Radical Candor'
      ];

      essentialBooks.forEach(bookTitle => {
        expect(screen.getByRole('heading', { name: new RegExp(bookTitle, 'i') })).toBeInTheDocument();
      });
    });

    test('includes author information for each book', () => {
      const authors = [
        'Patrick Lencioni',
        'Marcus Buckingham',
        'Daniel Coyle',
        'Michael Bungay Stanier',
        'Kim Scott'
      ];

      authors.forEach(author => {
        expect(screen.getByText(new RegExp(author, 'i'))).toBeInTheDocument();
      });
    });

    test('provides descriptions for book recommendations', () => {
      // Check for specific book descriptions
      expect(screen.getByText(/revolutionized how I think about team dynamics/i)).toBeInTheDocument();
      expect(screen.getByText(/challenged many of my assumptions about management/i)).toBeInTheDocument();
      expect(screen.getByText(/practical guide transformed how I approach one-on-ones/i)).toBeInTheDocument();
    });

    test('includes key takeaways for each book', () => {
      const keyTakeaways = screen.getAllByText(/Key Takeaway:/);
      expect(keyTakeaways.length).toBeGreaterThan(8); // Should have key takeaways for most books
      
      keyTakeaways.forEach(takeaway => {
        expect(takeaway.closest('.keyTakeaway')).toBeInTheDocument();
      });
    });

    test('applies correct CSS classes to book elements', () => {
      const bookTitles = document.querySelectorAll('.bookTitle');
      const authors = document.querySelectorAll('.author');
      const descriptions = document.querySelectorAll('.description');
      const keyTakeaways = document.querySelectorAll('.keyTakeaway');

      expect(bookTitles.length).toBeGreaterThan(8);
      expect(authors.length).toBeGreaterThan(8);
      expect(descriptions.length).toBeGreaterThan(8);
      expect(keyTakeaways.length).toBeGreaterThan(8);
    });
  });

  describe('Images and Media', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('renders the main image with correct attributes', () => {
      const image = screen.getByAltText(/Stack of leadership and management books/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/img/books.png');
    });

    test('image has proper accessibility attributes', () => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).toBeTruthy();
      expect(image.getAttribute('alt').length).toBeGreaterThan(10);
    });

    test('image has proper styling attributes', () => {
      const image = screen.getByRole('img');
      expect(image).toHaveStyle({
        width: '100%',
        height: 'auto',
        margin: '1rem 0'
      });
    });
  });

  describe('CSS Module Integration', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('applies header1 class to main heading', () => {
      const mainHeadings = document.querySelectorAll('h1.header1');
      expect(mainHeadings).toHaveLength(1);
    });

    test('applies categoryHeader class to section headings', () => {
      const categoryHeadings = document.querySelectorAll('h2.categoryHeader');
      expect(categoryHeadings.length).toBeGreaterThan(4);
    });

    test('applies bookCard class to book recommendation containers', () => {
      const bookCards = document.querySelectorAll('.bookCard');
      expect(bookCards.length).toBeGreaterThan(8);
    });

    test('applies practiceList class to reading practice list', () => {
      const practiceList = document.querySelector('.practiceList');
      expect(practiceList).toBeInTheDocument();
      expect(practiceList).toHaveClass('practiceList');
    });
  });

  describe('Content Quality and SEO', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('contains meaningful content for search engines', () => {
      expect(screen.getByText(/Throughout my leadership journey, books have been invaluable companions/i)).toBeInTheDocument();
      expect(screen.getByText(/practical guides that have directly influenced/i)).toBeInTheDocument();
      expect(screen.getByText(/transform how you lead and develop others/i)).toBeInTheDocument();
    });

    test('includes leadership and development keywords', () => {
      const pageText = document.body.textContent;
      expect(pageText).toMatch(/leadership/i);
      expect(pageText).toMatch(/development/i);
      expect(pageText).toMatch(/management/i);
      expect(pageText).toMatch(/coaching/i);
      expect(pageText).toMatch(/team/i);
    });

    test('provides introduction and context', () => {
      expect(screen.getByText(/I've organized this reading list into categories/i)).toBeInTheDocument();
      expect(screen.getByText(/Whether you're a new manager or a seasoned executive/i)).toBeInTheDocument();
    });

    test('includes practical application guidance', () => {
      expect(screen.getByText(/Reading is just the beginning/i)).toBeInTheDocument();
      expect(screen.getByText(/Take notes actively/i)).toBeInTheDocument();
      expect(screen.getByText(/Experiment immediately/i)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('integrates with TagList component', () => {
      expect(screen.getByTestId('tag-list')).toBeInTheDocument();
      expect(screen.getByTestId('tag-leadership')).toBeInTheDocument();
      expect(screen.getByTestId('tag-development')).toBeInTheDocument();
      expect(screen.getByTestId('tag-resources')).toBeInTheDocument();
    });

    test('includes SEO component with correct props', () => {
      expect(screen.getByTestId('seo-component')).toBeInTheDocument();
    });

    test('has proper page structure with post and sidebar sections', () => {
      const postSection = document.querySelector('.post');
      const sidebarSection = document.querySelector('.sidebar');
      
      expect(postSection).toBeInTheDocument();
      expect(sidebarSection).toBeInTheDocument();
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    test('maintains proper heading hierarchy for screen readers', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(15); // Should have main heading + category headings + book titles
      
      // First heading should be h1
      const firstHeading = headings[0];
      expect(firstHeading.tagName).toBe('H1');
    });

    test('provides meaningful alt text for images', () => {
      const image = screen.getByRole('img');
      const altText = image.getAttribute('alt');
      expect(altText).toMatch(/leadership/i);
      expect(altText).toMatch(/books/i);
      expect(altText.length).toBeGreaterThan(20); // Descriptive alt text
    });

    test('uses strong elements for emphasis appropriately', () => {
      const strongElements = document.querySelectorAll('strong');
      expect(strongElements.length).toBeGreaterThan(10);
      
      // Check that "Key Takeaway:" labels are properly emphasized
      const keyTakeawayLabels = screen.getAllByText('Key Takeaway:');
      keyTakeawayLabels.forEach(label => {
        expect(label.tagName).toBe('STRONG');
      });
    });

    test('has proper list structure for reading practices', () => {
      const practiceList = document.querySelector('.practiceList');
      expect(practiceList).toBeInTheDocument();
      expect(practiceList.tagName).toBe('UL');
      
      const listItems = practiceList.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(3);
    });
  });

  describe('Performance and Memory', () => {
    test('component unmounts without errors', () => {
      const { unmount } = render(<ReadingList />);
      expect(() => unmount()).not.toThrow();
    });

    test('handles multiple re-renders without issues', () => {
      const { rerender } = render(<ReadingList />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<ReadingList />);
      }
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Essential Leadership Reading List/i })).toBeInTheDocument();
    });

    test('component exports correctly as default', () => {
      expect(ReadingList).toBeDefined();
      expect(typeof ReadingList).toBe('function');
    });
  });

  describe('Content Completeness', () => {
    beforeEach(() => {
      render(<ReadingList />);
    });

    test('includes books across all major leadership categories', () => {
      // Core Leadership
      expect(screen.getByText(/Five Dysfunctions of a Team/i)).toBeInTheDocument();
      
      // Coaching
      expect(screen.getByText(/Coaching Habit/i)).toBeInTheDocument();
      expect(screen.getByText(/Crucial Conversations/i)).toBeInTheDocument();
      
      // Organizational
      expect(screen.getByText(/Good to Great/i)).toBeInTheDocument();
      expect(screen.getByText(/Multipliers/i)).toBeInTheDocument();
      
      // Personal Effectiveness
      expect(screen.getByText(/Atomic Habits/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /^Mindset$/i })).toBeInTheDocument();
      
      // Change Management
      expect(screen.getByText(/Leading Change/i)).toBeInTheDocument();
      expect(screen.getByText(/Hard Thing About Hard Things/i)).toBeInTheDocument();
    });

    test('provides actionable reading practice guidance', () => {
      expect(screen.getByText(/Take notes actively/i)).toBeInTheDocument();
      expect(screen.getByText(/Experiment immediately/i)).toBeInTheDocument();
      expect(screen.getByText(/Share with your team/i)).toBeInTheDocument();
      expect(screen.getByText(/Revisit favorites/i)).toBeInTheDocument();
      expect(screen.getByText(/Connect the dots/i)).toBeInTheDocument();
    });

    test('includes personal reflection and call to action', () => {
      expect(screen.getByText(/Leadership development is a continuous journey/i)).toBeInTheDocument();
      expect(screen.getByText(/What books have shaped your leadership approach/i)).toBeInTheDocument();
      expect(screen.getByText(/would love to hear your recommendations/i)).toBeInTheDocument();
    });

    test('maintains consistent book card structure', () => {
      const bookCards = document.querySelectorAll('.bookCard');
      
      bookCards.forEach(card => {
        // Each book card should have a title
        const title = card.querySelector('.bookTitle');
        expect(title).toBeInTheDocument();
        
        // Each book card should have an author
        const author = card.querySelector('.author');
        expect(author).toBeInTheDocument();
        
        // Each book card should have a description
        const description = card.querySelector('.description');
        expect(description).toBeInTheDocument();
      });
    });
  });
});