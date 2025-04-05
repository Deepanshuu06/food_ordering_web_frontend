import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    locationToggle: false,
    loginToggle: false,
    differentRestaurantPopUp : false
  },
  reducers: {
    changeLocationToggle: (state, action) => {
      state.locationToggle = action.payload;
    },
    changeLoginToggle: (state, action) => {
      state.loginToggle = action.payload;
    },
    toggleDifferentRestaurantPopUp : (state)=>{
      state.differentRestaurantPopUp = !state.differentRestaurantPopUp
    }


  },
});

export const { changeLocationToggle, changeLoginToggle , toggleDifferentRestaurantPopUp } = toggleSlice.actions;
export default toggleSlice.reducer;