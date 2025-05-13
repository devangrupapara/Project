import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch vehicle details
export const fetchVehicleDetails = createAsyncThunk(
  'priceSummary/fetchVehicleDetails',
  async (vehicleId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://velriders.com/api/vehicle-details?vehicle_id=${vehicleId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status !== 'success') {
        throw new Error('Failed to fetch vehicle details');
      }
      return {
        name: data.data.vehicle_name || 'Vehicle Name',
        image: data.data.cutout_image || '',
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch coupons
export const fetchCoupons = createAsyncThunk(
  'priceSummary/fetchCoupons',
  async ({ vehicleId, totalPrice }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://velriders.com/api/get-coupons?vehicle_id=${vehicleId}&start_date=2025-02-21T19:13:00&end_date=2025-02-27T18:13:00&unlimited_kms=0&total_price=${totalPrice}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status !== 'success') {
        throw new Error('Failed to fetch coupons');
      }
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const priceSummarySlice = createSlice({
  name: 'priceSummary',
  initialState: {
    vehicleDetails: { name: 'Vehicle Name', image: '' },
    couponCode: '',
    couponMessage: '',
    totalPrice: 0,
    finalAmount: 0,
    couponApplied: false,
    coupons: [],
    showAllCoupons: false,
    discountAmount: 0,
    convenienceFee: 90,
    loading: false,
    error: null,
  },
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setCouponMessage: (state, action) => {
      state.couponMessage = action.payload;
    },
    applyCoupon: (state) => {
      if (state.couponApplied) {
        state.couponMessage = 'Coupon has already been applied!';
        return;
      }

      const coupon = state.coupons.find((c) => c.code === state.couponCode.trim());
      if (coupon) {
        let discount = 0;
        if (coupon.type === 'percentage') {
          discount = (state.totalPrice * coupon.percentage_discount) / 100;
        } else if (coupon.type === 'fixed') {
          discount = parseFloat(coupon.fixed_discount_amount);
        }

        const taxAmount = state.totalPrice * 0.18;
        const newFinalAmount = state.totalPrice + state.convenienceFee + taxAmount - discount;

        state.discountAmount = discount;
        state.finalAmount = newFinalAmount;
        state.couponMessage = `Coupon Applied! New Final Amount: ₹${newFinalAmount.toFixed(2)}`;
        state.couponApplied = true;
        state.showAllCoupons = false;
      } else {
        state.couponMessage = 'Invalid Coupon Code';
      }
    },
    removeCoupon: (state) => {
      const taxAmount = state.totalPrice * 0.18;
      state.finalAmount = state.totalPrice + taxAmount + state.convenienceFee;
      state.couponApplied = false;
      state.couponMessage = '';
      state.couponCode = '';
      state.discountAmount = 0;
    },
    toggleShowAllCoupons: (state) => {
      state.showAllCoupons = !state.showAllCoupons;
    },
    setInitialPrice: (state, action) => {
      const { totalPrice } = action.payload;
      state.totalPrice = totalPrice;
      const taxAmount = totalPrice * 0.18;
      state.finalAmount = totalPrice + taxAmount + state.convenienceFee;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Vehicle Details
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleDetails = action.payload;
      })
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch vehicle details';
      })
      // Fetch Coupons
      .addCase(fetchCoupons.pending, (state)=> {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch coupons';
      });
  },
});

export const {
  setCouponCode,
  setCouponMessage,
  applyCoupon,
  removeCoupon,
  toggleShowAllCoupons,
  setInitialPrice,
} = priceSummarySlice.actions;

export default priceSummarySlice.reducer; 