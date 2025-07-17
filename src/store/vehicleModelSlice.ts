import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleModel, VehicleModelWithMake, PaginatedResponse } from '../types';

interface VehicleModelState {
  models: VehicleModelWithMake[];
  currentModel: VehicleModel | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search: string;
    makeId: number | null;
  };
  sort: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

const initialState: VehicleModelState = {
  models: [],
  currentModel: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    makeId: null,
  },
  sort: {
    field: 'name',
    direction: 'asc',
  },
};

const vehicleModelSlice = createSlice({
  name: 'vehicleModel',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setModels: (state, action: PayloadAction<PaginatedResponse<VehicleModelWithMake>>) => {
      state.models = action.payload.data;
      state.pagination = {
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
      };
      state.loading = false;
      state.error = null;
    },
    setCurrentModel: (state, action: PayloadAction<VehicleModel | null>) => {
      state.currentModel = action.payload;
    },
    addModel: (state, action: PayloadAction<VehicleModelWithMake>) => {
      state.models.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateModel: (state, action: PayloadAction<VehicleModelWithMake>) => {
      const index = state.models.findIndex(model => model.id === action.payload.id);
      if (index !== -1) {
        state.models[index] = action.payload;
      }
    },
    deleteModel: (state, action: PayloadAction<number>) => {
      state.models = state.models.filter(model => model.id !== action.payload);
      state.pagination.total -= 1;
    },
    setFilters: (state, action: PayloadAction<Partial<VehicleModelState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action: PayloadAction<VehicleModelState['sort']>) => {
      state.sort = action.payload;
    },
    setPagination: (state, action: PayloadAction<Partial<VehicleModelState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setModels,
  setCurrentModel,
  addModel,
  updateModel,
  deleteModel,
  setFilters,
  setSort,
  setPagination,
  setError,
  clearError,
} = vehicleModelSlice.actions;

export default vehicleModelSlice.reducer;