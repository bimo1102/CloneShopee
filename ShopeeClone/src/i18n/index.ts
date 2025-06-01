import i18next from 'i18next'
import translationEN from '../locales/en-EN.json'
import translationVI from '../locales/vi-VN.json'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    },
    detection: {
      // Ưu tiên đọc từ localStorage
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // sẽ tự lưu vào localStorage key 'i18next'
      lookupLocalStorage: 'language' // key này phải khớp với key bạn dùng
    }
  })
