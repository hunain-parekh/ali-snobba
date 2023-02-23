import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartProduct from './CartProduct';

describe('CartProduct component', () => {
  const testItem = {
    id: '1',
    productId: '123',
    quantity: 2,
    totalPrice: 3000,
  };

  const mockDeleteItem = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: '123',
            name: 'Test Product',
            price: 1500,
            imageLink: 'https://example.com/image.jpg',
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details correctly', async () => {
    render(<CartProduct item={testItem} deleteItem={mockDeleteItem} />);
    const productImage = screen.getByAltText('Test Product');
    expect(productImage.src).toBe('https://example.com/image.jpg/');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price : Rs. 1,500')).toBeInTheDocument();
    expect(screen.getByText('Quantity : 2')).toBeInTheDocument();
    expect(screen.getByText('Total Price : Rs. 3,000')).toBeInTheDocument();
  });

  test('calls deleteItem function when delete button is clicked', async () => {
    render(<CartProduct item={testItem} deleteItem={mockDeleteItem} />);
    const deleteButton = screen.getByText('X');
    fireEvent.click(deleteButton);
    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteItem).toHaveBeenCalledWith(testItem);
  });
});
