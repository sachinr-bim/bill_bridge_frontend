import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://betser.duckdns.org/billbridge/user';

const storedToken = localStorage.getItem('authToken');

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password_hash }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken || ''}`
        }
      };

      const response = await axios.post(
        `${API_URL}/login`,
        { email, password_hash },
        config
      );

      console.log('Login API Response:', response.data);
      
      // Store the received token in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ firstname, lastname, email, password_hash }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstname,
        lastname,
        email,
        password_hash
      });
      
      console.log('API Response Signup:', response.data);

      // Store token in localStorage for persistent session
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      // Return both user data and token
      return {
        user: response.data.user,
        token: response.data.token,
        message: response.data.message || 'Signup successful'
      };

    } catch (error) {
      console.log('Signup Error Message:', error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const initialState = {
  user: null,
  token: storedToken,
  loading: false,
  error: null,
  isAuthenticated: !!storedToken // Convert to boolean
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
    // Add this new reducer to load user from token
    loadUser(state) {
      const token = localStorage.getItem('authToken');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        // Note: You might want to make an API call here to get full user data
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })  
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout,loadUser } = authSlice.actions;
export default authSlice.reducer;