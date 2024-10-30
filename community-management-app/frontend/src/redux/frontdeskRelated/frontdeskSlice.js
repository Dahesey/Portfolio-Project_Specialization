// frontdeskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    frontdesksList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const frontdeskSlice = createSlice({
    name: "frontdesk",
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.frontdesksList = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addFrontdeskSuccess: (state, action) => {
            state.frontdesksList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.statestatus = "added";
        },
        updateFrontdeskSuccess: (state, action) => {
            const index = state.frontdesksList.findIndex(
                (fd) => fd.id === action.payload.id
            );
            if (index !== -1) {
                state.frontdesksList[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        resetStatus: (state) => {
            state.statestatus = "idle";
            state.error = null;
            state.response = null;
        },
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    addFrontdeskSuccess,
    updateFrontdeskSuccess,
    resetStatus,
} = frontdeskSlice.actions;

export const frontdeskReducer = frontdeskSlice.reducer;
