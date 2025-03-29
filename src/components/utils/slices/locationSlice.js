import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "coordinates",
  initialState: {
    lng: "75.8913294",
    lat: "22.7496812",
  },
  reducers: {
    setCoordinates: (state, action) => {
      const { lng, lat } = action.payload;
      state.lat = lat;
      state.lng = lng;
    },
  },
});

export const { setCoordinates } = locationSlice.actions;
export default locationSlice.reducer;
