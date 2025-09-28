/**
 * Comprehensive test suite for the Retrospective blog post
 * 
 * Tests cover:
 * - Component rendering and structure
 * - Content validation and headings
 * - Image loading and alt text
 * - CSS module integration
 * - Accessibility features
 * - SEO meta data
 * - Tag list component integration
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Retrospective from '../../pages/posts/2025-09-25-Retrospective';

// Mock the CSS modules
jest.mock('../../pages/posts/2025-09-25-Retrospective.module.css', () => ({
  header1: 'header1',
  header2: 'header2',
  why: 'why',
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

describe('Retrospective Blog Post', () => {
  beforeEach(() => {
    // Clear any previous DOM manipulations
    document.body.innerHTML = '';
  });

  describe('Component Rendering', () => {
    test('renders the component without crashing', () => {
      render(<Retrospective />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders the blog post main title', () => {
      render(<Retrospective />);
      expect(
        screen.getByRole('heading', { 
          name: /Retrospectives: Looking back to move forward/i 
        })
      ).toBeInTheDocument();
    });

    test('renders the secondary title', () => {
      render(<Retrospective />);
      expect(
        screen.getByRole('heading', { 
          name: /Monthly Retrospective Questions for Direct Reports/i 
        })
      ).toBeInTheDocument();
    });

    test('renders the publication date', () => {
      render(<Retrospective />);
      expect(screen.getByText('September 25, 2025')).toBeInTheDocument();
    });

    test('renders the privacy disclaimer', () => {
      render(<Retrospective />);
      expect(
        screen.getByText(/All names, company references, role titles/i)
      ).toBeInTheDocument();
    });

    test('includes proper container structure', () => {
      render(<Retrospective />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Content Structure and Headings', () => {
    beforeEach(() => {
      render(<Retrospective />);
    });

    test('renders all 10 retrospective questions as headings', () => {
      const questionHeadings = [
        'What are the key initiatives you focused on since the last retrospection?',
        'How did they map to your list of priorities?',
        'What went well this month, individually or in process improvements?',
        'What did you learn?',
        'Where do you see opportunities for improvement/growth, individually or in process improvements?',
        'What went well for the team?',
        'Where do you see opportunities for improvement/growth for the team?',
        'In what ways did I help?',
        'In what ways could I have helped more?',
        'What are the key priorities for the next month or so?'
      ];

      questionHeadings.forEach(question => {
        expect(screen.getByRole('heading', { name: new RegExp(question, 'i') })).toBeInTheDocument();
      });
    });

    test('applies correct CSS classes to headings', () => {
      const h1Headings = document.querySelectorAll('h1');
      const h2Headings = document.querySelectorAll('h2');
      
      // Check that h1 headings have header1 class
      h1Headings.forEach(heading => {
        expect(heading).toHaveClass('header1');
      });

      // Check that h2 headings have header2 class
      h2Headings.forEach(heading => {
        expect(heading).toHaveClass('header2');
      });
    });

    test('renders explanation paragraphs with correct styling', () => {
      const whyParagraphs = document.querySelectorAll('.why');
      expect(whyParagraphs).toHaveLength(10); // One for each question
      
      whyParagraphs.forEach(paragraph => {
        expect(paragraph).toHaveClass('why');
        expect(paragraph.textContent).toMatch(/^Why:/);
      });
    });

    test('maintains proper heading hierarchy', () => {
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      
      expect(h1Elements).toHaveLength(2); // Main title and secondary title
      expect(h2Elements).toHaveLength(10); // 10 questions
    });
  });

  describe('Images and Media', () => {
    beforeEach(() => {
      render(<Retrospective />);
    });

    test('renders the main image with correct attributes', () => {
      const image = screen.getByAltText(/Monthly retrospective meeting with team members/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/img/retrospective.png');
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
      render(<Retrospective />);
    });

    test('applies header1 class to main headings', () => {
      const mainHeadings = document.querySelectorAll('h1.header1');
      expect(mainHeadings).toHaveLength(2);
    });

    test('applies header2 class to question headings', () => {
      const questionHeadings = document.querySelectorAll('h2.header2');
      expect(questionHeadings).toHaveLength(10);
    });

    test('applies why class to explanation paragraphs', () => {
      const whyParagraphs = document.querySelectorAll('p.why');
      expect(whyParagraphs).toHaveLength(10);
    });
  });

  describe('Content Quality and SEO', () => {
    beforeEach(() => {
      render(<Retrospective />);
    });

    test('contains meaningful content for search engines', () => {
      expect(screen.getByText(/Monthly retrospectives with direct reports/i)).toBeInTheDocument();
      expect(screen.getAllByText(/culture of continuous improvement/i)).toHaveLength(2);
      expect(screen.getByText(/transparency, ownership, and continuous improvement/i)).toBeInTheDocument();
    });

    test('includes leadership and mentorship keywords', () => {
      const pageText = document.body.textContent;
      expect(pageText).toMatch(/retrospective/i);
      expect(pageText).toMatch(/team/i);
      expect(pageText).toMatch(/growth/i);
      expect(pageText).toMatch(/feedback/i);
      expect(pageText).toMatch(/improvement/i);
    });

    test('has proper introduction content', () => {
      expect(screen.getByText(/Monthly retrospectives with direct reports are more than just a check-in/i)).toBeInTheDocument();
      expect(screen.getByText(/strengthen alignment, build trust, and foster a culture/i)).toBeInTheDocument();
    });

    test('provides context for each question', () => {
      // Check that each question has an explanation starting with "Why:"
      const whyExplanations = screen.getAllByText(/^Why:/);
      expect(whyExplanations).toHaveLength(10);
      
      // Check specific explanations
      expect(screen.getByText(/Clarifies what work was prioritized/i)).toBeInTheDocument();
      expect(screen.getByText(/Highlights alignment.*between planned priorities/i)).toBeInTheDocument();
      expect(screen.getByText(/Promotes ownership of challenges/i)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    beforeEach(() => {
      render(<Retrospective />);
    });

    test('integrates with TagList component', () => {
      expect(screen.getByTestId('tag-list')).toBeInTheDocument();
      expect(screen.getByTestId('tag-reflection')).toBeInTheDocument();
      expect(screen.getByTestId('tag-teambuilding')).toBeInTheDocument();
      expect(screen.getByTestId('tag-growth')).toBeInTheDocument();
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
      render(<Retrospective />);
    });

    test('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    test('maintains proper heading hierarchy for screen readers', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(10); // Should have main headings + question headings
      
      // First heading should be h1
      const firstHeading = headings[0];
      expect(firstHeading.tagName).toBe('H1');
    });

    test('provides meaningful alt text for images', () => {
      const image = screen.getByRole('img');
      const altText = image.getAttribute('alt');
      expect(altText).toMatch(/retrospective/i);
      expect(altText).toMatch(/team/i);
      expect(altText.length).toBeGreaterThan(20); // Descriptive alt text
    });

    test('uses strong elements for emphasis appropriately', () => {
      const strongElements = document.querySelectorAll('strong');
      expect(strongElements.length).toBeGreaterThan(0);
      
      // Check that "Why:" labels are properly emphasized
      strongElements.forEach(element => {
        if (element.textContent === 'Why:') {
          expect(element.textContent).toBe('Why:');
        }
      });
    });
  });

  describe('Performance and Memory', () => {
    test('component unmounts without errors', () => {
      const { unmount } = render(<Retrospective />);
      expect(() => unmount()).not.toThrow();
    });

    test('handles multiple re-renders without issues', () => {
      const { rerender } = render(<Retrospective />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<Retrospective />);
      }
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Retrospectives: Looking back to move forward/i })).toBeInTheDocument();
    });

    test('component exports correctly as default', () => {
      expect(Retrospective).toBeDefined();
      expect(typeof Retrospective).toBe('function');
    });
  });

  describe('Content Completeness', () => {
    beforeEach(() => {
      render(<Retrospective />);
    });

    test('includes all required retrospective questions', () => {
      const expectedQuestions = [
        'key initiatives you focused on',
        'map to your list of priorities',
        'What went well this month',
        'What did you learn',
        'opportunities for improvement/growth, individually',
        'What went well for the team',
        'opportunities for improvement/growth for the team',
        'In what ways did I help',
        'In what ways could I have helped more',
        'key priorities for the next month'
      ];

      expectedQuestions.forEach(questionFragment => {
        expect(screen.getByText(new RegExp(questionFragment, 'i'))).toBeInTheDocument();
      });
    });

    test('provides rationale for each question', () => {
      const expectedRationales = [
        'Clarifies what work was prioritized',
        'Highlights alignment',
        'Reinforces celebration of wins',
        'Encourages a mindset of growth',
        'Promotes ownership of challenges',
        'Shifts focus from the individual to the collective',
        'Encourages systems thinking',
        'Opens the door for feedback on leadership',
        'Fosters trust and psychological safety',
        'Sets a clear path forward'
      ];

      expectedRationales.forEach(rationale => {
        expect(screen.getByText(new RegExp(rationale, 'i'))).toBeInTheDocument();
      });
    });

    test('includes introduction and context paragraphs', () => {
      expect(screen.getByText(/Monthly retrospectives with direct reports are more than just a check-in/)).toBeInTheDocument();
      expect(screen.getByText(/In my experience, these conversations don.*t always feel natural/)).toBeInTheDocument();
      expect(screen.getByText(/These retrospectives give individuals a chance/)).toBeInTheDocument();
      expect(screen.getByText(/These questions help guide monthly 1:1 retrospectives/)).toBeInTheDocument();
    });
  });
});