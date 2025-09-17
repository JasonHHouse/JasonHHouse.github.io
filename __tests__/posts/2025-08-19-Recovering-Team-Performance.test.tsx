import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecoveringTeamPerformance from '../../pages/posts/2025-08-19-Recovering-Team-Performance';

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

// Mock TagList component
jest.mock('../../components/TagList', () => {
  return function MockTagList({ tags }: { tags: string[] }) {
    return (
      <div data-testid="tag-list">
        <strong>Tags:</strong> {tags.map(tag => <span key={tag}>#{tag} </span>)}
      </div>
    );
  };
});

describe('RecoveringTeamPerformance Component', () => {
  beforeEach(() => {
    // Clear any previous DOM manipulations
    document.body.innerHTML = '';
  });

  describe('Component Rendering', () => {
    test('renders the component without crashing', () => {
      render(<RecoveringTeamPerformance />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders the blog post title', () => {
      render(<RecoveringTeamPerformance />);
      expect(
        screen.getByRole('heading', { 
          name: /Supporting Teams During Periods of Significant Change/i 
        })
      ).toBeInTheDocument();
    });

    test('renders the publication date', () => {
      render(<RecoveringTeamPerformance />);
      expect(screen.getByText('August 19, 2025')).toBeInTheDocument();
    });

    test('renders the privacy disclaimer', () => {
      render(<RecoveringTeamPerformance />);
      expect(
        screen.getByText(/All names, company references, role titles/i)
      ).toBeInTheDocument();
    });

    test('renders main content sections', () => {
      render(<RecoveringTeamPerformance />);
      
      // Check for key content paragraphs
      expect(
        screen.getByText(/In my early career as an engineering manager/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Everyone experienced a sudden shift from collaborative, in-office work/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/This experience crystallized for me that high-performing teams/i)
      ).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    test('contains COVID-19 context and challenges', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(screen.getByText(/COVID-19/i)).toBeInTheDocument();
      expect(
        screen.getByText(/sudden shift from collaborative, in-office work with proper facilities to makeshift setups at home/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/small apartments without dedicated desks, monitors shipped days\/weeks later/i)
      ).toBeInTheDocument();
    });

    test('describes the management approach and solutions', () => {
      render(<RecoveringTeamPerformance />);
      
      // Logistical solutions
      expect(
        screen.getByText(/I made sure everyone understood resources were available to help make their home setup as effective as possible/i)
      ).toBeInTheDocument();
      
      // Communication improvements
      expect(
        screen.getByText(/We opened a general video chat channel where people could drop in anytime/i)
      ).toBeInTheDocument();
      
      // Team building activities
      expect(
        screen.getByText(/We started by creating a rotating our Sprint Owner/i)
      ).toBeInTheDocument();
    });

    test('includes specific team building examples', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/Each sprint, the Sprint Owner would get to pick a theme for our Zoom backgrounds/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/We labeled our sprints A-Z. Each sprint, the Sprint Owner would pick a Pokémon name/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/We also did things like gaming hours or happy hours/i)
      ).toBeInTheDocument();
    });

    test('describes metrics and measurement approach', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/Throughout this process, I tracked key performance indicators/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/sprint velocity \(how much they accomplished\) and pull request open times/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/average length a ticket was open for/i)
      ).toBeInTheDocument();
    });

    test('includes results and outcomes', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/The results started showing within a couple of sprints/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Those core metrics shot back up and returned to where they were before everything changed/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/The team became more self-directed and tightly bonded/i)
      ).toBeInTheDocument();
    });

    test('contains leadership lessons and insights', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/high-performing teams aren't just about technical skill/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/They need psychological safety to navigate uncertainty together/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/It showed the power of combining empathetic understanding with data points like velocity/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/involving the team the entire time was key to finding solutions/i)
      ).toBeInTheDocument();
    });
  });

  describe('TagList Component Integration', () => {
    test('renders TagList component with correct props', () => {
      render(<RecoveringTeamPerformance />);
      
      const tagList = screen.getByTestId('tag-list');
      expect(tagList).toBeInTheDocument();
      expect(tagList).toHaveTextContent('Tags:');
      expect(tagList).toHaveTextContent('#teambuilding');
      expect(tagList).toHaveTextContent('#transparency');
      expect(tagList).toHaveTextContent('#empathy');
    });

    test('TagList receives correct tags array', () => {
      render(<RecoveringTeamPerformance />);
      
      // Verify all three expected tags are present
      const tagElements = screen.getAllByText(/^#/);
      expect(tagElements).toHaveLength(3);
      
      const tagTexts = tagElements.map(el => el.textContent);
      expect(tagTexts).toContain('#teambuilding ');
      expect(tagTexts).toContain('#transparency ');
      expect(tagTexts).toContain('#empathy ');
    });
  });

  describe('CSS Classes and Layout', () => {
    test('container has correct CSS class', () => {
      render(<RecoveringTeamPerformance />);
      
      const container = screen.getByText('August 19, 2025').closest('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
    });

    test('post section has correct CSS class', () => {
      render(<RecoveringTeamPerformance />);
      
      const postSection = screen.getByRole('heading', { 
        name: /Supporting Teams During Periods of Significant Change/i 
      }).closest('.post');
      expect(postSection).toBeInTheDocument();
      expect(postSection).toHaveClass('post');
    });

    test('sidebar section has correct CSS class', () => {
      render(<RecoveringTeamPerformance />);
      
      const sidebar = screen.getByTestId('tag-list').closest('.sidebar');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveClass('sidebar');
    });

    test('layout structure is correct', () => {
      render(<RecoveringTeamPerformance />);
      
      // Check the main container structure
      const container = screen.getByText('August 19, 2025').closest('.container');
      expect(container).toBeInTheDocument();
      
      // Check that post and sidebar are within the container
      const postSection = container?.querySelector('.post');
      const sidebarSection = container?.querySelector('.sidebar');
      
      expect(postSection).toBeInTheDocument();
      expect(sidebarSection).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<RecoveringTeamPerformance />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/Supporting Teams During Periods of Significant Change/i);
      
      // Ensure there are no h2 or h3 headings that would break hierarchy
      const allHeadings = screen.getAllByRole('heading');
      expect(allHeadings).toHaveLength(1); // Only the main title
    });

    test('content is properly structured for screen readers', () => {
      render(<RecoveringTeamPerformance />);
      
      // Check that paragraphs are properly structured
      const paragraphs = screen.getAllByText(
        (content, element) => element?.tagName.toLowerCase() === 'p'
      );
      expect(paragraphs.length).toBeGreaterThan(5); // Multiple content paragraphs
    });

    test('italic text is properly marked up', () => {
      render(<RecoveringTeamPerformance />);
      
      // Privacy disclaimer should be in italics
      const italicText = screen.getByText(/All names, company references/i);
      expect(italicText.closest('i')).toBeInTheDocument();
    });
  });

  describe('Content Verification', () => {
    test('contains specific COVID-19 timeline and context', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/adapting to entirely new working conditions suddenly imposed by the onset of a global event, COVID-19/i)
      ).toBeInTheDocument();
    });

    test('includes detailed solution descriptions', () => {
      render(<RecoveringTeamPerformance />);
      
      // Equipment and setup solutions
      expect(
        screen.getByText(/pointing them towards an internal process for requesting essential equipment like monitors or better keyboards/i)
      ).toBeInTheDocument();
      
      // Alternative workspace solutions
      expect(
        screen.getByText(/I encouraged exploring options like quiet cafes, which were still open/i)
      ).toBeInTheDocument();
      
      // Communication solutions
      expect(
        screen.getByText(/Zoom became our go-to for quick daily check-ins without scheduling formal meetings all day long/i)
      ).toBeInTheDocument();
    });

    test('contains specific metrics mentioned', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/sprint velocity/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/pull request open times/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/average length a ticket was open for/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Software Development Lifecycle/i)
      ).toBeInTheDocument();
    });

    test('includes team building creativity examples', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/your favorite food, best vacation, family photo/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Pokémon name for the sprint/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/It was something silly and small, but it helped and added up/i)
      ).toBeInTheDocument();
    });

    test('demonstrates leadership philosophy', () => {
      render(<RecoveringTeamPerformance />);
      
      expect(
        screen.getByText(/My primary goal was clear. I needed to support them in navigating this difficult transition/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Since it wasn't just technical output declining, but also communication flow and spirit, a purely data-driven approach felt incomplete/i)
      ).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    test('renders in correct order: Header, Content, Footer', () => {
      render(<RecoveringTeamPerformance />);
      
      const rootDiv = screen.getByTestId('header').parentElement;
      const children = Array.from(rootDiv?.children || []);
      
      expect(children[0]).toHaveAttribute('data-testid', 'header');
      expect(children[children.length - 1]).toHaveAttribute('data-testid', 'footer');
    });

    test('date appears before main content', () => {
      render(<RecoveringTeamPerformance />);
      
      const dateElement = screen.getByText('August 19, 2025');
      const titleElement = screen.getByRole('heading', { 
        name: /Supporting Teams During Periods of Significant Change/i 
      });
      
      // In DOM order, date should come before title
      expect(dateElement.compareDocumentPosition(titleElement)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });

    test('sidebar appears after main post content', () => {
      render(<RecoveringTeamPerformance />);
      
      const postSection = screen.getByRole('heading').closest('.post');
      const sidebarSection = screen.getByTestId('tag-list').closest('.sidebar');
      
      expect(postSection?.compareDocumentPosition(sidebarSection!)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });

  describe('Text Content Analysis', () => {
    test('contains appropriate professional vocabulary', () => {
      render(<RecoveringTeamPerformance />);
      
      // Technical management terms
      expect(screen.getByText(/engineering manager/i)).toBeInTheDocument();
      expect(screen.getByText(/psychological safety/i)).toBeInTheDocument();
      
      // Remote work terms
      expect(screen.getByText(/video calls/i)).toBeInTheDocument();
      expect(screen.getByText(/Zoom backgrounds/i)).toBeInTheDocument();
      expect(screen.getByText(/virtual team-building activities/i)).toBeInTheDocument();
      
      // Performance metrics terms
      expect(screen.getByText(/sprint velocity/i)).toBeInTheDocument();
      expect(screen.getByText(/pull request open times/i)).toBeInTheDocument();
    });

    test('maintains consistent narrative voice', () => {
      render(<RecoveringTeamPerformance />);
      
      // First person narrative throughout
      const firstPersonReferences = [
        /I found myself/i,
        /I worked in a big city/i,
        /My primary goal/i,
        /I decided to tackle/i,
        /I made sure everyone/i,
        /I tracked key performance indicators/i,
        /I saw a real shift/i
      ];
      
      firstPersonReferences.forEach(pattern => {
        expect(screen.getByText(pattern)).toBeInTheDocument();
      });
    });

    test('includes specific actionable details', () => {
      render(<RecoveringTeamPerformance />);
      
      // Specific implementation details
      expect(
        screen.getByText(/turning cameras on during key one-on-one and team calls/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/Each team member would have a unique background and would talk at the start of the sprint/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByText(/within a couple of sprints/i)
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles missing TagList gracefully', () => {
      // Mock TagList to return null
      jest.doMock('../../components/TagList', () => {
        return function MockTagList() {
          return null;
        };
      });
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<RecoveringTeamPerformance />);
      
      // Component should still render without TagList
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /Supporting Teams During Periods of Significant Change/i })
      ).toBeInTheDocument();
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('renders without crashing when content is missing', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // This should not crash even if some content is missing
      render(<RecoveringTeamPerformance />);
      
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});