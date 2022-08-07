import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKey } from 'src/type';

export const {
  actions: { setToken },
  reducer: authorization,
} = createSlice({
  initialState: localStorage.getItem(LocalStorageKey.Token),
  name: 'authorization',
  reducers: {
    setToken: (state: string | null, action: PayloadAction<string | null>): string | null => {
      return action.payload;
    },
  },
});
