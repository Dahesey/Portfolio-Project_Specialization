import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

const BASE_URL = 'http://localhost:5001';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());
    

    try {
        const result = await axios.post(`${BASE_URL}/${role}login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.churchName) {
            dispatch(authSuccess(result.data));
        }
        else if (result.data.church) {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

// export const registerEvent = (fields, role) => async (dispatch) => {
//     dispatch(authRequest());

//     try {
//         const result = await axios.post(`${BASE_URL}/${role}EventReg`, fields, {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true,  // If the backend allows credentials (cookies, tokens, etc.)
//         });

//         // Check for specific keys in the response to decide the dispatch flow
//         if (result.data.eventName) {
//             dispatch(authSuccess(result.data));
//         } else if (result.data.eventID) {
//             dispatch(stuffAdded());
//         } else {
//             dispatch(authFailed(result.data.message));
//         }
//     } catch (error) {
//         // More detailed error handling
//         console.error('Error during event registration:', error);
//         dispatch(authError(error.response?.data?.message || 'Event registration failed'));
//     }
// };




export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${BASE_URL}/Admin/${address}Create`, fields, { 
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(stuffAdded(result.data));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};





