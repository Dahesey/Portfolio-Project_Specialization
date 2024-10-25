import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { eventReducer } from './eventRelated/eventSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer
    },
});

export default store;
