import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase, TABLES } from './supabase';
import { VehicleMake, VehicleModel, VehicleModelWithMake, PaginatedResponse, VehicleListParams } from '../types';

// Helper function to build Supabase query with filters, sorting, and pagination
const buildModelsQuery = (params: VehicleListParams) => {
  let query = supabase
    .from(TABLES.VEHICLE_MODELS)
    .select(`
      *,
      make:vehicle_makes(*)
    `);

  // Apply search filter
  if (params.filter?.search) {
    query = query.or(`name.ilike.%${params.filter.search}%,vehicle_makes.name.ilike.%${params.filter.search}%`);
  }

  // Apply make filter
  if (params.filter?.makeId) {
    query = query.eq('make_id', params.filter.makeId);
  }

  // Apply sorting
  if (params.sort) {
    const { field, direction } = params.sort;
    if (field === 'make.name') {
      query = query.order('name', { ascending: direction === 'asc', foreignTable: 'vehicle_makes' });
    } else {
      query = query.order(field === 'makeId' ? 'make_id' : field, { ascending: direction === 'asc' });
    }
  }

  // Apply pagination
  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;
  query = query.range(from, to);

  return query;
};

// Supabase API implementation
export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['VehicleMake', 'VehicleModel'],
  endpoints: (builder) => ({
    // Vehicle Makes
    getMakes: builder.query<VehicleMake[], void>({
      query: () => '/makes',
      providesTags: ['VehicleMake'],
    }),
    
    createMake: builder.mutation<VehicleMake, Omit<VehicleMake, 'id'>>({
      query: (newMake) => ({
        url: '/makes',
        method: 'POST',
        body: newMake,
      }),
      invalidatesTags: ['VehicleMake'],
    }),
    
    // Vehicle Models
    getModels: builder.query<PaginatedResponse<VehicleModelWithMake>, VehicleListParams>({
      query: ({ page, limit, sort, filter }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        
        if (sort) {
          params.append('sortField', sort.field);
          params.append('sortDirection', sort.direction);
        }
        
        if (filter?.search) {
          params.append('search', filter.search);
        }
        
        if (filter?.makeId) {
          params.append('makeId', filter.makeId.toString());
        }
        
        return `/models?${params.toString()}`;
      },
      providesTags: ['VehicleModel'],
    }),
    
    getModel: builder.query<VehicleModelWithMake, number>({
      query: (id) => `/models/${id}`,
      providesTags: (result, error, id) => [{ type: 'VehicleModel', id }],
    }),
    
    createModel: builder.mutation<VehicleModelWithMake, Omit<VehicleModel, 'id'>>({
      query: (newModel) => ({
        url: '/models',
        method: 'POST',
        body: newModel,
      }),
      invalidatesTags: ['VehicleModel'],
    }),
    
    updateModel: builder.mutation<VehicleModelWithMake, { id: number; data: Omit<VehicleModel, 'id'> }>({
      query: ({ id, data }) => ({
        url: `/models/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'VehicleModel', id }],
    }),
    
    deleteModel: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/models/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VehicleModel'],
    }),
  }),
});

export const {
  useGetMakesQuery,
  useCreateMakeMutation,
  useGetModelsQuery,
  useGetModelQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = vehicleApi;