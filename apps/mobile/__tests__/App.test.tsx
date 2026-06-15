import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders the foundation screen', () => {
    const { getByText } = render(<App />);

    expect(getByText('Discoverly')).toBeTruthy();
    expect(getByText('Mobile foundation ready for development.')).toBeTruthy();
  });
});
