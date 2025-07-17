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

// Transform Supabase response to match our types
const transformModelResponse = (data: any): VehicleModelWithMake => ({
  id: data.id,
  makeId: data.make_id,
  name: data.name,
  abrv: data.abrv,
  createdAt: data.created_at,
  make: {
    id: data.make.id,
    name: data.make.name,
    abrv: data.make.abrv,
    createdAt: data.make.created_at,
  },
});

// Supabase API implementation
export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['VehicleMake', 'VehicleModel'],
  endpoints: (builder) => ({
    // Vehicle Makes
    getMakes: builder.query<VehicleMake[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from(TABLES.VEHICLE_MAKES)
            .select('*')
            .order('name');

          if (error) throw error;

          return { data: data || [] };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      providesTags: ['VehicleMake'],
    }),

    createMake: builder.mutation<VehicleMake, Omit<VehicleMake, 'id' | 'createdAt'>>({
      queryFn: async (newMake) => {
        try {
          const { data, error } = await supabase
            .from(TABLES.VEHICLE_MAKES)
            .insert([{ name: newMake.name, abrv: newMake.abrv }])
            .select()
            .single();

          if (error) throw error;

          return { data };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: ['VehicleMake'],
    }),

    // Vehicle Models
    getModels: builder.query<PaginatedResponse<VehicleModelWithMake>, VehicleListParams>({
      queryFn: async (params) => {
        try {
          // Get total count first
          let countQuery = supabase
            .from(TABLES.VEHICLE_MODELS)
            .select('id', { count: 'exact', head: true });

          if (params.filter?.search) {
            countQuery = countQuery.or(`name.ilike.%${params.filter.search}%`);
          }
          if (params.filter?.makeId) {
            countQuery = countQuery.eq('make_id', params.filter.makeId);
          }

          const { count, error: countError } = await countQuery;
          if (countError) throw countError;

          // Get paginated data
          const { data, error } = await buildModelsQuery(params);
          if (error) throw error;

          const transformedData = (data || []).map(transformModelResponse);
          const total = count || 0;
          const totalPages = Math.ceil(total / params.limit);

          const response: PaginatedResponse<VehicleModelWithMake> = {
            data: transformedData,
            total,
            page: params.page,
            limit: params.limit,
            totalPages,
          };

          return { data: response };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      providesTags: ['VehicleModel'],
    }),

    getModel: builder.query<VehicleModelWithMake, number>({
      queryFn: async (id) => {
        try {
          const { data, error } = await supabase
            .from(TABLES.VEHICLE_MODELS)
            .select(`
              *,
              make:vehicle_makes(*)
            `)
            .eq('id', id)
            .single();

          if (error) throw error;
          if (!data) throw new Error('Model not found');

          return { data: transformModelResponse(data) };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      providesTags: (result, error, id) => [{ type: 'VehicleModel', id }],
    }),

    createModel: builder.mutation<VehicleModelWithMake, Omit<VehicleModel, 'id' | 'createdAt'>>({
      queryFn: async (newModel) => {
        try {
          const { data, error } = await supabase
            .from(TABLES.VEHICLE_MODELS)
            .insert([{
              make_id: newModel.makeId,
              name: newModel.name,
              abrv: newModel.abrv,
            }])
            .select(`
              *,
              make:vehicle_makes(*)
            `)
            .single();

          if (error) throw error;

          return { data: transformModelResponse(data) };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: ['VehicleModel'],
    }),

    updateModel: builder.mutation<VehicleModelWithMake, { id: number; data: Omit<VehicleModel, 'id' | 'createdAt'> }>({
      queryFn: async ({ id, data: updateData }) => {
        try {
          const { data, error } = await supabase
            .from(TABLES.VEHICLE_MODELS)
            .update({
              make_id: updateData.makeId,
              name: updateData.name,
              abrv: updateData.abrv,
            })
            .eq('id', id)
            .select(`
              *,
              make:vehicle_makes(*)
            `)
            .single();

          if (error) throw error;

          return { data: transformModelResponse(data) };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'VehicleModel', id }],
    }),

    deleteModel: builder.mutation<{ success: boolean }, number>({
      queryFn: async (id) => {
        try {
          const { error } = await supabase
            .from(TABLES.VEHICLE_MODELS)
            .delete()
            .eq('id', id);

          if (error) throw error;

          return { data: { success: true } };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
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