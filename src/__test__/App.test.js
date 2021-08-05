import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders may the force be with you', () => {
  render(<App />);
  const strongElement = screen.getByText(/may the force be with you/i);
  expect(strongElement).toBeInTheDocument();
});