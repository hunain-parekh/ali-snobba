import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders the logo image', () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('renders the logo with the correct source', () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText('logo').src).toContain('https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/Logo.png');
  });
});
