import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import locationSlice from './slices/locationSlice';
import toggleSlice from './slices/toggleSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        location : locationSlice,
        toggle : toggleSlice
    }
});

export default store;
