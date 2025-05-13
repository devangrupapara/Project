
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVehicleTypes = createAsyncThunk(
  'vehicles/fetchVehicleTypes',
  async () => {
    const response = await fetch('https://velriders.com/api/vehicle-types');
    const data = await response.json();
    if (data.status === 'success') {
      const uniqueTypes = [...new Set(data.data.map((vt) => vt.name))].map((name) => {
        const vt = data.data.find((v) => v.name === name);
        return { type_id: vt.type_id, name };
      });
      return uniqueTypes;
    }
    throw new Error('Failed to fetch vehicle types');
  }
);

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async ({ cityId, typeId = '', startDate = '', startTime = '', endDate = '', endTime = '' }) => {
    let url = `https://velriders.com/api/vehicles`;
    if (typeId) url += `?type_id=${typeId}`;
    else url += `?type_id=1`; 
    if (startDate && startTime && endDate && endTime) {
      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;
      url += `${typeId ? '&' : '?'}start_date=${encodeURIComponent(startDateTime)}&end_date=${encodeURIComponent(endDateTime)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.data.slice(0, 8); 
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicleTypes: [],
    vehicles: [],
    filteredVehicles: [],
    selectedTypeId: '',
    selectedCityId: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedTypeId: (state, action) => {
      state.selectedTypeId = action.payload;
      if (action.payload) {
        const selectedType = state.vehicleTypes.find((type) => type.type_id === action.payload);
        if (selectedType && selectedType.name.toLowerCase() === 'car') {
          state.filteredVehicles = state.vehicles.filter(
            (vehicle) => state.vehicleTypes.find((type) => type.type_id === vehicle.type_id)?.name.toLowerCase() === 'car'
          );
        } else {
          state.filteredVehicles = state.vehicles;
        }
      } else {
        state.filteredVehicles = state.vehicles.filter(
          (vehicle) => state.vehicleTypes.find((type) => type.type_id === vehicle.type_id)?.name.toLowerCase() === 'car'
        );
      }
    },
    setSelectedCityId: (state, action) => {
      state.selectedCityId = action.payload;
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setPickupTime: (state, action) => {
      state.pickupTime = action.payload;
    },
    setDropoffDate: (state, action) => {
      state.dropoffDate = action.payload;
    },
    setDropoffTime: (state, action) => {
      state.dropoffTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicleTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleTypes = action.payload;
      })
      .addCase(fetchVehicleTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
        if (state.selectedTypeId) {
          const selectedType = state.vehicleTypes.find((type) => type.type_id === state.selectedTypeId);
          if (selectedType && selectedType.name.toLowerCase() === 'car') {
            state.filteredVehicles = action.payload.filter(
              (vehicle) => state.vehicleTypes.find((type) => type.type_id === vehicle.type_id)?.name.toLowerCase() === 'car'
            );
          } else {
            state.filteredVehicles = action.payload;
          }
        } else {
          state.filteredVehicles = action.payload.filter(
            (vehicle) => state.vehicleTypes.find((type) => type.type_id === vehicle.type_id)?.name.toLowerCase() === 'car'
          );
        }
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedTypeId,
  setSelectedCityId,
  setPickupDate,
  setPickupTime,
  setDropoffDate,
  setDropoffTime,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;