import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    signUpdata : null,
    token : sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null 
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers : {
        setLoading: (state, action) => {
            state.loading = action.payload  
        },
        setSignUpData: (state, action) => {
            state.signUpdata = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload  
        }
    }
})

export const { setLoading, setSignUpData, setToken } = authSlice.actions ;
export default authSlice.reducer ;