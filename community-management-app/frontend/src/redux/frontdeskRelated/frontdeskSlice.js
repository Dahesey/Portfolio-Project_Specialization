import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    frontdesksList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const frontdeskSlice = createSlice({
    name: 'frontdesk',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.frontdesksList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underFrontdeskControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underFrontdeskControl,
    stuffDone,
} = frontdeskSlice.actions;

export const frontdeskReducer = frontdeskSlice.reducer;