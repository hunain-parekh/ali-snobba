import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar component', () => {
  test('renders logo and cart icon', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    const cartIcon = screen.getByTitle('shopping-cart');
    expect(cartIcon).toBeInTheDocument();
  });

  test('links to home page and cart page', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole('link', { name: 'home' });
    expect(homeLink.href).toContain('/');
    const cartLink = screen.getByRole('link', { name: 'cart' });
    expect(cartLink.href).toContain('/cart');
  });
});
