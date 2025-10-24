import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'
const initialState={
    incomes:[],
    last30DaysIncomes:[],
    income:{},
    error:null,
    loading:false,
}

export const createIncome =createAsyncThunk('income/createIncome', async(incomeData, {rejectWithValue})=>{
 try {
    const response =await axiosInstance.post('/api/incomes', incomeData);
    return response.data;
 } catch (error) {
    return rejectWithValue(error.response.data)
 }
});

//get all Incomes
export const getAllIncomes =createAsyncThunk("income/getAllIncomes", async (_, {rejectWithValue}) => {
    try {
        const response =await axiosInstance.get('/api/incomes')
        return response.data
    } catch (error) {
         return rejectWithValue(error.response.data)
    }
});
// Async thunk to get Incomes for the last 60 days
export const getLast30DaysIncomes = createAsyncThunk(
  'income/getLast30DaysIncomes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/incomes/last30DaysIncome');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get a single Income by ID
export const getIncome = createAsyncThunk(
  'income/getIncome',
  async (incomeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/incomes/${incomeId}`);
      return response.data; // Return the single Income object
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async thunk to update an Income
export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async ({ incomeId, incomeData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/Incomes/${incomeId}`, incomeData);
      return response.data; // Return the updated Income
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async thunk to delete an Income
export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (incomeId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/incomes/${incomeId}`);
      return incomeId; // Return the ID of the deleted Income (for removing from state)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Create the Income slice
const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    // Reducer to clear the error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createIncome lifecycle
      .addCase(createIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes.push(action.payload); // Add new Income to the list
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getAllIncomes lifecycle
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getLast30DaysIncomes lifecycle
      .addCase(getLast30DaysIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLast30DaysIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.last30DaysIncomes = action.payload;
      })
      .addCase(getLast30DaysIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getIncome lifecycle
      .addCase(getIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateIncome lifecycle
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
        // Update Income in the Incomes array (if needed)
        state.incomes = state.incomes.map(exp => exp._id === action.payload._id ? action.payload : exp);

      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteIncome lifecycle
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted Income from the list
        state.incomes = state.incomes.filter(exp => exp._id !== action.payload);
        state.income = null; // Clear the single Income if it was the one deleted

      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { clearError } = incomeSlice.actions;
export default incomeSlice.reducer;