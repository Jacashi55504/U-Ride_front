import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Importa tu reducer

// Configura el store con Redux Toolkit
export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});
