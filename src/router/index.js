import { createWebHistory, createRouter } from "vue-router";
import Splash from "@/views/SplashView.vue";
// import Login from "@/views/LoginView.vue";
import Signup from "@/views/SignupView.vue";
import ExploreActivity from "@/views/ExploreActivity.vue";

const routes = [
  {
    path: "/",
    component: Splash,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/explore",
    component: ExploreActivity,
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
