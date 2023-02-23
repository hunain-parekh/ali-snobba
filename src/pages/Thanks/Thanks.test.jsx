
// Refactored code: 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Thanks from './Thanks';
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('Thanks Component', () => {

  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);
  });

  it('should render the component correctly', () => {

    const { getByText, getByAltText } = render(<Thanks />);

    expect(getByText('THANKS')).toBeInTheDocument();
    expect(getByText('For Your Order')).toBeInTheDocument();
    expect(getByAltText('logo')).toBeInTheDocument();

  });
});