import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  children: [],
  loading: false,
  error: null,
};

const childSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.children = action.payload;  // Ensure the payload contains the list of children
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError } = childSlice.actions;

export const childReducer = childSlice.reducer;
