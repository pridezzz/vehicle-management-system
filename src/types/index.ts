export interface VehicleMake {
  id: number;
  name: string;
  abrv: string;
}

export interface VehicleModel {
  id: number;
  makeId: number;
  name: string;
  abrv: string;
  make?: VehicleMake;
}

export interface VehicleModelWithMake extends VehicleModel {
  make: VehicleMake;
}

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

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}