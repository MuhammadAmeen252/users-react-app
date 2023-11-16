import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  data: [],
  page:0,
  limit:20
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
    resetErrors: (state, action) => {
      state.error = "";
    },
  },
});

export const {
  setLoading,
  setError,
  setData,
  resetState,
  resetErrors,
  setPage,
  setLimit
} = usersSlice.actions;
export default usersSlice.reducer;
