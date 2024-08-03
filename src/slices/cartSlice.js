import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   totalItem : sessionStorage.getItem("totalItems") ? JSON.parse(sessionStorage.getItem("totalItems")) : null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers : {
        setCart: (state, action) => {
            state.token = action.payload  
        }
    }
})

export const { setToken } = cartSlice.actions ;
export default cartSlice.reducer ;