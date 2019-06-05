import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import en from './languages/en';  
import zh from './languages/zh';

Vue.use(VueI18n);

const messages = { en, zh };

const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: getLanguage(),
  // set locale messages
  messages
});

export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'zh';
}

export function setLocale(language) {
  i18n.locale = language;
}

export default i18n;
