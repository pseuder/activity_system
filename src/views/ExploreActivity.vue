<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import "tw-elements";

import AlertMessage from "@/components/AlertMessage.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import DetailDialog from "@/components/DetailDialog.vue";
import EditDialog from "@/components/EditDialog.vue";
import {
  sortStatus,
  sortOptions,
  messageData,
  activityData as editDialogData,
  userSetting,
  sorting,
  exploreActivityFiltering,
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
let activityData = reactive([]);
let activityData_display = reactive([]);
let detialDialogData = ref({});
let loading = ref(true);

userSetting.displayMode = "list";
userSetting.selectedTag = "全部";

/* functions */

function sortClick(option) {
  sorting({
    option,
    activityData,
    activityData_display,
  });
}
function filterClick(option) {
  activityData_display = exploreActivityFiltering({
    option,
    activityData,
  });
}
function detailClick(activity) {
  detailing({ activity, detialDialogData });
}
function enrollClick(activity) {
  enrolling({ activity });
}

function cancelClick(activity) {
  canceling({ activity, activityData_display });
}

function editClick(activity) {
  fillEditData({ editDialogData, activity });
}

function fetchData() {
  // 獲取群組資料
  return fetchGroupData().then((res) => {
    groupData = res;
    // 獲取標記後活動資料
    return fetchAndMarkActivityData().then((res) => {
      activityData = res;
      return;
    });
  });
}

// hook
onBeforeMount(() => {
  fetchData()
    .then(() => {
      // 將原始資料過濾成"已報名"的資料
      filterClick({ name: "全部", attribute: "all" });
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
    />

    <div v-show="!loading">
      <header class="flex justify-between text-3xl font-medium lg:pt-6">
        <div class="flex items-center">
          <img src="@/assets/image/vite.svg" alt="vue logo" class="w-10" />
        </div>
        <nav
          class="flex flex-grow items-center justify-center lg:ml-[10vw] lg:justify-start"
        >
          <div class="dropdown relative">
            <button
              id="dropdownMenuButton"
              class="dropdown-toggle flex items-center text-primary lg:hidden"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              探索活動
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="ml-2 w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-primary" href="/explore"
                  >探索活動</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="/create">建立活動</a>
              </li>
              <li>
                <a class="dropdown-item" href="/myactivity">我的活動</a>
              </li>
            </ul>
          </div>

          <div class="hidden lg:flex">
            <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
              <a class="" href="/explore">探索活動</a>
              <a class="text-black" href="/create">建立活動</a>
              <a class="text-black" href="/myactivity">我的活動</a>
            </div>
          </div>
        </nav>
        <div class="flex items-center">
          <img src="@/assets/image/vue.svg" alt="vue logo" class="w-10" />
        </div>
      </header>
      <main class="py-4">
        <!-- sort bar -->
        <div class="flex py-2 lg:py-4 lg:pl-[16vw]">
          <!-- 條件排序 -->
          <div class="flex flex-grow flex-wrap text-xl">
            <template v-for="(item, index) in sortOptions" :key="index">
              <div
                class="mx-6 my-2 inline-flex items-center justify-center gap-2"
                @click="sortClick(item)"
              >
                <span
                  class="cursor-pointer select-none font-semibold"
                  :class="{
                    '  text-blue-500': item.status != sortStatus.None,
                  }"
                  >{{ item.name }}</span
                >
                <div class="flex cursor-pointer flex-col gap-1">
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{
                      ' fill-blue-500': item.status === sortStatus.UP,
                    }"
                  >
                    <path
                      d="M5.22149 0.410216L0.258056 7.00414C-0.327704 7.78251 0.148355 9 1.03734 9H10.9642C11.1632 9.0002 11.3579 8.93373 11.5252 8.80855C11.6925 8.68336 11.8252 8.50478 11.9075 8.29418C11.9897 8.08358 12.018 7.84988 11.9889 7.62109C11.9598 7.39229 11.8746 7.17809 11.7435 7.00414L6.78006 0.411419C6.68292 0.2822 6.56313 0.178633 6.42872 0.107673C6.29431 0.0367125 6.14839 0 6.00077 0C5.85315 0 5.70724 0.0367125 5.57283 0.107673C5.43842 0.178633 5.31862 0.2822 5.22149 0.411419V0.410216Z"
                    />
                  </svg>
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{
                      ' fill-blue-500': item.status === sortStatus.DOWN,
                    }"
                  >
                    <path
                      d="M5.22149 8.58978L0.258056 1.99466C-0.327703 1.21869 0.148355 4.42369e-07 1.03734 4.42369e-07H10.9642C11.1632 -0.000197853 11.3579 0.0662735 11.5252 0.191455C11.6925 0.316636 11.8252 0.49522 11.9075 0.705822C11.9897 0.916423 12.018 1.15011 11.9889 1.37891C11.9598 1.60771 11.8746 1.82191 11.7435 1.99586L6.78006 8.58858C6.68292 8.7178 6.56313 8.82137 6.42872 8.89233C6.29431 8.96329 6.14839 9 6.00077 9C5.85315 9 5.70724 8.96329 5.57283 8.89233C5.43842 8.82137 5.31862 8.7178 5.22149 8.58858V8.58978Z"
                    />
                  </svg>
                </div>
              </div>
            </template>
          </div>
          <!-- 排序模式 -->
          <div class="hidden justify-center gap-4 self-center lg:flex">
            <img
              src="@/assets/image/exploreList.svg"
              alt="list"
              class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
              :class="{
                'border-2': userSetting.displayMode == 'list',
              }"
              @click="userSetting.displayMode = 'list'"
            />
            <img
              src="@/assets/image/exploreBlock.svg"
              alt="block"
              class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
              :class="{
                'border-2 ': userSetting.displayMode == 'block',
              }"
              @click="userSetting.displayMode = 'block'"
            />
          </div>
        </div>

        <div class="lg:flex">
          <!-- tag過濾 -->
          <div class="flex flex-wrap font-semibold lg:w-1/5 lg:flex-col">
            <template v-for="(item, index) in groupData" :key="index">
              <div
                class="tag mx-2 my-2 inline-flex w-20 lg:w-11/12 lg:max-w-[160px]"
                :class="{
                  'text-white bg-primary': userSetting.selectedTag == item.name,
                }"
                @click="filterClick(item)"
              >
                {{ item.name }}
              </div>
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
