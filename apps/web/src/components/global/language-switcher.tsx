"use client";

import { locales } from "@web/locales/config/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const lang = useLocale();
  return (
    <div className="flex gap-4">
      <select
        value={lang}
        onChange={(e) => {
          router.push(`/${e.target.value}`);
          router.refresh();
        }}
        className={"border bg-black"}
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
