
import { createSlice } from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name : "cart",
    initialState : {
        item:[],
        totalQuantity:0,
        totalprice:0
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            state.item.push(item)
            state.totalQuantity += item.totalQuantity
            state.totalprice += item.price * item.quantity
        }
    }
})

export const{addToCart} = cartSlice.actions
export default cartSlice.reducer;