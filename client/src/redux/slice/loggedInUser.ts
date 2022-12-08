import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/type';

type State = RootState['loggedInUser'];

export const {
  actions: { setLoggedInUser },
  reducer: loggedInUser,
}: Slice<State> = createSlice<State, SliceCaseReducers<State>>({
  initialState: null,
  name: 'loggedInUser',
  reducers: {
    setLoggedInUser: (state: State, action: PayloadAction<State>): State => {
      return action.payload;
    },
  },
});
