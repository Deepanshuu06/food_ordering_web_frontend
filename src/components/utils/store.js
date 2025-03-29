import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import locationSlice from './slices/locationSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        location : locationSlice
    }
});

export default store;
