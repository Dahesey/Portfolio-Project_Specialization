import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventList: [],
    eventID: null,
    loading: false,
    error: null,
  },
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.eventID = action.payload.eventID;
    },
    getSuccessList: (state, action) => {
      state.eventList = action.payload.eventList;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getFailedList: (state, action) => {
      state.eventList = [];
      state.response = action.payload;
      state.loading = false;
      state.error = null;
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

export const { getRequest, getSuccess, getSuccessList, getFailedList, getFailed, getError } = eventSlice.actions;
 
export const eventReducer = eventSlice.reducer;



