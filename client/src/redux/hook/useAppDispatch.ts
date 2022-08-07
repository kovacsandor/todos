import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/type';

export const useAppDispatch = () => useDispatch<AppDispatch>();
