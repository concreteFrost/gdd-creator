import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '@store/slices/localisationSlice';
import { RootState } from '@store/store';

// Хук для получения текущего языка
export const useCurrentLanguage = () => {
  const lng = useSelector((state: RootState) => state.localisationSlice.currentLanguage);
  const dispatch = useDispatch();

  if (lng === undefined) {
    dispatch(setLanguage("en"));
  }
  return useSelector((state: RootState) => state.localisationSlice.currentLanguage);
};
