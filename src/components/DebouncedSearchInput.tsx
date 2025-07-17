import React from 'react';

interface DebouncedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  style,
  disabled = false,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div style={{ position: 'relative', ...style }} className={className}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '8px 40px 8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#007bff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ddd';
        }}
      />
      
      {/* Search icon */}
      <div
        style={{
          position: 'absolute',
          right: value ? '32px' : '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
          pointerEvents: 'none',
        }}
      >
        🔍
      </div>

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#999',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '2px',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DebouncedSearchInput;