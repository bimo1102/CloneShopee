import i18next from 'i18next'
import translationEN from '../locales/en-EN.json'
import translationVI from '../locales/vi-VN.json'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
}

const savedLanguage = localStorage.getItem('language')
const defaultLanguage = savedLanguage || 'vi'

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    debug: true,
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  })
