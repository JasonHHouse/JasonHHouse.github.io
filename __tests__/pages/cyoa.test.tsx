/**
 * Comprehensive test suite for the CYOA page
 * 
 * Tests cover:
 * - Page rendering and component structure
 * - Content sections and feature descriptions
 * - Layout and grid structure
 * - CSS classes application
 * - Accessibility features
 * - SEO content validation
 * - Component integration
 * - Interactive elements and structure
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CYOA from '../../pages/cyoa';

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

describe('CYOA Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders without crashing', () => {
      render(<CYOA />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      render(<CYOA />);
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
    });

    it('includes Header and Footer components', () => {
      render(<CYOA />);
      
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      
      // Verify they have correct roles
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders as a functional component', () => {
      render(<CYOA />);
      expect(screen.getByRole('heading', { name: 'Interactive Leadership CYOA' })).toBeInTheDocument();
    });
  });

  describe('Page Structure and Headings', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays the main page heading', () => {
      const mainHeading = screen.getByRole('heading', { name: 'Interactive Leadership CYOA' });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading.tagName).toBe('H1');
    });

    it('displays the "Coming Soon" secondary heading', () => {
      const comingSoonHeading = screen.getByRole('heading', { name: 'Coming Soon' });
      expect(comingSoonHeading).toBeInTheDocument();
      expect(comingSoonHeading.tagName).toBe('H2');
    });

    it('displays the "What You\'ll Experience" section heading', () => {
      const experienceHeading = screen.getByRole('heading', { name: "What You'll Experience" });
      expect(experienceHeading).toBeInTheDocument();
      expect(experienceHeading.tagName).toBe('H3');
      expect(experienceHeading).toHaveClass('top-margin');
    });

    it('displays feature section headings with emoji icons', () => {
      expect(screen.getByRole('heading', { name: '🎯 Real-World Scenarios' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '⚡ Interactive Decision Making' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '📚 Contextual Learning' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '🔄 Multiple Pathways' })).toBeInTheDocument();
    });

    it('displays the "Why Choose Your Own Adventure?" section heading', () => {
      const whyHeading = screen.getByRole('heading', { name: 'Why Choose Your Own Adventure?' });
      expect(whyHeading).toBeInTheDocument();
      expect(whyHeading.tagName).toBe('H2');
    });
  });

  describe('Introduction Content', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays the main introduction paragraph', () => {
      const introText = screen.getByText(/Leadership isn't learned from textbooks alone/);
      expect(introText).toBeInTheDocument();
      expect(introText.textContent).toContain("it's forged through real-world experiences");
      expect(introText.textContent).toContain("That's why I'm building something special for aspiring leaders like you");
    });

    it('contains meaningful leadership-focused content', () => {
      expect(screen.getByText(/Leadership isn't learned from textbooks alone/)).toBeInTheDocument();
      expect(screen.getByText(/difficult decisions/)).toBeInTheDocument();
      expect(screen.getByText(/wisdom that comes from navigating complex human dynamics/)).toBeInTheDocument();
    });
  });

  describe('Feature Grid Section', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays the feature grid with correct structure', () => {
      const blogGrid = document.querySelector('.blog-grid.top-margin');
      expect(blogGrid).toBeInTheDocument();
    });

    it('displays all four feature cards', () => {
      const featureCards = document.querySelectorAll('.blog-grid .post-card');
      expect(featureCards).toHaveLength(4); // 4 feature cards in the blog-grid
    });

    it('displays Real-World Scenarios feature with correct content', () => {
      const realWorldCard = screen.getByRole('heading', { name: '🎯 Real-World Scenarios' }).closest('.post-card');
      expect(realWorldCard).toBeInTheDocument();
      
      const content = screen.getByText(/Face authentic leadership challenges drawn from my years managing engineering teams/);
      expect(content).toBeInTheDocument();
      expect(content.textContent).toContain('navigating organizational change');
      expect(content.textContent).toContain('mentoring emerging leaders');
    });

    it('displays Interactive Decision Making feature with correct content', () => {
      const interactiveCard = screen.getByRole('heading', { name: '⚡ Interactive Decision Making' }).closest('.post-card');
      expect(interactiveCard).toBeInTheDocument();
      
      const content = screen.getByText(/Make choices that matter/);
      expect(content).toBeInTheDocument();
      expect(content.textContent).toContain('realistic workplace situations');
      expect(content.textContent).toContain('mistakes become valuable learning opportunities');
    });

    it('displays Contextual Learning feature with correct content', () => {
      const contextualCard = screen.getByRole('heading', { name: '📚 Contextual Learning' }).closest('.post-card');
      expect(contextualCard).toBeInTheDocument();
      
      const content = screen.getByText(/After each scenario, dive deeper with explanations/);
      expect(content).toBeInTheDocument();
      expect(content.textContent).toContain('leadership principles');
      expect(content.textContent).toContain('alternative approaches');
    });

    it('displays Multiple Pathways feature with correct content', () => {
      const pathwaysCard = screen.getByRole('heading', { name: '🔄 Multiple Pathways' }).closest('.post-card');
      expect(pathwaysCard).toBeInTheDocument();
      
      const content = screen.getByText(/Explore different leadership styles and approaches/);
      expect(content).toBeInTheDocument();
      expect(content.textContent).toContain('Replay scenarios with different choices');
      expect(content.textContent).toContain('Build your own leadership toolkit');
    });
  });

  describe('Experience Categories Section', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays Difficult Conversations category', () => {
      const difficultyText = screen.getByText('Difficult Conversations:');
      expect(difficultyText.tagName).toBe('STRONG');
      
      const description = screen.getByText(/Navigate performance reviews, deliver challenging feedback/);
      expect(description).toBeInTheDocument();
      expect(description.textContent).toContain('handle conflicts between team members');
    });

    it('displays Team Dynamics category', () => {
      const teamText = screen.getByText('Team Dynamics:');
      expect(teamText.tagName).toBe('STRONG');
      
      const description = screen.getByText(/Build trust within your team, motivate underperforming members/);
      expect(description).toBeInTheDocument();
      expect(description.textContent).toContain('create psychological safety');
    });

    it('displays Strategic Decisions category', () => {
      const strategicText = screen.getByText('Strategic Decisions:');
      expect(strategicText.tagName).toBe('STRONG');
      
      const description = screen.getByText(/Balance competing priorities, allocate limited resources/);
      expect(description).toBeInTheDocument();
      expect(description.textContent).toContain('make tough calls that affect both people and projects');
    });

    it('displays Crisis Management category', () => {
      const crisisText = screen.getByText('Crisis Management:');
      expect(crisisText.tagName).toBe('STRONG');
      
      const description = screen.getByText(/Lead through uncertainty, communicate during organizational changes/);
      expect(description).toBeInTheDocument();
      expect(description.textContent).toContain('maintain team morale when facing significant challenges');
    });
  });

  describe('Why Choose Your Own Adventure Section', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays the explanatory card with correct structure', () => {
      const whyCard = screen.getByRole('heading', { name: 'Why Choose Your Own Adventure?' }).closest('.post-card');
      expect(whyCard).toBeInTheDocument();
      expect(whyCard).toHaveClass('post-card');
      expect(whyCard).toHaveClass('top-margin');
    });

    it('contains explanation of the CYOA approach', () => {
      const explanation = screen.getByText(/Traditional leadership training often feels abstract/);
      expect(explanation).toBeInTheDocument();
      expect(explanation.textContent).toContain('disconnected from real-world complexity');
      expect(explanation.textContent).toContain('CYOA format lets you experience the messy, nuanced reality');
    });

    it('explains the learning benefits', () => {
      const benefits = screen.getByText(/Each path through the adventure reveals different aspects/);
      expect(benefits).toBeInTheDocument();
      expect(benefits.textContent).toContain('comprehensive understanding');
      expect(benefits.textContent).toContain('lead with both competence and compassion');
    });
  });

  describe('Call to Action Section', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('displays the launch announcement with correct styling', () => {
      const launchText = screen.getByText(/Stay tuned—this interactive leadership journey will be launching soon/);
      expect(launchText).toBeInTheDocument();
      expect(launchText.tagName).toBe('STRONG');
      expect(launchText.closest('p')).toHaveClass('top-margin');
    });

    it('provides direction to blog posts while waiting', () => {
      const blogDirection = screen.getByText(/In the meantime, explore my blog posts/);
      expect(blogDirection).toBeInTheDocument();
      expect(blogDirection.textContent).toContain('real-world leadership challenges and insights');
      expect(blogDirection.textContent).toContain('full CYOA experience');
    });
  });

  describe('CSS Classes and Styling', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('applies correct classes to main container', () => {
      const container = document.querySelector('.container.top-margin');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container).toHaveClass('top-margin');
    });

    it('applies blog-grid class with top-margin to feature section', () => {
      const blogGrid = document.querySelector('.blog-grid.top-margin');
      expect(blogGrid).toBeInTheDocument();
      expect(blogGrid).toHaveClass('blog-grid');
      expect(blogGrid).toHaveClass('top-margin');
    });

    it('applies post-card class to all feature cards', () => {
      const postCards = document.querySelectorAll('.post-card');
      expect(postCards.length).toBeGreaterThan(0);
      
      postCards.forEach(card => {
        expect(card).toHaveClass('post-card');
      });
    });

    it('applies top-margin class to specific elements', () => {
      // Experience section heading
      const experienceHeading = screen.getByRole('heading', { name: "What You'll Experience" });
      expect(experienceHeading).toHaveClass('top-margin');
      
      // Why CYOA card
      const whyCard = screen.getByRole('heading', { name: 'Why Choose Your Own Adventure?' }).closest('.post-card');
      expect(whyCard).toHaveClass('top-margin');
      
      // Final call to action paragraph
      const finalParagraph = screen.getByText(/Stay tuned—this interactive leadership journey/).closest('p');
      expect(finalParagraph).toHaveClass('top-margin');
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('maintains proper heading hierarchy', () => {
      // H1 for main title - there are 2 H1s (header + page content)
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements).toHaveLength(2);
      // Find the page content H1
      const pageH1 = h1Elements.find(h1 => h1.textContent === 'Interactive Leadership CYOA');
      expect(pageH1).toBeTruthy();
      
      // H2 elements for major sections
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(1);
      
      // H3 for subsections
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      expect(h3Elements).toHaveLength(1);
      expect(h3Elements[0]).toHaveTextContent("What You'll Experience");
    });

    it('has proper semantic structure with landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('uses semantic HTML elements appropriately', () => {
      // Check for proper use of strong elements
      const strongElements = document.querySelectorAll('strong');
      expect(strongElements.length).toBeGreaterThan(0);
      
      // Verify strong elements contain meaningful content
      strongElements.forEach(element => {
        expect(element.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    it('provides meaningful content structure for screen readers', () => {
      // Check that content is logically organized
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(5); // Multiple meaningful sections
      
      // Verify each heading has meaningful text
      headings.forEach(heading => {
        expect(heading.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('SEO and Content Quality', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('contains leadership and mentorship focused keywords', () => {
      expect(screen.getByText(/Interactive Leadership CYOA/)).toBeInTheDocument();
      expect(screen.getAllByText(/leadership challenges/)).toHaveLength(3); // Appears multiple times
      expect(screen.getByText(/mentoring emerging leaders/)).toBeInTheDocument();
      expect(screen.getByText(/leadership principles/)).toBeInTheDocument();
    });

    it('provides comprehensive description of the upcoming feature', () => {
      // Multiple detailed descriptions
      expect(screen.getByText(/Face authentic leadership challenges/)).toBeInTheDocument();
      expect(screen.getByText(/Make choices that matter/)).toBeInTheDocument();
      expect(screen.getByText(/dive deeper with explanations/)).toBeInTheDocument();
      expect(screen.getByText(/Explore different leadership styles/)).toBeInTheDocument();
    });

    it('includes engaging and descriptive content', () => {
      const contentElements = [
        /real-world experiences, difficult decisions/,
        /engineering teams, navigating organizational change/,
        /realistic workplace situations/,
        /leadership principles, alternative approaches/,
        /different leadership styles and approaches/
      ];
      
      contentElements.forEach(pattern => {
        expect(screen.getByText(pattern)).toBeInTheDocument();
      });
    });

    it('provides clear value proposition', () => {
      expect(screen.getByText(/Traditional leadership training often feels abstract/)).toBeInTheDocument();
      expect(screen.getByText(/CYOA format lets you experience the messy, nuanced reality/)).toBeInTheDocument();
      expect(screen.getByText(/develop intuition alongside knowledge/)).toBeInTheDocument();
    });
  });

  describe('Component Structure and Integration', () => {
    it('renders as a functional React component', () => {
      expect(typeof CYOA).toBe('function');
      expect(CYOA.name).toBe('CYOA');
    });

    it('exports correctly as default export', () => {
      expect(CYOA).toBeDefined();
      render(<CYOA />);
      expect(screen.getByRole('heading', { name: 'Interactive Leadership CYOA' })).toBeInTheDocument();
    });

    it('integrates Header and Footer components properly', () => {
      render(<CYOA />);
      
      // Verify component structure
      const header = screen.getByTestId('mock-header');
      const footer = screen.getByTestId('mock-footer');
      const mainContent = document.querySelector('.container.top-margin');
      
      expect(header).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });

    it('maintains consistent styling with other pages', () => {
      render(<CYOA />);
      
      // Check for consistent class usage
      expect(document.querySelector('.container')).toBeInTheDocument();
      expect(document.querySelector('.blog-grid')).toBeInTheDocument();
      expect(document.querySelectorAll('.post-card').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.top-margin').length).toBeGreaterThan(0);
    });
  });

  describe('Content Organization and Flow', () => {
    beforeEach(() => {
      render(<CYOA />);
    });

    it('presents information in a logical flow', () => {
      const container = document.querySelector('.container.top-margin');
      const children = Array.from(container.children);
      
      // Should start with headings, then intro, then features
      expect(children[0].tagName).toBe('H1'); // Main title
      expect(children[1].tagName).toBe('H2'); // Coming Soon
    });

    it('groups related content appropriately', () => {
      // Feature cards should be in the same grid
      const featureGrid = document.querySelector('.blog-grid.top-margin');
      const featureCards = featureGrid.querySelectorAll('.post-card');
      expect(featureCards.length).toBe(4); // Four feature cards
      
      // Why CYOA section should be separate
      const whyCard = screen.getByRole('heading', { name: 'Why Choose Your Own Adventure?' }).closest('.post-card');
      expect(whyCard.parentElement).not.toBe(featureGrid);
    });

    it('uses appropriate spacing and visual hierarchy', () => {
      const topMarginElements = document.querySelectorAll('.top-margin');
      expect(topMarginElements.length).toBeGreaterThan(2); // Multiple sections with spacing
    });
  });

  describe('Performance and Reliability', () => {
    it('handles multiple renders without issues', () => {
      const { rerender } = render(<CYOA />);
      
      for (let i = 0; i < 3; i++) {
        rerender(<CYOA />);
        expect(screen.getByRole('heading', { name: 'Interactive Leadership CYOA' })).toBeInTheDocument();
      }
    });

    it('cleans up properly on unmount', () => {
      const { unmount } = render(<CYOA />);
      expect(() => unmount()).not.toThrow();
    });

    it('renders consistently across multiple instances', () => {
      const { rerender } = render(<CYOA />);
      const initialHeadingsCount = screen.getAllByRole('heading').length;
      const initialCardsCount = document.querySelectorAll('.post-card').length;
      
      rerender(<CYOA />);
      
      expect(screen.getAllByRole('heading')).toHaveLength(initialHeadingsCount);
      expect(document.querySelectorAll('.post-card')).toHaveLength(initialCardsCount);
    });
  });
});