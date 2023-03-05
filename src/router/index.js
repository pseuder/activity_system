import { createWebHistory, createRouter } from "vue-router";
import SplashView from "@/views/SplashView.vue";
import MainView from "@/views/MainView.vue";
import SettingView from "@/views/SettingView.vue";
import Trial from "@/Trial.vue";
const routes = [
  {
    path: "/",
    component: SplashView,
  },
  {
    path: "/main",
    component: MainView,
    query: true,
  },
  {
    path: "/setting",
    component: SettingView,
  },
  {
    path: "/trial",
    component: Trial,
    query: true,
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
