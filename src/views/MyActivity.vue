<script setup>
import { reactive, ref, onBeforeMount, watch } from "vue";
import "tw-elements";

import AlertMessage from "@/components/AlertMessage.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import DetailDialog from "@/components/DetailDialog.vue";
import EditDialog from "@/components/EditDialog.vue";

import {
  sortStatusTemplete,
  sortOptionTemplete,
  messageDataTemplete,
  activityDataTemplete as editDialogData,
  userSettingTemplete,
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

let tagData = [
  { name: "已報名", attribute: "registered" },
  { name: "已截止", attribute: "expired" },
  { name: "已收藏", attribute: "liked" },
  { name: "已建立", attribute: "created" },
  { name: "全部", attribute: "all" },
];

let groupData = [];
let activityData = [];
let activityData_display = ref([]);
let detialDialogData = ref({});
let sortOptions = reactive(sortOptionTemplete);
let sortStatus = reactive(sortStatusTemplete);
let messageData = reactive(messageDataTemplete);
let userSetting = reactive(userSettingTemplete);

userSetting.displayMode = "list";

/* watch */
watch(
  () => userSetting.selectedTag,
  () => {
    if (userSetting.selectedTag == "all")
      activityData_display.value = activityData;
    else
      activityData_display.value = activityData.filter(
        (activity) => activity[userSetting.selectedTag]
      );
  }
);

/* functions */
function sortClick(option) {
  sorting({
    option,
    activityData,
    activityData_display,
  });
}
function filterClick(option) {
  userSetting.selectedTag = option.attribute;
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

async function fetchData() {
  // 獲取全部群組資料
  await fetchGroupData().then((res) => {
    groupData = res;
  });

  // 獲取標記後活動資料
  await fetchAndMarkActivityData().then((res) => {
    activityData = res;
  });
}

const emit = defineEmits(["navigate", "stopLoading"]);

// hook
onBeforeMount(() => {
  fetchData()
    .then(() => {
      // 將原始資料過濾成"已報名"的資料
      userSetting.selectedTag = "registered";
      emit("stopLoading");
    })
    .catch((err) => {
      handleHTTPResponse(err, messageData);
    });
});
</script>

<template>
  <AlertMessage
    :message-data="messageData"
    @close-message="messageData.show = false"
  >
  </AlertMessage>
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
  <div>
    <!-- sort bar -->
    <div class="flex py-2 lg:py-4 lg:pl-[16vw]">
      <!-- 條件排序 -->
      <div class="flex flex-grow flex-wrap text-xl">
        <template v-for="(option, index) in sortOptions" :key="index">
          <div
            class="mx-6 my-2 inline-flex items-center justify-center gap-2"
            @click="sortClick(option)"
          >
            <span
              class="cursor-pointer select-none font-semibold"
              :class="{
                '  text-blue-500': option.status != sortStatus.None,
              }"
              >{{ option.name }}</span
            >
            <div class="flex cursor-pointer flex-col gap-1">
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                xmlns="http://www.w3.org/2000/svg"
                :class="{
                  ' fill-blue-500': option.status === sortStatus.UP,
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
                  ' fill-blue-500': option.status === sortStatus.DOWN,
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
        <template v-for="(option, index) in tagData" :key="index">
          <div
            class="tag mx-2 my-2 inline-flex w-20 lg:w-11/12 lg:max-w-[160px]"
            :class="{
              'text-white bg-primary':
                userSetting.selectedTag === option.attribute,
            }"
            @click="filterClick(option)"
          >
            {{ option.name }}
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
        <template v-for="item in activityData_display" :key="item">
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
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
