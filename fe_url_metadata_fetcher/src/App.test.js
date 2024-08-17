import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App component', () => {
  it('renders input fields and submit button', () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);
    expect(getAllByPlaceholderText('Enter URL').length).toBe(3);
    expect(getByText('Fetch Metadata')).toBeInTheDocument();
  });


  it('fetches and displays metadata for valid URLs', async () => {
    axios.post.mockResolvedValue({
      data: [
        { title: 'Example', description: 'An example website', image: 'example.jpg' },
        { title: 'Google', description: 'Search engine', image: 'google.jpg' },
        { title: 'GitHub', description: 'Version control', image: 'github.jpg' },
      ]
    });

    const { getByText, getAllByPlaceholderText } = render(<App />);
    fireEvent.change(getAllByPlaceholderText('Enter URL')[0], { target: { value: 'https://www.youtube.com' } });
    fireEvent.change(getAllByPlaceholderText('Enter URL')[1], { target: { value: 'https://www.google.com' } });
    fireEvent.change(getAllByPlaceholderText('Enter URL')[2], { target: { value: 'https://www.github.com' } });
    fireEvent.click(getByText('Fetch Metadata'));

    await waitFor(() => {
      expect(getByText('Example')).toBeInTheDocument();
      expect(getByText('Google')).toBeInTheDocument();
      expect(getByText('GitHub')).toBeInTheDocument();
    });
  });
});