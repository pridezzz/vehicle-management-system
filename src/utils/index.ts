import { PersistedFilterState } from '../types';

// Local storage keys
const STORAGE_KEYS = {
  VEHICLE_FILTERS: 'vehicle-management-filters',
} as const;

// Default filter state
const DEFAULT_FILTER_STATE: PersistedFilterState = {
  search: '',
  makeId: null,
  sortField: 'name',
  sortDirection: 'asc',
  pageSize: 10,
};

// localStorage utilities
export const storageUtils = {
  // Save filter state to localStorage
  saveFilters: (filters: Partial<PersistedFilterState>): void => {
    try {
      const currentFilters = storageUtils.getFilters();
      const updatedFilters = { ...currentFilters, ...filters };
      localStorage.setItem(
        STORAGE_KEYS.VEHICLE_FILTERS,
        JSON.stringify(updatedFilters)
      );
    } catch (error) {
      console.warn('Failed to save filters to localStorage:', error);
    }
  },

  // Get filter state from localStorage
  getFilters: (): PersistedFilterState => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VEHICLE_FILTERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_FILTER_STATE, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to parse filters from localStorage:', error);
    }
    return DEFAULT_FILTER_STATE;
  },

  // Clear all stored filters
  clearFilters: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.VEHICLE_FILTERS);
    } catch (error) {
      console.warn('Failed to clear filters from localStorage:', error);
    }
  },
};

// Debounce utility
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Format utilities
export const formatUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Format date
  formatDate: (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  },

  // Pluralize words
  pluralize: (count: number, singular: string, plural?: string): string => {
    if (count === 1) return singular;
    return plural || `${singular}s`;
  },
};

// Validation utilities
export const validationUtils = {
  // Check if string is not empty after trimming
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  // Check if value is within length limits
  isValidLength: (value: string, min: number, max: number): boolean => {
    const length = value.trim().length;
    return length >= min && length <= max;
  },

  // Check if ID is valid
  isValidId: (id: number): boolean => {
    return Number.isInteger(id) && id > 0;
  },
};