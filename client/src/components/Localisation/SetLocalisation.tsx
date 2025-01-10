import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@store/slices/localisationSlice';
import { RootState } from '@store/store';
import * as styles from './SetLocalisation.module.scss';

const SetLocalisation: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.localisationSlice.currentLanguage);

  const handleLanguageChange = (language: 'en' | 'ru') => {
    if (language !== currentLanguage) {
      dispatch(setLanguage(language));
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${currentLanguage === 'en' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
      <button
        className={`${styles.button} ${currentLanguage === 'ru' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('ru')}
      >
        Русский
      </button>
    </div>
  );
};

export default SetLocalisation;
