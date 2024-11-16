import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../config';

export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Retorna los datos del usuario
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
