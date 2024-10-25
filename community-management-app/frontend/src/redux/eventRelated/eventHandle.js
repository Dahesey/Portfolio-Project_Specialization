import axios from "axios";

import { getRequest, getSuccess, getFailed, getError } from "./eventSlice";



const BASE_URL = 'http://localhost:5000';

// Function to fetch the latest event ID
export const fetchLatestEventID = () => async (dispatch) => {
  // Optionally dispatch a request action to indicate loading
  dispatch(getRequest());
  
  try {
    // Make an API request to get the latest event ID
    const result = await axios.get(`${BASE_URL}/latestEventID`);

    // Check if there's an event ID in the response
    const eventID = result.data?.eventID;

    // Dispatch success action if event ID is found
    if (eventID) {
      dispatch(getSuccess(eventID)); // Dispatch the success action with the event ID
      return { payload: { eventID } }; // Return the event ID for further use in the component
    } else {
      // Dispatch failure action if there's no event ID
      const message = result.data?.message || "Failed to fetch event ID";
      dispatch(getFailed(message));
      return { payload: { error: message } }; // Return an error message for further use
    }
  } catch (error) {
    // Dispatch error action if there's a problem with the request
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));
    return { payload: { error: errorMsg } }; // Return the error for further use
  }
};




export const fetchEventsList = () => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/events`);
    console.log("Raw API response >>>", result.data);  // Log the raw response from the API

    const events = result.data.events;  // Assuming events are at result.data
    if (Array.isArray(events)) {
      dispatch(getSuccess(events));  // Dispatch success action with the event list
      return { payload: { events } };
    } else {
      const message = result.data?.message || "No events found or invalid format";
      dispatch(getFailed(message));  // Dispatch failure action
      return { payload: { error: message } };
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));  // Dispatch error action
    return { payload: { error: errorMsg } };
  }
};






export const fetchEventDetails = () => async (dispatch) => {
  // Dispatch a request action to indicate loading
  dispatch(getRequest());

  try {
    // Make an API request to get all events
    const result = await axios.get(`${BASE_URL}/events`); // Adjust the endpoint according to your API

    // Check if events data is in the response
    const events = result.data; // Assuming events are returned as an array

    // Find the event with countdown of 0
    const eventWithZeroCountdown = events.find(event => event.countdown === 0);

    if (eventWithZeroCountdown) {
      // Dispatch success action if the event with countdown of 0 is found
      dispatch(getSuccess(eventWithZeroCountdown)); // Dispatch the success action with the found event
      return { payload: { eventDetails: eventWithZeroCountdown } }; // Return the event details for further use in the component
    } else {
      // Dispatch failure action if no event with countdown of 0 is found
      const message = "No event with countdown of 0 found";
      dispatch(getFailed(message));
      return { payload: { error: message } }; // Return an error message for further use
    }
  } catch (error) {
    // Dispatch error action if there's a problem with the request
    const errorMsg = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getError(errorMsg));
    return { payload: { error: errorMsg } }; // Return the error for further use
  }
};

















