import { createApp } from "vue";

import "ant-design-vue/dist/antd.css";
import vue3GoogleLogin from "vue3-google-login";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
import Antd from "ant-design-vue";
import axios from "axios";
import Store from "./store";
import i18n from "./i18n";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
configure({
  // Generates an English message locale generator
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

const app = createApp(App);

// 待完成: 提供axios baseURL
const axiosInstance = axios.create({
  baseURL: Store.state.domainAddress,
});

app.use(router).use(store).use(Antd).use(i18n);

app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("ErrorMessage", ErrorMessage);

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.config.warnHandler = () => null;
app.mount("#app");
