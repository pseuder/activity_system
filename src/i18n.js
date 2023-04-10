import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const i18n = createI18n({
  legacy: false,
  locale: "zh", // 默认语言
  fallbackLocale: "en", // 如果当前语言无法翻译，将回退到这个语言
  messages: {
    en,
    zh,
  },
});

if (localStorage.getItem("language"))
  i18n.global.locale.value = localStorage.getItem("language");
else i18n.global.locale.value = navigator.language.split("-")[0];

export default i18n;
