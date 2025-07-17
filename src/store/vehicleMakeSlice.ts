import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleMake } from '../types';

interface VehicleMakeState {
  makes: VehicleMake[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleMakeState = {
  makes: [],
  loading: false,
  error: null,
};

const vehicleMakeSlice = createSlice({
  name: 'vehicleMake',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMakes: (state, action: PayloadAction<VehicleMake[]>) => {
      state.makes = action.payload;
      state.loading = false;
      state.error = null;
    },
    addMake: (state, action: PayloadAction<VehicleMake>) => {
      state.makes.push(action.payload);
    },
    updateMake: (state, action: PayloadAction<VehicleMake>) => {
      const index = state.makes.findIndex(make => make.id === action.payload.id);
      if (index !== -1) {
        state.makes[index] = action.payload;
      }
    },
    deleteMake: (state, action: PayloadAction<number>) => {
      state.makes = state.makes.filter(make => make.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setMakes,
  addMake,
  updateMake,
  deleteMake,
  setError,
} = vehicleMakeSlice.actions;

export default vehicleMakeSlice.reducer;