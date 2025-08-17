import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user lookup system', () => {
  render(<App />);
  const linkElement = screen.getByText(/User Lookup System/i);
  expect(linkElement).toBeInTheDocument();
});
