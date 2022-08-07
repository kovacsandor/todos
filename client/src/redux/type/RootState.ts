import { store } from 'src/redux';

export type RootState = ReturnType<typeof store.getState>;
