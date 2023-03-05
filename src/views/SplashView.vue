<script setup>
import { ref, reactive, onMounted } from "vue";
import router from "@/router";
import AuthService from "@/services/auth.service.js";
import SplashLogin from "@/views/SplashLogin.vue";
import SplashSignup from "@/views/SplashSignup.vue";

/* data */
let currentPage = ref("login");
const pageMap = reactive({
  login: SplashLogin,
  signup: SplashSignup,
});

/* methods */
function checkAuthorization() {
  AuthService.sessionAuth()
    .then(() => {
      router.push("/main");
    })
    .catch(() => {});
}

function navigate(path) {
  currentPage.value = path;
}

/* hook */
onMounted(() => {
  checkAuthorization();
});
</script>

<template>
  <keep-alive>
    <component :is="pageMap[currentPage]" @navigate="navigate"></component>
  </keep-alive>
</template>
