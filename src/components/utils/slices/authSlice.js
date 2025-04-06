import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        userCredential: JSON.parse(localStorage.getItem("userCredential"))
    },
    reducers:{
        addUserData:(state, action)=>{
            state.userCredential = action.payload
            localStorage.setItem("userCredential", JSON.stringify(action.payload))

        },
        removeUserData:(state)=>{
            state.userCredential = null
            localStorage.removeItem("userCredential")

        }
    }
})

export const {addUserData , removeUserData} = authSlice.actions;
export default authSlice.reducer