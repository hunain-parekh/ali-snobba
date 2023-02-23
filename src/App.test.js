import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {

  test('navbar shows after loader',async ()=>{
    render(<App/>)
    const loading_header = await screen.findByTestId("loading-header");
    await new Promise((r)=> setTimeout(r,2000))
    await waitFor(async()=>{
      const nav = await screen.findByRole('navigation');
      expect(nav).toBeDefined();
    })
  });

});
