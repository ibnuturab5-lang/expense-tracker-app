import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/register",
        userData
      );
      return response.data; // The payload will be the registered user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return error data
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/login",
        credentials
      );
      return response.data; // The payload will be the logged-in user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return error data
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/api/users/logout");
      return null; // No payload on successful logout (return null so the state is cleared)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return error data
    }
  }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/users/me");
      return response.data; // The payload will be the user profile data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return error data
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/users/me", userData);
      return response.data; // The payload will be the updated user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors and return error data
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to clear the error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser lifecycle
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; // Clear user data on error
      })
      // Handle loginUser lifecycle
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; // Clear user data on error
      })
      // Handle logoutUser lifecycle
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear user data on successful logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUserProfile lifecycle
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateUserProfile lifecycle
       .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// Export the actions and reducer
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
