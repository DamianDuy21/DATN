import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enLoginPage from "./locales/en/loginPage.json";
import enSignUpPage from "./locales/en/signUpPage.json";

import viLoginPage from "./locales/vi/loginPage.json";
import viSignUpPage from "./locales/vi/signUpPage.json";

import enForgotPasswordPage from "./locales/en/forgotPasswordPage.json";
import viForgotPasswordPage from "./locales/vi/forgotPasswordPage.json";

import enOnboardingPage from "./locales/en/onboardingPage.json";
import viOnboardingPage from "./locales/vi/onboardingPage.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        loginPage: enLoginPage,
        signUpPage: enSignUpPage,
        forgotPasswordPage: enForgotPasswordPage,
        onboardingPage: enOnboardingPage,
      },
      vi: {
        loginPage: viLoginPage,
        signUpPage: viSignUpPage,
        forgotPasswordPage: viForgotPasswordPage,
        onboardingPage: viOnboardingPage,
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    ns: ["loginPage", "signUpPage", "forgotPasswordPage", "onboardingPage"],
    defaultNS: "loginPage", // Default namespace
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
