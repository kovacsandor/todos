import { configureStore } from '@reduxjs/toolkit';
import { storeOptionReducer } from 'src/redux/storeOptionReducer';

export const store = configureStore({
  reducer: storeOptionReducer,
});
