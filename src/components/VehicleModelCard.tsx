import React from 'react';
import { VehicleModelWithMake } from '../types';

interface VehicleModelCardProps {
  model: VehicleModelWithMake;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const VehicleModelCard: React.FC<VehicleModelCardProps> = ({ model, onEdit, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{model.name}</h3>
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>Make:</strong> {model.make.name}
      </p>
      <p style={{ margin: '4px 0', color: '#666' }}>
        <strong>Abbreviation:</strong> {model.abrv}
      </p>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onEdit(model.id)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(model.id)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleModelCard;