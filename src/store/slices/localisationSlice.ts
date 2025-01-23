import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем типы для языка
export type Language = 'en' | 'ru';

// Тип для состояния языка
interface LanguageState {
  currentLanguage: Language;
}

// Начальное состояние языка
const initialState: LanguageState = {
  currentLanguage: 'en' // Устанавливаем английский язык по умолчанию
};

// Создаем слайс для языка
const localisationSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    }
  }
});

// Экспортируем действия и редуктор
export const { setLanguage } = localisationSlice.actions;
export default localisationSlice.reducer;
