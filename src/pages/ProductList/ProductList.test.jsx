import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    imageLink: 'https://example.com/image.jpg',
    shortDesc: 'A short description',
    longDesc: 'A long description',
  };
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([mockProduct]),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a list of products', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/product/all'
      );
    });

    const productElements = screen.getAllByTestId('product');
    expect(productElements).toHaveLength(1);
  });

  it('should render a message if no products are found', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue([]) });

    render(<ProductList />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/product/all'
      );
    });

    const noProductsElement = screen.getByText('No products found');
    expect(noProductsElement).toBeInTheDocument();
  });
});
