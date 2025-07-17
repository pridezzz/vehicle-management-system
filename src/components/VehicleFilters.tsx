import React from 'react';
import { VehicleMake } from '../types';
import DebouncedSearchInput from './DebouncedSearchInput';

interface VehicleFiltersProps {
  search: string;
  selectedMakeId: number | null;
  makes: VehicleMake[];
  onSearchChange: (search: string) => void;
  onMakeChange: (makeId: number | null) => void;
  onClearFilters: () => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  search,
  selectedMakeId,
  makes,
  onSearchChange,
  onMakeChange,
  onClearFilters,
}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Search:</label>
        <DebouncedSearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search models or makes..."
          style={{ minWidth: '200px' }}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Make:</label>
        <select
          value={selectedMakeId || ''}
          onChange={(e) => onMakeChange(e.target.value ? parseInt(e.target.value) : null)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            minWidth: '150px'
          }}
        >
          <option value="">All Makes</option>
          {makes.map(make => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={onClearFilters}
        style={{
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginTop: '20px'
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default VehicleFilters;