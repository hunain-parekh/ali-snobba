import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main', () => {
  test('renders Navbar component', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });
});
