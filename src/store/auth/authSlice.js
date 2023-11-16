import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuthState: (state) => {
      state = initialState;
    },
    resetAuthErrors: (state, action) => {
      state.error = "";
    },
  },
});

export const {
  setLoading,
  setError,
  setUser,
  resetAuthState,
  resetAuthErrors,
} = authSlice.actions;
export default authSlice.reducer;
