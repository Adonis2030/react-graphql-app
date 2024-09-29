import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import geTranslation from "./locales/ge/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ge: {
    translation: geTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
