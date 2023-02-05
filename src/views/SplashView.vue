<script setup>
// import { qq, AuthService } from "@/services/auth.service.js";

import AuthService from "@/services/auth.service.js";
import router from "@/router";

import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import { ref, reactive, onMounted } from "vue";

// data
let currentPage = ref("login");

const pageMap = reactive({
  login: LoginView,
  signup: SignupView,
});

function checkAuthorization() {
  AuthService.sessionAuth()
    .then(() => {
      router.push("/explore");
    })
    .catch(() => {});
}

// hooks
onMounted(() => {
  checkAuthorization();
});

// functions
function navigate(path) {
  currentPage.value = path;
}
</script>

<template>
  <keep-alive>
    <component :is="pageMap[currentPage]" @navigate="navigate"></component>
  </keep-alive>
</template>
