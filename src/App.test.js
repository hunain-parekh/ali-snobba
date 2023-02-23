import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders Loader component initially', () => {
    render(<App />);
    const loaderElement = screen.getByRole('progressbar');
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders Main component after loader', async () => {
    render(<App />);
    await waitFor(() => {
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });
  });

  test('renders ProductList component on index route', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      const productListElement = screen.getByRole('list');
      expect(productListElement).toBeInTheDocument();
    });
  });

  test('renders ProductDetails component on details route', async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      const productDetailsElement = screen.getByRole('article');
      expect(productDetailsElement).toBeInTheDocument();
    });
  });

  test('renders Cart component on cart route', async () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      const cartElement = screen.getByTestId('cart-container');
      expect(cartElement).toBeInTheDocument();
    });
  });
  

  test('renders Thanks component on thanks route', async () => {
    render(
      <MemoryRouter initialEntries={['/thanks']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      const thanksElement = screen.getByRole('heading');
      expect(thanksElement).toBeInTheDocument();
    });
  });
});
