// frontdeskActions.js
import axios from "axios";
import {
    getRequest,
    getSuccess,
    getFailed,
    addFrontdeskSuccess,
    updateFrontdeskSuccess,
} from "./frontdeskSlice";

const BASE_URL = 'http://localhost:5000';

// Fetch all front desk records
export const fetchFrontdesks = () => async (dispatch) => {
    dispatch(getRequest());
    try {
        const response = await axios.get(`${BASE_URL}/frontdesk`);
        dispatch(getSuccess(response.data));
    } catch (error) {
        dispatch(getFailed(error.message));
    }
};

// Add a new front desk personnel
export const addFrontdesk = (frontdeskData) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const response = await axios.post(`${BASE_URL}/frontdesk`, frontdeskData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(addFrontdeskSuccess(response.data));
    } catch (error) {
        dispatch(getFailed(error.message));
    }
};

// Update front desk personnel details
export const updateFrontdesk = (id, updatedData) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const response = await axios.put(`${BASE_URL}/frontdesk/${id}`, updatedData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(updateFrontdeskSuccess(response.data));
    } catch (error) {
        dispatch(getFailed(error.message));
    }
};
