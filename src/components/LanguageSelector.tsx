import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const flags: Record<string, string> = {
  en: "🇺🇸",
  pl: "🇵🇱",
  id: "🇮🇩",
};

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const options = [
    { value: "en" as const, label: t.lang_en },
    { value: "pl" as const, label: t.lang_pl },
    { value: "id" as const, label: t.lang_id },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-zinc-300 hover:bg-white/10 transition-colors"
        aria-label="Select language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{flags[lang]}</span>
        <span className="hidden sm:inline">{options.find((o) => o.value === lang)?.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-zinc-900 shadow-xl overflow-hidden z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setLang(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                lang === opt.value
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base">{flags[opt.value]}</span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
