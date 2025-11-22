import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to WAJ",
      next: "Next",
      select_role: "To personalize your experience, may I know who you are?",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبًا بك في WAJ",
      next: "التالي",
      select_role: "لتخصيص تجربتك ، هل يمكنني معرفة من أنت؟",
      explore: "التالي",
    },
  },
};

// ✅ Fix for EXPO 2025 (Localization doesn't have .locale — use getLocales())
const getDeviceLang = () => {
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageCode ?? "en";
  }
  return "en";
};

export const initLanguage = async () => {
  const savedLang = await AsyncStorage.getItem("appLanguage");
  const lng = savedLang || getDeviceLang();

  i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    resources,
    interpolation: { escapeValue: false },
  });
};

export default i18n;
