import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  longDesc: 'This is a test product.',
  price: 100,
  imageLink: 'https://example.com/image.jpg',
};

describe('ProductDetails', () => {
  it('renders product details correctly', async () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={[`/product/${mockProduct.id}`]}>
        <Route path="/product/:productID">
          <ProductDetails />
        </Route>
      </MemoryRouter>
    );

    expect(getByAltText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(mockProduct.longDesc)).toBeInTheDocument();
    expect(getByText(`Price : Rs. ${mockProduct.price.toLocaleString()}`)).toBeInTheDocument();
    expect(getByText('+')).toBeInTheDocument();
    expect(getByText('-')).toBeInTheDocument();
    expect(getByText('ADD TO CART')).toBeInTheDocument();
  });

  it('updates quantity correctly', async () => {
    render(
      <MemoryRouter initialEntries={[`/product/${mockProduct.id}`]}>
        <Route path="/product/:productID">
          <ProductDetails />
        </Route>
      </MemoryRouter>
    );

    const quantityIncreaseButton = screen.getByText('+');
    const quantityDecreaseButton = screen.getByText('-');
    const quantityDisplay = screen.getByText('1');

    fireEvent.click(quantityIncreaseButton);
    expect(quantityDisplay).toHaveTextContent('2');

    fireEvent.click(quantityDecreaseButton);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('adds item to cart correctly', async () => {
    const mockResponse = {
      status: 200,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        status: mockResponse.status,
      })
    );

    const { getByText } = render(
      <MemoryRouter initialEntries={[`/product/${mockProduct.id}`]}>
        <Route path="/product/:productID">
          <ProductDetails />
        </Route>
      </MemoryRouter>
    );

    const addToCartButton = getByText('ADD TO CART');
    fireEvent.click(addToCartButton);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: mockProduct.id,
        quantity: 1,
        totalPrice: mockProduct.price,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    expect(window.location.pathname).toBe('/cart');
  });
});
