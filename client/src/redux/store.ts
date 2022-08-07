import { configureStore } from '@reduxjs/toolkit';
import { authorization, loggedInUser } from 'src/redux/reducer';

export const store = configureStore({
  reducer: {
    authorization,
    loggedInUser,
  },
});
