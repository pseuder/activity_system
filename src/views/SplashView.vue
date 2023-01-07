<script setup>
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import { ref, reactive, onMounted } from "vue";

// data
let currentPage = ref("login");

const pageMap = reactive({
  login: LoginView,
  signup: SignupView,
});

// hooks
onMounted(() => {
  console.log(`the component is now mounted.`);
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
