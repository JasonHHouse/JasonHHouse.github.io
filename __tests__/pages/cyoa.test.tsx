/**
 * Test suite for the CYOA story selection page
 *
 * Tests cover:
 * - Page rendering and component structure
 * - Story listing and loading
 * - Story card interactions
 * - Accessibility features
 * - Error handling
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CYOA from '../../pages/cyoa';

// Mock fetch API
global.fetch = jest.fn();

// Mock window.location
delete (window as any).location;
window.location = { href: '' } as any;

// Mock Header and Footer components
jest.mock('../../pages/common/Header', () => {
  return function MockHeader() {
    return (
      <div data-testid="mock-header" role="banner">
        <nav>
          <h1><a href="/">Leadership and Mentorship</a></h1>
          <ul>
            <li><a href="/posts">Posts</a></li>
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

jest.mock('../../pages/common/SEO', () => {
  return function MockSEO() {
    return null;
  };
});

const mockStoriesData = {
  stories: [
    {
      id: 'forest-adventure',
      title: 'The Dark Forest',
      description: 'You find yourself in a dark forest filled with mystery and ancient secrets.',
      file: 'teststory.json',
      difficulty: 'Easy',
      themes: ['Adventure', 'Mystery', 'Fantasy']
    },
    {
      id: 'conversation',
      title: 'The Project Discussion',
      description: 'Navigate a professional conversation about an upcoming team collaboration initiative.',
      file: 'conversation.json',
      difficulty: 'Medium',
      themes: ['Leadership', 'Communication', 'Career']
    }
  ]
};

describe('CYOA Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockStoriesData,
    });
    window.location.href = '';
  });

  describe('Page Rendering', () => {
    it('renders without crashing', async () => {
      render(<CYOA />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('displays loading state initially', () => {
      render(<CYOA />);
      expect(screen.getByText('Loading stories...')).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<CYOA />);

      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Story Loading', () => {
    it('fetches stories from stories.json', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/stories.json');
      });
    });

    it('displays story cards after loading', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
        expect(screen.getByText('The Project Discussion')).toBeInTheDocument();
      });
    });

    it('displays story descriptions', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText(/dark forest filled with mystery/)).toBeInTheDocument();
        expect(screen.getByText(/professional conversation about an upcoming/)).toBeInTheDocument();
      });
    });

    it('displays difficulty levels', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('Difficulty: Easy')).toBeInTheDocument();
        expect(screen.getByText('Difficulty: Medium')).toBeInTheDocument();
      });
    });

    it('displays story themes', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('Adventure')).toBeInTheDocument();
        expect(screen.getByText('Mystery')).toBeInTheDocument();
        expect(screen.getByText('Fantasy')).toBeInTheDocument();
        expect(screen.getByText('Leadership')).toBeInTheDocument();
        expect(screen.getByText('Communication')).toBeInTheDocument();
        expect(screen.getByText('Career')).toBeInTheDocument();
      });
    });
  });

  describe('Page Structure', () => {
    it('displays the main page heading', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('Choose Your Own Adventure')).toBeInTheDocument();
      });
    });

    it('displays the subtitle', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('Select a story to begin your interactive journey')).toBeInTheDocument();
      });
    });
  });

  describe('Story Card Interactions', () => {
    it('navigates to story page when card is clicked', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
      });

      const storyCard = screen.getByText('The Dark Forest').closest('div[role="button"]');
      fireEvent.click(storyCard!);

      expect(window.location.href).toBe('/story?id=forest-adventure');
    });

    it('handles keyboard navigation with Enter key', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Project Discussion')).toBeInTheDocument();
      });

      const storyCard = screen.getByText('The Project Discussion').closest('div[role="button"]');
      fireEvent.keyPress(storyCard!, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(window.location.href).toBe('/story?id=conversation');
    });

    it('handles keyboard navigation with Space key', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
      });

      const storyCard = screen.getByText('The Dark Forest').closest('div[role="button"]');
      fireEvent.keyPress(storyCard!, { key: ' ', code: 'Space', charCode: 32 });

      expect(window.location.href).toBe('/story?id=forest-adventure');
    });

    it('story cards have proper accessibility attributes', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
      });

      const storyCards = screen.getAllByRole('button');
      storyCards.forEach(card => {
        expect(card).toHaveAttribute('tabIndex', '0');
      });
    });
  });

  describe('Error Handling', () => {
    it('handles fetch errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<CYOA />);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error loading stories:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility Features', () => {
    it('maintains proper heading hierarchy', async () => {
      render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
      });

      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThan(0);
    });

    it('has proper semantic structure with landmarks', () => {
      render(<CYOA />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('renders as a functional React component', () => {
      expect(typeof CYOA).toBe('function');
      expect(CYOA.name).toBe('CYOA');
    });

    it('integrates Header and Footer components properly', () => {
      render(<CYOA />);

      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');

      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', async () => {
      const { rerender } = render(<CYOA />);

      await waitFor(() => {
        expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
      });

      for (let i = 0; i < 3; i++) {
        rerender(<CYOA />);
        await waitFor(() => {
          expect(screen.getByText('The Dark Forest')).toBeInTheDocument();
        });
      }
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<CYOA />);
      expect(() => unmount()).not.toThrow();
    });
  });
});
