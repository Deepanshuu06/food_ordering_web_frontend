import { createSlice } from "@reduxjs/toolkit";

const searchTextSlice = createSlice({
  name: "searchTextSlice",
  initialState: {
    searchText: null,
  },
  reducers: {
    changeSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {changeSearchText} = searchTextSlice.actions
export default searchTextSlice.reducer

