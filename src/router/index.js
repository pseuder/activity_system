import { createWebHistory, createRouter } from "vue-router";
import Splash from "@/views/SplashView.vue";
import Trial from "@/Trial.vue";
import ExploreActivity from "@/views/ExploreActivity.vue";

const routes = [
  {
    path: "/",
    component: Splash,
  },
  {
    path: "/explore",
    component: ExploreActivity,
  },
  {
    path: "/trial",
    component: Trial,
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
