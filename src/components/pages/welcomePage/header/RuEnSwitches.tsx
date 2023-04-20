import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Language, useChangeLanguage } from 'components/languageContext/languageContext';

export default function RuEnSwitches() {
  const [currentLanguage, setCurrentLanguage] = useChangeLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('currentLanguage', event.target.checked ? Language.en : Language.ru);
    setCurrentLanguage(event.target.checked ? Language.en : Language.ru);
  };

  return (
    <Switch
      checked={currentLanguage === 'en'}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      color={'default'}
    />
  );
}
