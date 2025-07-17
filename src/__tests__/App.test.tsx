import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the API hooks
jest.mock('../api', () => ({
  useGetModelsQuery: () => ({
    data: {
      data: [
        {
          id: 1,
          makeId: 1,
          name: 'Test Model',
          abrv: 'TM',
          make: { id: 1, name: 'Test Make', abrv: 'TM' }
        }
      ],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    },
    isLoading: false,
    error: null
  }),
  useGetMakesQuery: () => ({
    data: [{ id: 1, name: 'Test Make', abrv: 'TM' }],
    isLoading: false
  }),
  useDeleteModelMutation: () => [jest.fn(), { isLoading: false }]
}));

test('renders vehicle management header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Vehicle Management System/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders vehicle models page by default', () => {
  render(<App />);
  const vehicleModelsHeading = screen.getByRole('heading', { name: /Vehicle Models/i });
  expect(vehicleModelsHeading).toBeInTheDocument();
});