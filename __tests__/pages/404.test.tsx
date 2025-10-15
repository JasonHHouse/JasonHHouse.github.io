import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Custom404 from '../../pages/404';

// Mock Next.js router
const mockBack = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

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

describe('404 Page', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders without crashing', () => {
    render(<Custom404 />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('displays 404 heading', () => {
    render(<Custom404 />);
    expect(screen.getByRole('heading', { name: /404 - Page Not Found/i })).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Custom404 />);
    expect(screen.getByText(/Oops! The page you're looking for doesn't exist/i)).toBeInTheDocument();
    expect(screen.getByText(/It might have been moved or deleted/i)).toBeInTheDocument();
  });

  it('displays helpful links section', () => {
    render(<Custom404 />);
    expect(screen.getByText(/Here are some helpful links to get you back on track/i)).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    render(<Custom404 />);

    expect(screen.getByRole('link', { name: /Home Page/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Blog Posts/i })).toHaveAttribute('href', '/posts');
    expect(screen.getByRole('link', { name: /About Jason/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '/contact');
  });

  it('displays 404 image', () => {
    render(<Custom404 />);
    const image = screen.getByAltText('404 - Page Not Found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/404.png');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('displays go back button', () => {
    render(<Custom404 />);
    expect(screen.getByRole('button', { name: /Go Back/i })).toBeInTheDocument();
  });

  it('calls router.back() when go back button is clicked', () => {
    render(<Custom404 />);
    const backButton = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('has proper link list structure', () => {
    render(<Custom404 />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('includes Header and Footer components', () => {
    render(<Custom404 />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
