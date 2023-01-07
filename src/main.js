import { createApp } from "vue";
import Antd from "ant-design-vue";
import vue3GoogleLogin from "vue3-google-login";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";

const app = createApp(App).use(router).use(store).use(Antd);

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.mount("#app");
