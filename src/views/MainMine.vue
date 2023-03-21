<script setup>
import { reactive, ref, onBeforeMount, watch, computed } from "vue";

import AlertMessage from "@/components/AlertMessage.vue";
import ActivityCard from "@/components/main/ActivityCard.vue";
import DetailDialog from "@/components/main/DetailDialog.vue";
import EditDialog from "@/components/main/EditDialog.vue";
import MainSortBar from "@/components/main/MainSortBar.vue";
import MainOrientationSwitch from "@/components/main/MainOrientationSwitch.vue";
import MainFilterBar from "@/components/main/MainFilterBar.vue";
import {
  sortStatusTemplete,
  sortOptionTemplete,
  messageDataTemplete,
  userSettingTemplete,
  sorting,
  liking,
  detailing,
  enrolling,
  canceling,
  fillEditData,
  showMessageData,
} from "@/utils/common.js";

/* props */
const props = defineProps({
  activityData: {
    type: Array,
    required: true,
  },
  groupData: {
    type: Array,
    required: true,
  },
});

/* data */
let filterMap = {
  已報名: "enrolled",
  已結束: "finished",
  已收藏: "liked",
  已建立: "created",
  全部: "all",
};
let filterOptions = ref([
  { name: "已報名", attribute: "enrolled" },
  { name: "已結束", attribute: "finished" },
  { name: "已收藏", attribute: "liked" },
  { name: "已建立", attribute: "created" },
  { name: "全部", attribute: "all" },
]);
let editDialogData = ref({});
let detialDialogData = ref({});
let sortOptions = reactive(sortOptionTemplete);
let sortStatus = reactive(sortStatusTemplete);
let messageData = reactive(messageDataTemplete);
let userSetting = reactive(userSettingTemplete);

/* computed, watch */
let activityData_filtered = computed(() => {
  // 過濾條件
  switch (userSetting.selectedTag) {
    case "已報名":
      return props.activityData.filter(
        (activity) => activity.enrolled && activity.ongoing
      );
    case "已結束":
      return props.activityData.filter(
        (activity) => activity.enrolled && activity.finished
      );
    case "已收藏":
      return props.activityData.filter((activity) => activity.liked);
    case "已建立":
      return props.activityData.filter((activity) => activity.created);
    case "全部":
      return props.activityData.filter(
        (activity) => activity.enrolled || activity.liked || activity.created
      );
    default:
      return [];
  }
});

let activityData_display = computed(() => {
  // 排序條件
  let option = userSetting.sortOption;
  return sorting({ activityData_filtered, option });
});

watch(
  () => props.activityData,
  () => {
    emit("stopLoading");
  }
);

/* methods */
function sortClick(option) {
  sortOptions.map((opt) => {
    if (opt.name != option.name) opt.status = sortStatusTemplete.unsorted;
  });
  option.status = option.status + 1;
  if (option.status >= 2) option.status = -1;
  userSetting.sortOption = option;
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
  enrolling({ activity, messageData });
}
function cancelClick(activity) {
  canceling({ activity, activityData_display });
}
function removeActivityDisplay(activity) {
  emit("removeActivity", activity);
}

/* emits */
const emit = defineEmits(["navigate", "stopLoading", "removeActivity"]);

/* hook */
onBeforeMount(() => {
  userSetting.displayMode = "list";
  userSetting.selectedTag = "已報名";
});
</script>

<template>
  <AlertMessage
    :message-data="messageData"
    @close-message="messageData.show = false"
  />
  <DetailDialog
    :detail-data="detialDialogData"
    @like-click="liking"
    @enroll-click="enrollClick"
    @cancel-click="cancelClick"
  />
  <EditDialog
    :edit-data="editDialogData"
    :group-data="groupData"
    @show-alert="showMessageData"
    @remove-activity-display="removeActivityDisplay"
  />
  <div>
    <div class="flex py-2 lg:py-4 lg:pl-[16vw]">
      <!-- 條件排序 -->
      <div class="flex flex-grow flex-wrap text-xl">
        <MainSortBar
          :sort-options="sortOptions"
          :sort-status="sortStatus"
          @sort-click="sortClick"
        />
      </div>
      <!-- 排序模式 -->
      <div class="hidden justify-center gap-4 self-center lg:flex">
        <MainOrientationSwitch
          :user-setting="userSetting"
          @display-click="displayClick"
        />
      </div>
    </div>

    <div class="lg:flex">
      <!-- tag過濾 -->
      <div class="flex flex-wrap font-semibold lg:w-1/5 lg:flex-col">
        <MainFilterBar
          :filter-options="filterOptions"
          :user-setting="userSetting"
          @filter-click="filterClick"
        />
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
  </div>
</template>
