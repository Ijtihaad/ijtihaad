'use client';

import { setLocale } from '@web/locales/locale';
import { useRouter } from 'next/navigation';
const locales = ['en', 'or'];

export default function LanguageSwitcher() {
  const router = useRouter();
  return (
    <div className="flex gap-4">
      <select
        onChange={async (e) => {
          await setLocale(e.target.value);
          // router.refresh();
        }}
        className={'border bg-black'}
      >
        {locales.map((local) => (
          <option key={local} value={local}>
            {local}
          </option>
        ))}
      </select>
    </div>
  );
}
