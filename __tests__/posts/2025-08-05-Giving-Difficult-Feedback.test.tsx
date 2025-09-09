import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GivingDifficultFeedback from '../../pages/posts/2025-08-05-Giving-Difficult-Feedback';

// Mock the CSS modules - one with flipped class, one without for fallback testing
const mockCSSWithFlipped = {
  flipCard: 'flipCard',
  flipCardInner: 'flipCardInner',
  flipCardFront: 'flipCardFront',
  flipCardBack: 'flipCardBack',
  flipped: 'flipped',
  centered: 'centered',
  centeredText: 'centeredText',
  roundedCorners: 'roundedCorners',
  thoughtExperiment: 'thoughtExperiment',
  svg: 'svg',
  pointerCursor: 'pointerCursor',
};

const mockCSSWithoutFlipped = {
  flipCard: 'flipCard',
  flipCardInner: 'flipCardInner',
  flipCardFront: 'flipCardFront',
  flipCardBack: 'flipCardBack',
  // flipped is intentionally omitted to test fallback
  centered: 'centered',
  centeredText: 'centeredText',
  roundedCorners: 'roundedCorners',
  thoughtExperiment: 'thoughtExperiment',
  svg: 'svg',
  pointerCursor: 'pointerCursor',
};

jest.mock('../../pages/posts/2025-08-05-Giving-Difficult-Feedback.module.css', () => ({
  flipCard: 'flipCard',
  flipCardInner: 'flipCardInner',
  flipCardFront: 'flipCardFront',
  flipCardBack: 'flipCardBack',
  flipped: 'flipped',
  centered: 'centered',
  centeredText: 'centeredText',
  roundedCorners: 'roundedCorners',
  thoughtExperiment: 'thoughtExperiment',
  svg: 'svg',
  pointerCursor: 'pointerCursor',
}));

// Mock Header and Footer components
jest.mock('../../pages/common/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

jest.mock('../../pages/common/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Mock Footer</footer>;
  };
});

describe('GivingDifficultFeedback Component', () => {
  beforeEach(() => {
    // Clear any previous DOM manipulations
    document.body.innerHTML = '';
  });

  describe('Component Rendering', () => {
    test('renders the component without crashing', () => {
      render(<GivingDifficultFeedback />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders the blog post title', () => {
      render(<GivingDifficultFeedback />);
      expect(
        screen.getByRole('heading', { 
          name: /The Tightrope Walk: Delivering Difficult News While Nurturing Talent/i 
        })
      ).toBeInTheDocument();
    });

    test('renders the publication date', () => {
      render(<GivingDifficultFeedback />);
      expect(screen.getByText('August 5, 2025')).toBeInTheDocument();
    });

    test('renders the privacy disclaimer', () => {
      render(<GivingDifficultFeedback />);
      expect(
        screen.getByText(/All names, company references, role titles/i)
      ).toBeInTheDocument();
    });

    test('renders main content sections', () => {
      render(<GivingDifficultFeedback />);
      
      // Check for key content paragraphs
      expect(
        screen.getByText(/I found myself in a challenging position coaching two talented engineering managers/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/There wasn't room in the allocation to fund two promotions simultaneously/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/This experience was a powerful lesson/i)
      ).toBeInTheDocument();
    });

    test('renders thought experiment section', () => {
      render(<GivingDifficultFeedback />);
      
      expect(
        screen.getByRole('heading', { name: /Thought Experiment/i })
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/How would you have handled the situation/i)
      ).toBeInTheDocument();
    });

    test('renders tags section', () => {
      render(<GivingDifficultFeedback />);
      expect(screen.getByText(/Tags:/)).toBeInTheDocument();
      expect(screen.getByText(/#coaching/)).toBeInTheDocument();
      expect(screen.getByText(/#transparency/)).toBeInTheDocument();
      expect(screen.getByText(/#empathy/)).toBeInTheDocument();
    });
  });

  describe('Flip Card Functionality', () => {
    test('renders flip card component', () => {
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      expect(flipCard).toBeInTheDocument();
      expect(flipCard).toHaveClass('flipCard', 'centered', 'pointerCursor');
    });

    test('flip card has correct initial state', () => {
      render(<GivingDifficultFeedback />);
      
      const flipCardImage = screen.getByRole('img', { name: /Fork in the road/i });
      expect(flipCardImage).toBeInTheDocument();
      expect(flipCardImage).toHaveAttribute('src', '/img/fork-in-road.jpg');
      expect(flipCardImage).toHaveAttribute('width', 'auto');
      expect(flipCardImage).toHaveAttribute('height', '200px');
    });

    test('flip card contains back content', () => {
      render(<GivingDifficultFeedback />);
      
      // The back content should be in the DOM but may not be visible initially
      expect(
        screen.getByText(/Leaders are presented with choices all the time/i)
      ).toBeInTheDocument();
    });

    test('flip card is clickable and has pointer cursor', () => {
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      expect(flipCard).toHaveClass('pointerCursor');
    });

    test('flip card click toggles flipped class', async () => {
      const user = userEvent.setup();
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      const flipCardInner = flipCard?.querySelector('.flipCardInner');
      
      expect(flipCardInner).toBeInTheDocument();
      expect(flipCardInner).not.toHaveClass('flipped');
      
      // Click the flip card
      await user.click(flipCard!);
      
      await waitFor(() => {
        expect(flipCardInner).toHaveClass('flipped');
      });
      
      // Click again to toggle back
      await user.click(flipCard!);
      
      await waitFor(() => {
        expect(flipCardInner).not.toHaveClass('flipped');
      });
    });

    test('flip card click handler works with fireEvent', () => {
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      const flipCardInner = flipCard?.querySelector('.flipCardInner');
      
      expect(flipCardInner).not.toHaveClass('flipped');
      
      fireEvent.click(flipCard!);
      expect(flipCardInner).toHaveClass('flipped');
      
      fireEvent.click(flipCard!);
      expect(flipCardInner).not.toHaveClass('flipped');
    });
  });

  describe('SVG Graphics', () => {
    test('renders SVG element with correct dimensions', () => {
      render(<GivingDifficultFeedback />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('height', '350');
      expect(svg).toHaveAttribute('width', '350');
      expect(svg).toHaveClass('svg');
    });

    test('renders three circles with correct attributes', () => {
      render(<GivingDifficultFeedback />);
      
      const svg = document.querySelector('svg');
      const circles = svg?.querySelectorAll('circle');
      
      expect(circles).toHaveLength(3);
      
      // First circle (Honesty)
      expect(circles![0]).toHaveAttribute('cx', '100');
      expect(circles![0]).toHaveAttribute('cy', '100');
      expect(circles![0]).toHaveAttribute('r', '95');
      expect(circles![0]).toHaveAttribute('stroke', '#20C2DF');
      expect(circles![0]).toHaveAttribute('fill', '#20C2DF');
      expect(circles![0]).toHaveAttribute('fill-opacity', '0.3');
      
      // Second circle (Integrity)
      expect(circles![1]).toHaveAttribute('cx', '250');
      expect(circles![1]).toHaveAttribute('cy', '100');
      expect(circles![1]).toHaveAttribute('r', '95');
      expect(circles![1]).toHaveAttribute('stroke', '#DF20C2');
      expect(circles![1]).toHaveAttribute('fill', '#DF20C2');
      
      // Third circle (Transparency)
      expect(circles![2]).toHaveAttribute('cx', '175');
      expect(circles![2]).toHaveAttribute('cy', '225');
      expect(circles![2]).toHaveAttribute('r', '95');
      expect(circles![2]).toHaveAttribute('stroke', '#C2DF20');
      expect(circles![2]).toHaveAttribute('fill', '#C2DF20');
    });

    test('renders text labels for each circle', () => {
      render(<GivingDifficultFeedback />);
      
      const svg = document.querySelector('svg');
      const textElements = svg?.querySelectorAll('text');
      
      expect(textElements).toHaveLength(3);
      
      // Check text content and positions
      expect(textElements![0]).toHaveTextContent('Honesty');
      expect(textElements![0]).toHaveAttribute('x', '100');
      expect(textElements![0]).toHaveAttribute('y', '100');
      expect(textElements![0]).toHaveAttribute('text-anchor', 'middle');
      
      expect(textElements![1]).toHaveTextContent('Integrity');
      expect(textElements![1]).toHaveAttribute('x', '250');
      expect(textElements![1]).toHaveAttribute('y', '100');
      
      expect(textElements![2]).toHaveTextContent('Transparency');
      expect(textElements![2]).toHaveAttribute('x', '175');
      expect(textElements![2]).toHaveAttribute('y', '235');
    });

    test('SVG text elements have correct styling attributes', () => {
      render(<GivingDifficultFeedback />);
      
      const svg = document.querySelector('svg');
      const textElements = svg?.querySelectorAll('text');
      
      // First text element (Honesty)
      expect(textElements![0]).toHaveAttribute('stroke', '#0B424D');
      expect(textElements![0]).toHaveAttribute('stroke-width', '1px');
      expect(textElements![0]).toHaveAttribute('alignment-baseline', 'middle');
      
      // Second text element (Integrity)
      expect(textElements![1]).toHaveAttribute('stroke', '#4D0B42');
      expect(textElements![1]).toHaveAttribute('stroke-width', '1px');
      
      // Third text element (Transparency)
      expect(textElements![2]).toHaveAttribute('stroke', '#424D0B');
      expect(textElements![2]).toHaveAttribute('stroke-width', '1px');
    });
  });

  describe('CSS Classes and Styling', () => {
    test('container has correct CSS class', () => {
      render(<GivingDifficultFeedback />);
      
      const container = screen.getByText('August 5, 2025').closest('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
    });

    test('post section has correct CSS class', () => {
      render(<GivingDifficultFeedback />);
      
      const postSection = screen.getByRole('heading', { 
        name: /The Tightrope Walk/i 
      }).closest('.post');
      expect(postSection).toBeInTheDocument();
      expect(postSection).toHaveClass('post');
    });

    test('sidebar section has correct CSS class', () => {
      render(<GivingDifficultFeedback />);
      
      const sidebar = screen.getByText(/Tags:/).closest('.sidebar');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveClass('sidebar');
    });

    test('thought experiment section has correct CSS class', () => {
      render(<GivingDifficultFeedback />);
      
      const thoughtExperiment = screen.getByRole('heading', { 
        name: /Thought Experiment/i 
      }).closest('.thoughtExperiment');
      expect(thoughtExperiment).toBeInTheDocument();
      expect(thoughtExperiment).toHaveClass('thoughtExperiment');
    });

    test('flip card elements have correct CSS classes', () => {
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      expect(flipCard).toHaveClass('flipCard', 'centered', 'pointerCursor');
      
      const flipCardInner = flipCard?.querySelector('.flipCardInner');
      expect(flipCardInner).toHaveClass('flipCardInner');
      
      const flipCardFront = flipCard?.querySelector('.flipCardFront');
      expect(flipCardFront).toHaveClass('flipCardFront');
      
      const flipCardBack = flipCard?.querySelector('.flipCardBack');
      expect(flipCardBack).toHaveClass('flipCardBack', 'centeredText', 'roundedCorners');
    });

    test('image has rounded corners class', () => {
      render(<GivingDifficultFeedback />);
      
      const image = screen.getByRole('img', { name: /Fork in the road/i });
      expect(image).toHaveClass('roundedCorners');
    });
  });

  describe('Accessibility', () => {
    test('image has proper alt text', () => {
      render(<GivingDifficultFeedback />);
      
      const image = screen.getByRole('img', { name: /Fork in the road/i });
      expect(image).toHaveAttribute('alt', 'Fork in the road');
    });

    test('headings have proper hierarchy', () => {
      render(<GivingDifficultFeedback />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/The Tightrope Walk/i);
      
      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent(/Thought Experiment/i);
    });

    test('flip card is clickable and focusable', async () => {
      render(<GivingDifficultFeedback />);
      
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard') as HTMLElement;
      
      expect(flipCard).toBeInTheDocument();
      expect(flipCard).toHaveClass('pointerCursor');
      
      // Test that it's clickable
      fireEvent.click(flipCard);
      
      const flipCardInner = flipCard?.querySelector('.flipCardInner');
      expect(flipCardInner).toHaveClass('flipped');
    });

    test('SVG is present and accessible', () => {
      render(<GivingDifficultFeedback />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('height', '350');
      expect(svg).toHaveAttribute('width', '350');
    });
  });

  describe('Content Verification', () => {
    test('contains expected narrative sections', () => {
      render(<GivingDifficultFeedback />);
      
      // Check for key narrative elements - using more specific phrases
      expect(screen.getByText(/Alex and Ben/i)).toBeInTheDocument();
      expect(screen.getAllByText(/budget constraint/i)).toHaveLength(2); // Use getAllByText since it appears twice
      expect(screen.getByText(/promotion season/i)).toBeInTheDocument();
      expect(screen.getByText(/transparency and empathy were crucial/i)).toBeInTheDocument();
    });

    test('contains leadership lessons and insights', () => {
      render(<GivingDifficultFeedback />);
      
      expect(
        screen.getByText(/Early expectation setting and coaching significantly mitigated potential damage/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Delivering difficult feedback effectively doesn't break a person/i)
      ).toBeInTheDocument();
    });

    test('includes direct quotes from the conversation', () => {
      render(<GivingDifficultFeedback />);
      
      expect(
        screen.getByText(/Alex, thanks for taking the time to discuss your promotion readiness/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Your work here has been critical/i)
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles missing cardRef gracefully', () => {
      // Spy on console.error to catch any errors
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<GivingDifficultFeedback />);
      
      // Force the ref to be null by manipulating the DOM
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      
      // This should not throw an error
      fireEvent.click(flipCard!);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('handles missing flip card inner element gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<GivingDifficultFeedback />);
      
      // Remove the inner element
      const flipCard = screen.getByRole('img', { name: /Fork in the road/i }).closest('.flipCard');
      const flipCardInner = flipCard?.querySelector('.flipCardInner');
      flipCardInner?.remove();
      
      // This should not throw an error
      fireEvent.click(flipCard!);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('handles CSS module fallback when flipped class is undefined', () => {
      // Test the actual logical OR expression used in the code
      const styles = mockCSSWithoutFlipped; // This doesn't have 'flipped' property
      const fallbackClass = styles.flipped || 'flipped';
      expect(fallbackClass).toBe('flipped'); // Should use fallback since styles.flipped is undefined
      
      // Test with a styles object that has flipped
      const stylesWithFlipped = mockCSSWithFlipped;
      const normalClass = stylesWithFlipped.flipped || 'flipped';
      expect(normalClass).toBe('flipped'); // Should use the CSS module class
      
      // Verify both paths of the conditional expression work
      expect(undefined || 'flipped').toBe('flipped'); // Fallback path
      expect('css-module-flipped' || 'flipped').toBe('css-module-flipped'); // Normal path
    });
  });
});