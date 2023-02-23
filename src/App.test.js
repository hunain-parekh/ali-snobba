import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  it('should render the loader on mount', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render the main page after loader', async () => {
    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(getByText(/Welcome to Alisnobba/i)).toBeInTheDocument();
  });

  it('should navigate to the cart page when clicking on cart icon', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    const cartIcon = getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute('href', '/cart');

    getByText(/red-gold-lamp/i).click();

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    const addToCartBtn = getByText(/add to cart/i);
    expect(addToCartBtn).toBeInTheDocument();
    addToCartBtn.click();

    await waitFor(() => {
      expect(getByTestId('cart-count')).toHaveTextContent('1');
    });

    cartIcon.click();

    expect(getByText(/red-gold-lamp/i)).toBeInTheDocument();
    expect(getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('should navigate to the thanks page after successful checkout', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    getByText(/red-gold-lamp/i).click();

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    const addToCartBtn = getByText(/add to cart/i);
    expect(addToCartBtn).toBeInTheDocument();
    addToCartBtn.click();

    await waitFor(() => {
      expect(getByTestId('cart-count')).toHaveTextContent('1');
    });

    getByTestId('cart-icon').click();

    getByText(/checkout/i).click();

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });

    getByText(/place order/i).click();

    await waitFor(() => {
      expect(getByText(/thanks for your order/i)).toBeInTheDocument();
    });
  });
});
