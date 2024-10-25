import axios from 'axios';
import {
  getRequest, getSuccess, getFailed, getError
} from './memberSlice';

const BASE_URL = 'http://localhost:5000';

// Fetch the list of members
export const fetchMembersList = () => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/members`);
    console.log("RESULT >>>>>>", result)
    const members = result.data || [];  // Assuming members are at result.data

    if (Array.isArray(members)) {
      dispatch(getSuccess(members));  // Dispatch success action with the member list
      return { payload: { members } };
    } else {
      const message = result.data?.message || "No members found or invalid format";
      dispatch(getFailed(message));  // Dispatch failure action
      return { payload: { error: message } };
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};

// Update an existing member
export const updateMember = (memberId, updatedData) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${BASE_URL}/members/${memberId}`, updatedData);
    dispatch(getSuccess(result.data));  // Dispatch success with the updated member data
    return { payload: result.data };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};

// Add a new member
export const addMember = (newMemberData) => async (dispatch) => {
  dispatch(getRequest());

  // Ensure the newMemberData contains the correct fields based on member type
  try {
    const result = await axios.post(`${BASE_URL}/MemberReg`, newMemberData);
    dispatch(getSuccess(result.data));  // Dispatch success with the new member data
    return { payload: result.data };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};


// Record attendance for a member
export const recordAttendance = (memberId, eventDate) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Make a POST request to record attendance
    const result = await axios.post(`${BASE_URL}/attendance`, {
      memberId,
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