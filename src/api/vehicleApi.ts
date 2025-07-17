import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VehicleMake, VehicleModel, VehicleModelWithMake, PaginatedResponse, VehicleListParams } from '../types';

// Mock data for development
const mockMakes: VehicleMake[] = [
  { id: 1, name: 'BMW', abrv: 'BMW' },
  { id: 2, name: 'Mercedes-Benz', abrv: 'MB' },
  { id: 3, name: 'Audi', abrv: 'AUD' },
  { id: 4, name: 'Toyota', abrv: 'TOY' },
  { id: 5, name: 'Honda', abrv: 'HON' },
];

const mockModels: VehicleModelWithMake[] = [
  { id: 1, makeId: 1, name: '325i', abrv: '325i', make: mockMakes[0] },
  { id: 2, makeId: 1, name: 'X5', abrv: 'X5', make: mockMakes[0] },
  { id: 3, makeId: 1, name: 'M3', abrv: 'M3', make: mockMakes[0] },
  { id: 4, makeId: 2, name: 'C-Class', abrv: 'C', make: mockMakes[1] },
  { id: 5, makeId: 2, name: 'E-Class', abrv: 'E', make: mockMakes[1] },
  { id: 6, makeId: 2, name: 'S-Class', abrv: 'S', make: mockMakes[1] },
  { id: 7, makeId: 3, name: 'A4', abrv: 'A4', make: mockMakes[2] },
  { id: 8, makeId: 3, name: 'Q7', abrv: 'Q7', make: mockMakes[2] },
  { id: 9, makeId: 4, name: 'Camry', abrv: 'CAM', make: mockMakes[3] },
  { id: 10, makeId: 4, name: 'Prius', abrv: 'PRI', make: mockMakes[3] },
  { id: 11, makeId: 5, name: 'Civic', abrv: 'CIV', make: mockMakes[4] },
  { id: 12, makeId: 5, name: 'Accord', abrv: 'ACC', make: mockMakes[4] },
];

let nextModelId = 13;
let nextMakeId = 6;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
const mockApi = async (url: string, options?: RequestInit) => {
  await delay(500); // Simulate network delay
  
  const method = options?.method || 'GET';
  
  try {
    if (url.includes('/makes')) {
      if (method === 'GET') {
        return { json: async () => mockMakes };
      }
      if (method === 'POST') {
        const body = JSON.parse(options?.body as string);
        const newMake = { ...body, id: nextMakeId++ };
        mockMakes.push(newMake);
        return { json: async () => newMake };
      }
    }
    
    if (url.includes('/models')) {
      if (method === 'GET') {
        const urlObj = new URL(url, 'http://localhost');
        const page = parseInt(urlObj.searchParams.get('page') || '1');
        const limit = parseInt(urlObj.searchParams.get('limit') || '10');
        const search = urlObj.searchParams.get('search') || '';
        const makeId = urlObj.searchParams.get('makeId');
        const sortField = urlObj.searchParams.get('sortField') || 'name';
        const sortDirection = urlObj.searchParams.get('sortDirection') || 'asc';
        
        let filteredModels = [...mockModels];
        
        // Apply search filter
        if (search) {
          filteredModels = filteredModels.filter(model => 
            model.name.toLowerCase().includes(search.toLowerCase()) ||
            model.make.name.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Apply make filter
        if (makeId) {
          filteredModels = filteredModels.filter(model => 
            model.makeId === parseInt(makeId)
          );
        }
        
        // Apply sorting
        filteredModels.sort((a, b) => {
          let aValue: string | number;
          let bValue: string | number;
          
          if (sortField === 'make.name') {
            aValue = a.make.name;
            bValue = b.make.name;
          } else {
            aValue = a[sortField as keyof VehicleModelWithMake] as string | number;
            bValue = b[sortField as keyof VehicleModelWithMake] as string | number;
          }
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' 
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
          
          return sortDirection === 'asc' 
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        });
        
        // Apply pagination
        const total = filteredModels.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedModels = filteredModels.slice(startIndex, endIndex);
        
        const response: PaginatedResponse<VehicleModelWithMake> = {
          data: paginatedModels,
          total,
          page,
          limit,
          totalPages,
        };
        
        return { json: async () => response };
      }
      
      if (method === 'POST') {
        const body = JSON.parse(options?.body as string);
        const make = mockMakes.find(m => m.id === body.makeId);
        if (!make) throw new Error('Make not found');
        
        const newModel: VehicleModelWithMake = {
          ...body,
          id: nextModelId++,
          make,
        };
        mockModels.push(newModel);
        return { json: async () => newModel };
      }
    }
    
    // Handle individual model operations
    const modelMatch = url.match(/\/models\/(\d+)/);
    if (modelMatch) {
      const modelId = parseInt(modelMatch[1]);
      
      if (method === 'GET') {
        const model = mockModels.find(m => m.id === modelId);
        if (!model) throw new Error('Model not found');
        return { json: async () => model };
      }
      
      if (method === 'PUT') {
        const body = JSON.parse(options?.body as string);
        const index = mockModels.findIndex(m => m.id === modelId);
        if (index === -1) throw new Error('Model not found');
        
        const make = mockMakes.find(m => m.id === body.makeId);
        if (!make) throw new Error('Make not found');
        
        const updatedModel: VehicleModelWithMake = {
          ...body,
          id: modelId,
          make,
        };
        mockModels[index] = updatedModel;
        return { json: async () => updatedModel };
      }
      
      if (method === 'DELETE') {
        const index = mockModels.findIndex(m => m.id === modelId);
        if (index === -1) throw new Error('Model not found');
        
        mockModels.splice(index, 1);
        return { json: async () => ({ success: true }) };
      }
    }
    
    throw new Error('Not found');
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    fetchFn: mockApi as any,
  }),
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