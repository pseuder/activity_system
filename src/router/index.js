import { createWebHistory, createRouter } from "vue-router";
import Splash from "@/views/SplashView.vue";
import Trial from "@/Trial.vue";
import ExploreActivity from "@/views/ExploreActivity.vue";
import CreateActivity from "@/views/CreateActivity.vue";
import MyActivity from "@/views/MyActivity.vue";
import Setting from "@/views/setting.vue";
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
    path: "/create",
    component: CreateActivity,
  },
  {
    path: "/myactivity",
    component: MyActivity,
  },
  {
    path: "/setting",
    component: Setting,
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
