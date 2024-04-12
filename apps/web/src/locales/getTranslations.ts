'use server';

import createTranslations from '@web/libs/locale';
import { getLocale } from './locale';
import en from './translations/en';
import or from './translations/or';

export default async function getTranslations() {
  const local = await getLocale();
  const t = createTranslations({ en: en, or: or }, local);
  return t;
}
