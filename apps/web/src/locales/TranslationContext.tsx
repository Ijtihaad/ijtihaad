'use client';

import { createContext } from 'react';
import getTranslations from './getTranslations';
import en from './translations/en';
import or from './translations/or';
import createTranslations from '@web/libs/locale';

type TType = Awaited<ReturnType<typeof getTranslations>>;

export const TranslationContext = createContext<{ t: TType; local: string }>({
  t: (p: any) => p,
  local: 'en',
});

export default function TranslationProvider({
  children,
  local,
}: Readonly<{
  children: React.ReactNode;
  local: string;
}>) {
  const t = createTranslations({ en: en, or: or }, local);
  return (
    <TranslationContext.Provider value={{ t, local }}>
      {children}
    </TranslationContext.Provider>
  );
}
