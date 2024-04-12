import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'or'];
export default getRequestConfig(async ({ locale }) => {
  const loc = locales.includes(locale as any) ? locale : 'en';
  return {
    messages: (await import(`../translations/${loc}.json`)).default,
  };
});
