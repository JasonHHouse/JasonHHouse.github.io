import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Secret from '../../pages/secret';

// Mock fetch
global.fetch = jest.fn();

// Mock components
jest.mock('../../pages/common/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('../../pages/common/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

jest.mock('../../pages/common/SEO', () => {
  return function MockSEO() {
    return null;
  };
});

const mockConversationData = {
  start_node: 'start',
  nodes: {
    start: {
      messages: [
        { body: 'Hey! How are you doing today?', sender: 'them' }
      ],
      options: [
        { text: "I'm doing great, thanks for asking!", destination: 'project_intro' },
        { text: "I've been better, but I'm managing.", destination: 'empathy_response' }
      ]
    },
    project_intro: {
      messages: [
        { body: "That's wonderful to hear. I wanted to talk to you about the upcoming project.", sender: 'them' }
      ],
      options: [
        { text: 'Tell me more about it', destination: 'end' }
      ]
    },
    empathy_response: {
      messages: [
        { body: "I'm sorry to hear that. Is there anything I can do to help?", sender: 'them' }
      ],
      options: [
        { text: "Thanks for asking, I'll be okay. What's up?", destination: 'project_intro' }
      ]
    },
    end: {
      messages: [
        { body: "Great! I'm looking forward to working on this together. Talk to you soon!", sender: 'them' }
      ],
      isEnd: true
    }
  }
};

describe('Secret Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockConversationData,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', async () => {
    render(<Secret />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<Secret />);
    expect(screen.getByText(/Loading conversation/i)).toBeInTheDocument();
  });

  it('loads and displays conversation data', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(screen.getByText('Hey! How are you doing today?')).toBeInTheDocument();
    });
  });

  it('displays conversation options', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(screen.getByText("I'm doing great, thanks for asking!")).toBeInTheDocument();
      expect(screen.getByText("I've been better, but I'm managing.")).toBeInTheDocument();
    });
  });

  it('handles option click and navigates to next node', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(screen.getByText("I'm doing great, thanks for asking!")).toBeInTheDocument();
    });

    const optionButton = screen.getByText("I'm doing great, thanks for asking!");
    fireEvent.click(optionButton);

    // Advance timers for the setTimeout delay
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(screen.getByText("That's wonderful to hear. I wanted to talk to you about the upcoming project.")).toBeInTheDocument();
    });
  });

  it('displays conversation messages', async () => {
    await act(async () => {
      render(<Secret />);
    });

    await waitFor(() => {
      expect(screen.getByText('Hey! How are you doing today?')).toBeInTheDocument();
    });
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<Secret />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading conversation:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('displays end state when conversation ends', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(screen.getByText("I'm doing great, thanks for asking!")).toBeInTheDocument();
    });

    // Click first option
    fireEvent.click(screen.getByText("I'm doing great, thanks for asking!"));
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(screen.getByText('Tell me more about it')).toBeInTheDocument();
    });

    // Click second option to reach end
    fireEvent.click(screen.getByText('Tell me more about it'));
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(screen.getByText("Great! I'm looking forward to working on this together. Talk to you soon!")).toBeInTheDocument();
    });
  });

  it('adds user responses to message history', async () => {
    await act(async () => {
      render(<Secret />);
    });

    await waitFor(() => {
      expect(screen.getByText("I'm doing great, thanks for asking!")).toBeInTheDocument();
    });

    const optionButton = screen.getByText("I'm doing great, thanks for asking!");

    fireEvent.click(optionButton);

    // User's response should appear in the messages
    await waitFor(() => {
      expect(screen.getByText("I'm doing great, thanks for asking!")).toBeInTheDocument();
    });

    // Advance timer to show next messages
    act(() => {
      jest.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(screen.getByText("That's wonderful to hear. I wanted to talk to you about the upcoming project.")).toBeInTheDocument();
    });
  });

  it('includes Header and Footer components', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
  });

  it('fetches conversation data on mount', async () => {
    render(<Secret />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/conversation.json');
    });
  });
});
