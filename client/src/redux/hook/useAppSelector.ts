import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'src/redux/type';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
