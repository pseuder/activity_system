<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";

import UserService from "@/services/user.service.js";
import MainExplore from "@/views/MainExplore.vue";
import MainCreate from "@/views/MainCreate.vue";
import MainMine from "@/views/MainMine.vue";
import SettingView from "@/views/SettingView.vue";
import MainNavBar from "@/components/main/MainNavBar.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import {
  fetchGroupData,
  fetchAndMarkActivityData,
  handleAxiosResponse,
  messageDataTemplete,
} from "@/utils/common.js";
/* data */
const route = useRoute();
let userData = ref({});
let groupData = ref([]);
let activityData = ref([]);
let loading = ref(true);
let currentPage = ref("explore");
let messageData = reactive(messageDataTemplete);
let componentMap = {
  explore: MainExplore,
  create: MainCreate,
  mine: MainMine,
  setting: SettingView,
};

/* methods */
// 切換component
function navigate(path) {
  currentPage.value = path;
}

// 停止轉圈圈
function stopLoading() {
  loading.value = false;
}

// 刪除活動後將其移除
function removeActivity(activity) {
  activityData.value.splice(activityData.value.indexOf(activity), 1);
}

async function fetchData() {
  // 獲取當前使用者資料
  await UserService.getUserInfo()
    .then((res) => {
      userData.value = res.data;
    })
    .catch((err) => handleAxiosResponse(err, messageData));

  // 獲取全部群組資料
  await fetchGroupData()
    .then((res) => {
      groupData.value = res;
    })
    .catch((err) => handleAxiosResponse(err, messageData));

  // 獲取標記後活動資料
  await fetchAndMarkActivityData()
    .then((res) => {
      activityData.value = res;
    })
    .catch((err) => handleAxiosResponse(err, messageData));
}

/* hook */
onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <a-spin
    v-show="loading"
    size="large"
    class="main-bg fixed z-[1060] flex h-[100vh] w-[100vw] items-center justify-center"
  />
  <AlertMessage
    :message-data="messageData"
    @close-message="messageData.show = false"
  />
  <div class="main-bg h-[100vh] w-[100vw] p-8 lg:px-16">
    <header class="flex justify-between text-3xl font-medium lg:pt-6">
      <MainNavBar
        :user-data="userData"
        :current-page="currentPage"
        @navigate="navigate"
      />
    </header>
    <main class="py-4">
      <component
        :is="componentMap[currentPage]"
        :group-data="groupData"
        :activity-data="activityData"
        @stop-loading="stopLoading"
        @remove-activity="removeActivity"
      ></component>
    </main>
  </div>
</template>
