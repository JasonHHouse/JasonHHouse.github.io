/**
 * Test suite for the Story page (Interactive CYOA)
 *
 * Tests cover:
 * - Page rendering and component structure
 * - Story data fetching and loading states
 * - Message display and navigation
 * - Error handling
 * - Accessibility features
 */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Story from '../../pages/story';

// Mock fetch globally
global.fetch = jest.fn();

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
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

// Mock story metadata
const mockStoriesMetadata = {
  stories: [
    {
      id: 'forest-adventure',
      title: 'The Dark Forest',
      file: 'teststory.json'
    }
  ]
};

// Mock story data
const mockStoryData = {
  start_node: 'start',
  nodes: {
    start: {
      messages: [
        { body: 'Welcome to the interactive leadership story.', sender: 'Narrator' },
        { body: 'You are about to embark on a journey.', sender: 'Guide' }
      ],
      options: [
        { text: 'Begin the journey', destination: 'chapter1' },
        { text: 'Learn more', destination: 'info' }
      ]
    },
    chapter1: {
      messages: [
        { body: 'Your first challenge begins now.', sender: 'Narrator' }
      ],
      options: [
        { text: 'Take action', destination: 'end' }
      ]
    },
    end: {
      messages: [
        { body: 'Congratulations! You completed the story.', sender: 'Narrator' }
      ],
      isEnd: true
    }
  }
};

describe('Story Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useRouter to return forest-adventure id
    const useRouter = require('next/router').useRouter;
    useRouter.mockReturnValue({
      query: { id: 'forest-adventure' },
      pathname: '/story',
      push: jest.fn(),
    });
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('displays loading state initially', () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        new Promise(() => {}) // Never resolves
      );

      render(<Story />);
      expect(screen.getByText('Loading story...')).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Story Loading', () => {
    it('fetches story metadata and story data', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        if (url === '/teststory.json') {
          return Promise.resolve({
            json: async () => mockStoryData,
          });
        }
      });

      render(<Story />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/stories.json');
        expect(global.fetch).toHaveBeenCalledWith('/teststory.json');
      });
    });

    it('displays story messages after loading', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to the interactive leadership story.')).toBeInTheDocument();
        expect(screen.getByText('You are about to embark on a journey.')).toBeInTheDocument();
      });
    });

    it('displays message senders', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('— Narrator')).toBeInTheDocument();
        expect(screen.getByText('— Guide')).toBeInTheDocument();
      });
    });

    it('displays story options', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Begin the journey')).toBeInTheDocument();
        expect(screen.getByText('Learn more')).toBeInTheDocument();
      });
    });
  });

  describe('Story Navigation', () => {
    it('navigates to next node when option is clicked', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Begin the journey')).toBeInTheDocument();
      });

      const button = screen.getByText('Begin the journey');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Your first challenge begins now.')).toBeInTheDocument();
      });
    });

    it('displays "Choose Another Story" button at story end', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      // Navigate to chapter1
      await waitFor(() => {
        expect(screen.getByText('Begin the journey')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Begin the journey'));

      // Navigate to end
      await waitFor(() => {
        expect(screen.getByText('Take action')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Take action'));

      // Check for end state
      await waitFor(() => {
        expect(screen.getByText('Congratulations! You completed the story.')).toBeInTheDocument();
        expect(screen.getByText('Choose Another Story')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message when story not found', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => ({ stories: [] }), // Empty stories array
          });
        }
      });

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Story not found')).toBeInTheDocument();
        expect(screen.getByText('Back to story selection')).toBeInTheDocument();
      });
    });

    it('displays error message when fetch fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load story')).toBeInTheDocument();
        expect(screen.getByText('Back to story selection')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility Features', () => {
    it('has proper semantic structure with landmarks', () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('option buttons have proper button role', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Component Structure', () => {
    it('renders as a functional React component', () => {
      expect(typeof Story).toBe('function');
      expect(Story.name).toBe('Story');
    });

    it('integrates Header and Footer components properly', () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      render(<Story />);

      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');

      expect(header).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', async () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      const { rerender } = render(<Story />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to the interactive leadership story.')).toBeInTheDocument();
      });

      for (let i = 0; i < 3; i++) {
        rerender(<Story />);
        await waitFor(() => {
          expect(screen.getByText('Welcome to the interactive leadership story.')).toBeInTheDocument();
        });
      }
    });

    it('cleans up properly on unmount', () => {
      (global.fetch as jest.Mock).mockImplementation((url) => {
        if (url === '/stories.json') {
          return Promise.resolve({
            json: async () => mockStoriesMetadata,
          });
        }
        return Promise.resolve({
          json: async () => mockStoryData,
        });
      });

      const { unmount } = render(<Story />);
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Story ID Handling', () => {
    it('handles missing story ID gracefully', () => {
      const useRouter = require('next/router').useRouter;
      useRouter.mockReturnValue({
        query: {}, // No ID provided
        pathname: '/story',
      });

      (global.fetch as jest.Mock).mockImplementation(() =>
        new Promise(() => {}) // Never resolves
      );

      render(<Story />);

      // Should show loading state and not crash
      expect(screen.getByText('Loading story...')).toBeInTheDocument();
    });
  });
});

describe('Story Message Format Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const useRouter = require('next/router').useRouter;
    useRouter.mockReturnValue({
      query: { id: 'format-test' },
      pathname: '/story',
      push: jest.fn(),
    });
  });

  it('handles singular message as an array', async () => {
    const storyWithMessageArray = {
      stories: [
        {
          id: 'format-test',
          title: 'Format Test',
          file: 'formattest.json'
        }
      ]
    };

    const storyDataWithMessageArray = {
      start_node: 'start',
      nodes: {
        start: {
          message: [
            { body: 'This is a message in array format', sender: 'Narrator' }
          ],
          options: [
            { text: 'Continue', destination: 'next' }
          ]
        },
        next: {
          message: [
            { body: 'Second message', sender: 'Guide' }
          ],
          isEnd: true
        }
      }
    };

    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/stories.json') {
        return Promise.resolve({
          json: async () => storyWithMessageArray,
        });
      }
      return Promise.resolve({
        json: async () => storyDataWithMessageArray,
      });
    });

    render(<Story />);

    await waitFor(() => {
      expect(screen.getByText('This is a message in array format')).toBeInTheDocument();
    });
  });

  it('handles singular message as a single object', async () => {
    const storyMetadata = {
      stories: [
        {
          id: 'format-test',
          title: 'Format Test',
          file: 'formattest.json'
        }
      ]
    };

    const storyDataWithSingleMessage = {
      start_node: 'start',
      nodes: {
        start: {
          message: { body: 'This is a single message object', sender: 'Narrator' },
          options: [
            { text: 'Next', destination: 'second' }
          ]
        },
        second: {
          message: { body: 'Another single message', sender: 'Guide' },
          isEnd: true
        }
      }
    };

    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/stories.json') {
        return Promise.resolve({
          json: async () => storyMetadata,
        });
      }
      return Promise.resolve({
        json: async () => storyDataWithSingleMessage,
      });
    });

    render(<Story />);

    await waitFor(() => {
      expect(screen.getByText('This is a single message object')).toBeInTheDocument();
    });

    // Navigate to test the navigate function's message handling
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Another single message')).toBeInTheDocument();
    });
  });

  it('handles navigation with message array format', async () => {
    const storyMetadata = {
      stories: [
        {
          id: 'format-test',
          title: 'Format Test',
          file: 'formattest.json'
        }
      ]
    };

    const storyDataMixedFormats = {
      start_node: 'start',
      nodes: {
        start: {
          messages: [
            { body: 'Start with messages field', sender: 'Narrator' }
          ],
          options: [
            { text: 'Go to array', destination: 'array_node' }
          ]
        },
        array_node: {
          message: [
            { body: 'Using message array', sender: 'Guide' }
          ],
          options: [
            { text: 'Go to single', destination: 'single_node' }
          ]
        },
        single_node: {
          message: { body: 'Using single message', sender: 'Tree Spirit' },
          isEnd: true
        }
      }
    };

    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/stories.json') {
        return Promise.resolve({
          json: async () => storyMetadata,
        });
      }
      return Promise.resolve({
        json: async () => storyDataMixedFormats,
      });
    });

    render(<Story />);

    await waitFor(() => {
      expect(screen.getByText('Start with messages field')).toBeInTheDocument();
    });

    // Navigate to array format
    fireEvent.click(screen.getByText('Go to array'));

    await waitFor(() => {
      expect(screen.getByText('Using message array')).toBeInTheDocument();
    });

    // Navigate to single object format
    fireEvent.click(screen.getByText('Go to single'));

    await waitFor(() => {
      expect(screen.getByText('Using single message')).toBeInTheDocument();
    });
  });
});
