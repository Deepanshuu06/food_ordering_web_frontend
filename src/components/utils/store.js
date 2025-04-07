import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import locationSlice from './slices/locationSlice';
import toggleSlice from './slices/toggleSlice';
import filterSlice from './slices/filterSlice';
import authSlice from './slices/authSlice';
import searchTextSlice from './slices/searchTextSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice,
        location : locationSlice,
        toggle : toggleSlice,
        filter : filterSlice,
        auth: authSlice,
        searchText:searchTextSlice
    }
});

export default store;
