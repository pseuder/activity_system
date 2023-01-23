import { createApp } from "vue";

import "ant-design-vue/dist/antd.css";
import vue3GoogleLogin from "vue3-google-login";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
import Antd from "ant-design-vue";

const app = createApp(App).use(router).use(store).use(Antd);

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.mount("#app");
