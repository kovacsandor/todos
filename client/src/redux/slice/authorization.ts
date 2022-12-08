import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/type';
import { LocalStorageKey } from 'src/type';

type State = RootState['authorization'];

export const {
  actions: { setToken },
  reducer: authorization,
} = createSlice({
  initialState: localStorage.getItem(LocalStorageKey.Token),
  name: 'authorization',
  reducers: {
    setToken: (state: State, action: PayloadAction<State>): State => {
      return action.payload;
    },
  },
});
