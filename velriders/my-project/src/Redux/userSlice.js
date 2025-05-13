// src/Redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userData: null,
  },
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
  // In Redux/userSlice.js
  export const logout = () => ({ type: "user/logout" });
  // Reducer logic to reset isLoggedIn and userData