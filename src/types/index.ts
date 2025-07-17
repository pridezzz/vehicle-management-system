// Core entities
export interface VehicleMake {
  id: number;
  name: string;
  abrv: string;
  createdAt?: string;
}

export interface VehicleModel {
  id: number;
  makeId: number;
  name: string;
  abrv: string;
  createdAt?: string;
  make?: VehicleMake;
}

export interface VehicleModelWithMake extends VehicleModel {
  make: VehicleMake;
}

// API parameters
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: keyof VehicleModel | 'make.name';
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  makeId?: number;
}

export interface VehicleListParams extends PaginationParams {
  sort?: SortParams;
  filter?: FilterParams;
}

// API responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

// Filter state persistence
export interface PersistedFilterState {
  search: string;
  makeId: number | null;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  pageSize: number;
}

// Toast notification types
export interface ToastOptions {
  type: 'success' | 'error' | 'loading';
  message: string;
  duration?: number;
}