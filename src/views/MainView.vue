<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

import UserService from "@/services/user.service.js";

import ExploreActivity from "@/views/ExploreActivity.vue";
import CreateActivity from "@/views/CreateActivity.vue";
import MyActivity from "@/views/MyActivity.vue";

import MainNav from "@/components/MainNav.vue";

// data
let userData = ref({});
let loading = ref(true);
let currentPage = ref("explore");
let componentMap = {
  explore: ExploreActivity,
  create: CreateActivity,
  my: MyActivity,
};

// functions
function navigate(path) {
  currentPage.value = path;
}

function stopLoading() {
  loading.value = false;
}

onBeforeMount(async () => {
  if (route.query) {
    currentPage.value = route.query.page;
  }

  await UserService.getUserInfo().then((res) => {
    userData.value = res.data;
  });
});
</script>

<template>
  <div class="main-bg p-8 lg:px-16">
    <a-spin v-show="loading" size="large" class="absolute left-1/2 top-1/2" />
    <header class="flex justify-between text-3xl font-medium lg:pt-6">
      <MainNav
        :user-data="userData"
        :current-page="currentPage"
        @navigate="navigate"
      />
    </header>
    <main class="py-4">
      <component
        :is="componentMap[currentPage]"
        @stop-loading="stopLoading"
      ></component>
    </main>
  </div>
</template>
