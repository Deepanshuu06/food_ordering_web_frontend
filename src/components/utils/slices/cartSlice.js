import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    resInfo: null,
    totalprice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.items.push(item);
      state.totalprice += item.price || item.defaultPrice;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.itemQuantity += 1;
      }
      state.totalprice += item.price || item.defaultPrice;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.totalprice -= item.price || item.defaultPrice;
        item.itemQuantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const item = state.items.find((item) => item.id === action.payload.id);
      state.totalprice -= item.price || item.defaultPrice;
      state.items.splice(index, 1);
    },
    setResInfo: (state, action) => {
      state.resInfo = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.resInfo = null;
      state.totalprice = 0
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  setResInfo,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
