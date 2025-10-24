import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice';
import expenseReducer from '../slices/expenseSlice';
import incomeReducer from '../slices/incomeSlice';
export const store =configureStore({
    reducer:{
        user: userReducer,
        expense:expenseReducer,
        income:incomeReducer,
    }
})