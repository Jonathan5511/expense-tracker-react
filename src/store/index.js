import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import expenseReducer from './ExpenseData'

const store = configureStore(
    {reducer:{auth: authReducer,expense: expenseReducer}}
)

export default store;