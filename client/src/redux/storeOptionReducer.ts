import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { authorization, loggedInUser } from 'src/redux/reducer';
import { RootState } from 'src/redux/type';

export const storeOptionReducer = (state: RootState | undefined, action: AnyAction) => {
  const reducers = combineReducers({
    authorization,
    loggedInUser,
  });

  if (action.type === 'authorization/setToken' && action.payload === null) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};
