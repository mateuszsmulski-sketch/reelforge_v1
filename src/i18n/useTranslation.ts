import { useLanguage } from "./LanguageContext";
import { translations, type Translations } from "./translations";

export function useTranslation() {
  const { lang } = useLanguage();
  const t = translations[lang] as Translations;

  // Helper for interpolation like t('player_delete_desc', { title: 'My Video' })
  function tInterp(key: keyof Translations, vars?: Record<string, string>) {
    let text = t[key] as string;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }

  return { t, tInterp, lang };
}
