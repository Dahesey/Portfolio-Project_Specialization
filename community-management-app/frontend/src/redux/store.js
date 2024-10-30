
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { eventReducer } from './eventRelated/eventSlice';
import { frontdeskReducer } from './frontdeskRelated/frontdeskSlice'; // Import the frontdeskReducer

const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
        frontdesk: frontdeskReducer, 
    },
});

export default store;

