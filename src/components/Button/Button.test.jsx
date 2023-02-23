import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders with the correct class name', () => {
    const { getByRole } = render(<Button className="primary">Click me</Button>);
    const button = getByRole('button');
    expect(button.classList).toContain('primary');
  });

  test('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders the correct text', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expect(button.textContent).toBe('Click me');
  });
});