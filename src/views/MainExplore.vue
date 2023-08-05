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
let editDialogData = ref({});
let detialDialogData = ref({});
let sortOptions = reactive(sortOptionTemplete);
let sortStatus = reactive(sortStatusTemplete);
let messageData = reactive(messageDataTemplete);
let userSetting = reactive(userSettingTemplete);

/* computed, watch */
let activityData_filtered = computed(() => {
  // 過濾條件
  return props.activityData.filter((activity) =>
    activity.object.includes(userSetting.selectedTag)
  );
});

let activityData_display = computed(() => {
  // 排序條件
  let option = userSetting.sortOption;
  return sorting({ activityData_filtered, option });
});

let filterOptions = computed(() => {
  let temp = JSON.parse(JSON.stringify(props.groupData));
  temp.unshift({
    _id: "0",
    authority: [],
    createTime: "",
    member: [],
    name: "所有人",
    updateTime: "",
  });
  return temp;
});

watch(
  () => props.activityData,
  () => {
    emit("stopLoading");
  }
);

/* methods */
function sortClick(option) {
  // 將其他排序選項重置
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
function orientationClick(type) {
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
  canceling({ activity, messageData });
}
function removeActivityDisplay(activity) {
  emit("removeActivity", activity);
}
function showAlert(data) {
  console.log(data);
  showMessageData(data, messageData);
}
/* emit */
const emit = defineEmits(["navigate", "stopLoading", "removeActivity"]);

/* hook */
onBeforeMount(() => {
  userSetting.displayMode = "list";
  userSetting.selectedTag = "所有人";
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
    @edit-click="editClick"
  />
  <EditDialog
    :edit-data="editDialogData"
    :group-data="groupData"
    @show-alert="showAlert"
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
          @orientation-click="orientationClick"
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
        class="flex h-fit w-full flex-wrap gap-4 font-medium"
        :class="{
          'lg:flex-row': userSetting.displayMode == 'block',
          'lg:flex-col': userSetting.displayMode == 'list',
        }"
      >
        <template v-for="item in activityData_display" :key="item._id">
          <!-- 每個活動 -->
          <ActivityCard
            v-if="!item.finished"
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
