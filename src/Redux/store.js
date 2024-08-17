import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loaderReducer from './generalSlice'


const store = configureStore({
    reducer: {
      user: userReducer,
      general:loaderReducer
    }
  });
  
  export default store;