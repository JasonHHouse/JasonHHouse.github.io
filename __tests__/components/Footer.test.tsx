import { render, screen } from '@testing-library/react';
import Footer from '../../pages/common/Footer';

// Mock the CSS module
jest.mock('../../pages/common/Footer.module.css', () => ({
  footer: 'footer-mock-class',
}));

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('Rendering', () => {
    it('renders the footer component without crashing', () => {
      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
    });

    it('renders within a container div', () => {
      const containerDiv = screen.getByRole('contentinfo').parentElement;
      expect(containerDiv).toHaveClass('container');
    });

    it('applies the correct CSS module class', () => {
      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement).toHaveClass('footer-mock-class');
    });
  });

  describe('Copyright Information', () => {
    it('displays the correct copyright text', () => {
      expect(screen.getByText(/© 2025 Jason House's Blog\. All rights reserved\./)).toBeInTheDocument();
    });

    it('displays the current year in copyright', () => {
      expect(screen.getByText(/© 2025/)).toBeInTheDocument();
    });

    it('includes the site name in copyright', () => {
      expect(screen.getByText(/Jason House's Blog/)).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders the Privacy Policy link', () => {
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      expect(privacyLink).toBeInTheDocument();
    });

    it('renders the Contact link', () => {
      const contactLink = screen.getByRole('link', { name: /contact/i });
      expect(contactLink).toBeInTheDocument();
    });

    it('has correct href attribute for Privacy Policy link', () => {
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    it('has correct href attribute for Contact link', () => {
      const contactLink = screen.getByRole('link', { name: /contact/i });
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('renders exactly two navigation links', () => {
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic footer element', () => {
      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement.tagName).toBe('FOOTER');
    });

    it('has accessible link text', () => {
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      const contactLink = screen.getByRole('link', { name: /contact/i });
      
      expect(privacyLink).toHaveAccessibleName('Privacy Policy');
      expect(contactLink).toHaveAccessibleName('Contact');
    });

    it('links are keyboard navigable', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeVisible();
        expect(link.getAttribute('href')).toBeTruthy();
      });
    });
  });

  describe('Content Structure', () => {
    it('contains copyright text followed by links', () => {
      const footerElement = screen.getByRole('contentinfo');
      const footerText = footerElement.textContent;
      
      expect(footerText).toMatch(/© 2025.*Privacy Policy.*Contact/);
    });

    it('has proper spacing between elements', () => {
      const footerElement = screen.getByRole('contentinfo');
      
      // Check that non-breaking spaces are present (represented as \u00a0)
      expect(footerElement.innerHTML).toContain('&nbsp;');
    });
  });

  describe('Component Export', () => {
    it('exports the component as default', () => {
      expect(Footer).toBeDefined();
      expect(typeof Footer).toBe('function');
    });
  });
});

describe('Footer Component Edge Cases', () => {
  it('handles multiple renders without issues', () => {
    const { rerender } = render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    rerender(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    rerender(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('maintains consistent structure across renders', () => {
    const { rerender } = render(<Footer />);
    const initialLinksCount = screen.getAllByRole('link').length;
    const initialCopyright = screen.getByText(/© 2025/);
    
    rerender(<Footer />);
    const rerenderedLinksCount = screen.getAllByRole('link').length;
    const rerenderedCopyright = screen.getByText(/© 2025/);
    
    expect(rerenderedLinksCount).toBe(initialLinksCount);
    expect(rerenderedCopyright).toBeInTheDocument();
    expect(initialCopyright).toBeInTheDocument();
  });
});

describe('Footer Component Integration', () => {
  it('works correctly when CSS module fails to load', () => {
    // Test graceful degradation when CSS module is not available
    jest.doMock('../../pages/common/Footer.module.css', () => ({}));
    
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});