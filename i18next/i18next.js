
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json'; 
import ar from '../locales/ar.json'; 

 export const languageResourses = {
        en: { translation: en },
        ar: { translation: ar }
 }

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: languageResourses,
        lng: 'en', 
        fallbackLng: 'en', 
    });

export default i18next;
