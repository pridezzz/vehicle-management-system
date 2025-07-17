import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VehicleModelCard from '../VehicleModelCard';
import { VehicleModelWithMake } from '../../types';

const mockModel: VehicleModelWithMake = {
  id: 1,
  makeId: 1,
  name: 'Test Model',
  abrv: 'TM',
  make: {
    id: 1,
    name: 'Test Make',
    abrv: 'TM'
  }
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('VehicleModelCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders model information correctly', () => {
    render(
      <VehicleModelCard 
        model={mockModel} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Model')).toBeInTheDocument();
    expect(screen.getByText('Test Make')).toBeInTheDocument();
    expect(screen.getByText('TM')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <VehicleModelCard 
        model={mockModel} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <VehicleModelCard 
        model={mockModel} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});