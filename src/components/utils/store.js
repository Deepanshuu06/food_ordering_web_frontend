import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import locationSlice from './slices/locationSlice';
import toggleSlice from './slices/toggleSlice';
import filterSlice from './slices/filterSlice';
import authSlice from './slices/authSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        location : locationSlice,
        toggle : toggleSlice,
        filter : filterSlice,
        auth: authSlice
    }
});

export default store;
