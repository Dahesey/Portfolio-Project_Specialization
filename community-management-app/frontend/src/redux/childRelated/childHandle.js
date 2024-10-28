import axios from 'axios';
import {
  getRequest, getSuccess, getFailed, getError
} from './childSlice'; // Assume you have a slice named childSlice.js that defines these actions.

const BASE_URL = 'http://localhost:5000';

// Fetch the list of children
export const fetchChildrenList = () => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/children`);
    console.log("RESULT >>>>>>", result);
    const children = result.data || [];  // Assuming children data is at result.data

    if (Array.isArray(children)) {
      dispatch(getSuccess(children));  // Dispatch success action with the child list
      return { payload: { children } };
    } else {
      const message = result.data?.message || "No children found or invalid format";
      dispatch(getFailed(message));  // Dispatch failure action
      return { payload: { error: message } };
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};

// Update an existing child
export const updateChild = (childId, updatedData) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${BASE_URL}/children/${childId}`, updatedData);
    dispatch(getSuccess(result.data));  // Dispatch success with the updated child data
    return { payload: result.data };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};

// Add a new child
export const addChild = (newChildData) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.post(`${BASE_URL}/childrenReg`, newChildData);
    dispatch(getSuccess(result.data));  // Dispatch success with the new child data
    return { payload: result.data };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};

// Record attendance for a child
export const recordAttendance = (childId, eventDate) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.post(`${BASE_URL}/attendance`, {
      childId,
      eventDate,
    });

    // Dispatch success with the updated attendance information
    dispatch(getSuccess(result.data));
    return { payload: result.data };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};
