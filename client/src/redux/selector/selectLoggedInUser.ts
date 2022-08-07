import { RootState } from 'src/redux/type';

export const selectLoggedInUser = (state: RootState) => state.loggedInUser;
