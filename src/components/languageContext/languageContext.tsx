import React, { useContext, useMemo, useState } from 'react';
import { FieldPathByValue } from 'react-hook-form';
import { text, Text } from './text';

type LanguageContextValue = {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  text: Text;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export enum Language {
  ru = 'ru',
  en = 'en',
}
type LanguageContextProviderProps = {
  children: React.ReactNode;
};

export const LanguageContextProvider = ({ children }: LanguageContextProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (localStorage.getItem('currentLanguage') || Language.en) as Language
  );
  const value = useMemo(
    () => ({
      currentLanguage,
      setCurrentLanguage,
      text,
    }),
    [currentLanguage, setCurrentLanguage]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslate = (path: FieldPathByValue<typeof text, { en: string; ru: string }>) => {
  const { text, currentLanguage } = useContext(LanguageContext) as LanguageContextValue;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return path.split('.').reduce((acc, i) => acc[i], text)[currentLanguage];
};

export const useChangeLanguage = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(
    LanguageContext
  ) as LanguageContextValue;
  const result = useMemo(() => [currentLanguage, setCurrentLanguage], [currentLanguage]) as [
    Language,
    React.Dispatch<React.SetStateAction<Language>>
  ];
  return result;
};
