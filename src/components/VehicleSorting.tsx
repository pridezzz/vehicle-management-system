import React from 'react';
import { SortParams } from '../types';

interface VehicleSortingProps {
  sort: SortParams;
  onSortChange: (sort: SortParams) => void;
}

const VehicleSorting: React.FC<VehicleSortingProps> = ({ sort, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Model Name' },
    { value: 'abrv', label: 'Model Abbreviation' },
    { value: 'make.name', label: 'Make Name' },
    { value: 'id', label: 'ID' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      marginBottom: '20px'
    }}>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Sort by:</span>
      
      <select
        value={sort.field}
        onChange={(e) => onSortChange({ ...sort, field: e.target.value as SortParams['field'] })}
        style={{
          padding: '6px 10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <select
        value={sort.direction}
        onChange={(e) => onSortChange({ ...sort, direction: e.target.value as 'asc' | 'desc' })}
        style={{
          padding: '6px 10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default VehicleSorting;