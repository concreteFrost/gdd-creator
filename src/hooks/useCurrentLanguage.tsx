import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "@store/slices/localisationSlice";
import { RootState } from "@store/store";
import { useEffect } from "react";

// Хук для получения текущего языка
export const useCurrentLanguage = () => {
  const lng = useSelector(
    (state: RootState) => state.localisationSlice.currentLanguage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (lng === undefined) {
      dispatch(setLanguage("en"));
    }
  }, [lng, dispatch]);

  return lng;
};
