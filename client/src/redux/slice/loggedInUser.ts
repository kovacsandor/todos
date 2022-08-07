import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { User } from 'todos-shared';
type State = Pick<User, 'name'> | null;

export const {
  actions: { setLoggedInUser },
  reducer: loggedInUser,
} = createSlice<State, SliceCaseReducers<State>>({
  initialState: null,
  name: 'loggedInUser',
  reducers: {
    setLoggedInUser: (state: State, action: PayloadAction<State>): State => {
      return action.payload;
    },
  },
});
