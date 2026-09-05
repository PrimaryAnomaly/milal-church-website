import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import en from "./messages/en.json";
import ko from "./messages/ko.json";

const dictionaries = { en, ko } as const;

export type Dictionary = typeof en;

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  return isLocale(raw) ? raw : defaultLocale;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const active = locale ?? (await getLocale());
  return dictionaries[active] ?? dictionaries[defaultLocale];
}

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
