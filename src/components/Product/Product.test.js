import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from './Product';

const product = {
  id: 1,
  name: 'Product 1',
  shortDesc: 'Short description of product 1',
  price: 100,
  imageLink: 'https://example.com/product1.jpg',
};

describe('Product', () => {
  test('renders product name and short description', () => {
    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Short description of product 1')).toBeInTheDocument();
  });
  
  test('renders product image', () => {
    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    const image = screen.getByAltText('Product 1');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/product1.jpg');
  });

  test('decreases quantity when "-" button is clicked', () => {
    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    const minusButton = screen.getByText('-');
    const quantityText = screen.getByText('1');
    fireEvent.click(minusButton);
    expect(quantityText.textContent).toBe('1');
    fireEvent.click(minusButton);
    expect(quantityText.textContent).toBe('1');
  });

  test('increases quantity when "+" button is clicked', () => {
    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    const plusButton = screen.getByText('+');
    const quantityText = screen.getByText('1');
    fireEvent.click(plusButton);
    expect(quantityText.textContent).toBe('2');
    fireEvent.click(plusButton);
    expect(quantityText.textContent).toBe('3');
  });

  test('adds product to cart when "ADD TO CART" button is clicked', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ status: 200 });
    global.fetch = mockFetch;

    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('ADD TO CART'));
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8081/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: 1,
        quantity: 1,
        totalPrice: 100,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });

  test('does not decrease quantity below 1', () => {
    render(
      <MemoryRouter>
        <Product item={product} />
      </MemoryRouter>
    );
    const minusButton = screen.getByText('-');
    const quantityText = screen.getByText('1');
    fireEvent.click(minusButton);
    expect(quantityText.textContent).toBe('1');
  });

  
});