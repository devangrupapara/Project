// store.js
import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './vehicleSlice';
import viewAllReducer from './viewAllSlice';
import userReducer from './userSlice';
import priceSummaryReducer from './priceSummarySlice';

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    viewAll: viewAllReducer,
    user: userReducer,
    vehicles: vehicleReducer,
    priceSummary: priceSummaryReducer,
  },
});