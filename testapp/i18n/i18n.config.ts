import en from "./locales/en-US.json";
import de from "./locales/de-DE.json";

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: "en",
  locale: "de",
  messages: {
    en,
    de,
  },
}));
