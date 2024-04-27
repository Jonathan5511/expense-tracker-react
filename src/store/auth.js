import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    isAuthenticated:true,
    token:localStorage.getItem('token')
}

const authSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated = !!action.payload
            localStorage.setItem('token',action.payload)
            state.token = action.payload
        },
        logout(state,action){
            state.isAuthenticated = !!action.payload
            localStorage.removeItem('token')
            state.token = action.payload
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer