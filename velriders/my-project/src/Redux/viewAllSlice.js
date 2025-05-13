import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllVehicles = createAsyncThunk(
  'viewAll/fetchAllVehicles',
  async (
    { cityId, typeId = '', modelId = '', startDate = '', endDate = '', fuelTypes = [] },
    { rejectWithValue }
  ) => {
    try {
      let url = `https://velriders.com/api/vehicles?city_id=${cityId}&is_deleted=0`;
      if (typeId) url += `&type_id=${typeId}`;
      if (modelId) url += `&model_id=${modelId}`;
      if (startDate) url += `&start_date=${encodeURIComponent(startDate)}`;
      if (endDate) url += `&end_date=${encodeURIComponent(endDate)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data) {
        throw new Error('No vehicles found in response');
      }
      let vehicles = data.data.filter((vehicle) => vehicle.convenience_fees !== '99.00');
      if (fuelTypes.length > 0) {
        vehicles = vehicles.filter((vehicle) =>
          fuelTypes.includes(vehicle.properties?.fuel_type_name)
        );
      }
      return vehicles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVehicleModels = createAsyncThunk(
  'viewAll/fetchVehicleModels',
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://velriders.com/api/models?vehicle_type_id=${typeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const viewAllSlice = createSlice({
  name: 'viewAll',
  initialState: {
    allVehicles: [],
    filteredVehicles: [],
    vehicleType: '',
    vehicleModel: '',
    fuelTypes: [],
    fromDate: '',
    toDate: '',
    loading: false,
    error: null,
    currentPage: 1,
    models: [],
  },
  reducers: {
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    setVehicleModel: (state, action) => {
      state.vehicleModel = action.payload;
    },
    setFuelTypes: (state, action) => {
      state.fuelTypes = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.allVehicles = action.payload;
        state.filteredVehicles = action.payload;
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch vehicles';
      })
      .addCase(fetchVehicleModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(fetchVehicleModels.rejected, (state, action) => {
        state.loading = false;
        state.models = [];
        state.error = action.payload || 'Failed to fetch vehicle models';
      });
  },
});

export const {
  setVehicleType,
  setVehicleModel,
  setFuelTypes,
  setFromDate,
  setToDate,
  setCurrentPage,
} = viewAllSlice.actions;

export default viewAllSlice.reducer;