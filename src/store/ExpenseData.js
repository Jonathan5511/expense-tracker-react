import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={
    expense:[],
    showPremium:false
}

const expenseSlice = createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        togglePremium(state){
            state.showPremium= !state.showPremium
        },
        expenseData(state,action){
            state.expense=action.payload
        }
    }
})

export const expenseActions=expenseSlice.actions

export default expenseSlice.reducer