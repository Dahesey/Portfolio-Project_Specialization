
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [],
    loading: false,
    error: null,
  };
  
  const memberSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
      getRequest: (state) => {
        state.loading = true;
      },
      getSuccess: (state, action) => {
        state.loading = false;
        state.members = action.payload; 
  
         // Ensure the payload here matches the data format
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
  
  export const { getRequest, getSuccess, getFailed, getError } = memberSlice.actions;
  
  export const memberReducer = memberSlice.reducer;
  






