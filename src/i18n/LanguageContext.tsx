import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language } from "./translations";

const STORAGE_KEY = "reelforge-lang";

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["en", "pl", "id"].includes(stored)) return stored;
  } catch {
    // ignore
  }
  const browser = navigator.language.toLowerCase().slice(0, 2);
  if (browser === "pl") return "pl";
  if (browser === "id") return "id";
  return "en";
}

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = (l: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
