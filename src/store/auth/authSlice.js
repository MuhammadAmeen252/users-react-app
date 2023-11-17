import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  loading: false,
  error: "",
  user: storedUser ? JSON.parse(storedUser) : {},
  isLoggedIn: Boolean(storedToken),
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
      state.isLoggedIn = action.payload ? true : false;
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
