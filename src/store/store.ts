import { configureStore } from '@reduxjs/toolkit';
import { vehicleApi } from '../api/vehicleApi';
import vehicleMakeReducer from './vehicleMakeSlice';
import vehicleModelReducer from './vehicleModelSlice';

export const store = configureStore({
  reducer: {
    vehicleMake: vehicleMakeReducer,
    vehicleModel: vehicleModelReducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehicleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;