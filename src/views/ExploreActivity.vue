<script setup>
import { reactive, ref, onBeforeMount, watch } from "vue";
import "tw-elements";

import AlertMessage from "@/components/AlertMessage.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import DetailDialog from "@/components/DetailDialog.vue";
import EditDialog from "@/components/EditDialog.vue";
import MainNav from "@/components/MainNav.vue";
import MainSort from "@/components/MainSort.vue";
import MainDisplay from "@/components/MainDisplay.vue";
import MainTag from "@/components/MainTag.vue";
import UserService from "@/services/user.service.js";

import {
  sortStatusTemplete,
  sortOptionTemplete,
  messageDataTemplete,
  userSettingTemplete,
  activityDataTemplete,
  sorting,
  liking,
  detailing,
  enrolling,
  canceling,
  fillEditData,
  showAlert,
  handleHTTPResponse,
  fetchGroupData,
  fetchAndMarkActivityData,
} from "@/utils/common.js";

/* data */

let groupData = [];
let activityData = [];
let activityData_display = ref([]);
let editDialogData = ref({});
let detialDialogData = ref({});
let userData = ref({});
let sortOptions = reactive(sortOptionTemplete);
let sortStatus = reactive(sortStatusTemplete);
let messageData = reactive(messageDataTemplete);
let userSetting = reactive(userSettingTemplete);
let loading = ref(true);

userSetting.displayMode = "list";

// 根據標籤過濾
watch(
  () => userSetting.selectedTag,
  () => {
    activityData_display.value = activityData.filter((activity) =>
      activity.object.includes(userSetting.selectedTag)
    );
  }
);

/* functions */
function sortClick(option) {
  sorting({
    sortOptions,
    option,
    activityData,
    activityData_display,
  });
}
function filterClick(option) {
  userSetting.selectedTag = option.name;
}
function displayClick(type) {
  userSetting.displayMode = type;
}
function detailClick(activity) {
  detailing({ activity, detialDialogData });
}
function editClick(activity) {
  fillEditData({ editDialogData, activity });
}
function enrollClick(activity) {
  enrolling({ activity });
}
function cancelClick(activity) {
  canceling({ activity, activityData_display });
}

// 刪除活動後將其移除
function removeActivityDisplay(activity) {
  activityData_display.value.splice(
    activityData_display.value.indexOf(activity),
    1
  );
  activityData.splice(activityData.indexOf(activity), 1);
}
async function fetchData() {
  // 獲取當前使用者資料
  await UserService.getUserInfo().then((res) => {
    userData.value = res.data;
  });

  // 獲取全部群組資料
  await fetchGroupData().then((res) => {
    groupData = res;
  });

  // 獲取標記後活動資料
  await fetchAndMarkActivityData().then((res) => {
    activityData = res;
  });
}

// hook
onBeforeMount(() => {
  fetchData()
    .then(() => {
      userSetting.selectedTag = "所有人";
      loading.value = false;
    })
    .catch((err) => {
      handleHTTPResponse(err, messageData);
    });
});
</script>

<template>
  <div class="main-bg p-8 lg:px-16">
    <AlertMessage
      :message-data="messageData"
      @close-message="messageData.show = false"
    />
    <a-spin v-show="loading" size="large" class="absolute left-1/2 top-1/2" />
    <DetailDialog
      :detail-data="detialDialogData"
      @like-click="liking"
      @enroll-click="enrollClick"
      @cancel-click="cancelClick"
    />
    <EditDialog
      :edit-data="editDialogData"
      :group-data="groupData"
      @show-alert="showAlert"
      @remove-activity-display="removeActivityDisplay"
    />

    <div v-show="!loading">
      <header class="flex justify-between text-3xl font-medium lg:pt-6">
        <MainNav :user-data="userData" />
      </header>
      <main class="py-4">
        <!-- sort bar -->
        <div class="flex py-2 lg:py-4 lg:pl-[16vw]">
          <!-- 條件排序 -->
          <div class="flex flex-grow flex-wrap text-xl">
            <template v-for="(item, index) in sortOptions" :key="index">
              <MainSort
                :item="item"
                :sort-status="sortStatus"
                @sort-click="sortClick"
              />
            </template>
          </div>
          <!-- 排序模式 -->
          <div class="hidden justify-center gap-4 self-center lg:flex">
            <MainDisplay
              :user-setting="userSetting"
              @display-click="displayClick"
            />
          </div>
        </div>

        <div class="lg:flex">
          <!-- tag過濾 -->
          <div class="flex flex-wrap font-semibold lg:w-1/5 lg:flex-col">
            <template v-for="item in groupData" :key="item._id">
              <MainTag
                :item="item"
                :user-setting="userSetting"
                @filter-click="filterClick"
              />
            </template>
          </div>
          <!-- 活動顯示 -->
          <div
            class="flex w-full flex-wrap gap-4 font-medium"
            :class="{
              'lg:flex-row': userSetting.displayMode == 'block',
              'lg:flex-col': userSetting.displayMode == 'list',
            }"
          >
            <template v-for="item in activityData_display" :key="item._id">
              <!-- 每個活動 -->
              <ActivityCard
                :form-data="item"
                :group-data="groupData"
                :user-setting="userSetting"
                @like-click="liking"
                @detail-click="detailClick"
                @enroll-click="enrollClick"
                @cancel-click="cancelClick"
                @edit-click="editClick"
              />
            </template>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
