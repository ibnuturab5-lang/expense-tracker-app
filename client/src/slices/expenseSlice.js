import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'
const initialState={
    expenses:[],
    last60DaysExpenses:[],
    expense:{},
    error:null,
    loading:false,
}

export const createExpense =createAsyncThunk('expense/createExpense', async(expenseData, {rejectWithValue})=>{
 try {
    const response =await axiosInstance.post('/api/expenses', expenseData);
    return response.data;
 } catch (error) {
    return rejectWithValue(error.response.data)
 }
});

//get all expenses
export const getAllExpenses =createAsyncThunk("expense/getAllExpenses", async (_, {rejectWithValue}) => {
    try {
        const response =await axiosInstance.get('/api/expenses')
        return response.data
    } catch (error) {
         return rejectWithValue(error.response.data)
    }
});
// Async thunk to get expenses for the last 60 days
export const getLast60DaysExpenses = createAsyncThunk(
  'expense/getLast60DaysExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/expenses/last60DaysExpense');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get a single expense by ID
export const getExpense = createAsyncThunk(
  'expense/getExpense',
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/expenses/${expenseId}`);
      return response.data; // Return the single expense object
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async thunk to update an expense
export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async ({ expenseId, expenseData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/expenses/${expenseId}`, expenseData);
      return response.data; // Return the updated expense
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async thunk to delete an expense
export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (expenseId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/expenses/${expenseId}`);
      return expenseId; // Return the ID of the deleted expense (for removing from state)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Create the expense slice
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    // Reducer to clear the error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createExpense lifecycle
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload); // Add new expense to the list
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getAllExpenses lifecycle
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getLast60DaysExpenses lifecycle
      .addCase(getLast60DaysExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLast60DaysExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.last60DaysExpenses = action.payload;
      })
      .addCase(getLast60DaysExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getExpense lifecycle
      .addCase(getExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateExpense lifecycle
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
        // Update expense in the expenses array (if needed)
        state.expenses = state.expenses.map(exp => exp._id === action.payload._id ? action.payload : exp);

      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteExpense lifecycle
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted expense from the list
        state.expenses = state.expenses.filter(exp => exp._id !== action.payload);
        state.expense = null; // Clear the single expense if it was the one deleted

      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { clearError } = expenseSlice.actions;
export default expenseSlice.reducer;