import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    locationToggle: false,
    loginToggle: false,
  },
  reducers: {
    changeLocationToggle: (state, action) => {
      state.locationToggle = action.payload;
    },
    changeLoginToggle: (state, action) => {
      state.loginToggle = action.payload;
    },

  },
});

export const { changeLocationToggle, changeLoginToggle } = toggleSlice.actions;
export default toggleSlice.reducer;