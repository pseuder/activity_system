<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import "tw-elements";

import Store from "@/store";
import ActivityService from "@/services/activity.service.js";
import UserService from "@/services/user.service.js";
import GroupService from "@/services/group.service.js";
import AlertMessage from "@/components/AlertMessage.vue";
import ActivityCard from "@/components/ActivityCard.vue";
import DetailDialog from "@/components/DetailDialog.vue";
import EditDialog from "@/components/EditDialog.vue";

/* data */
let sortOptions = reactive([
  { name: "活動時間", status: 2, attribute: "activity_time" },
  { name: "報名時間", status: 2, attribute: "enroll_time" },
  { name: "報名價格", status: 2, attribute: "fee" },
  { name: "查看人數", status: 2, attribute: "watch" },
  { name: "參加人數", status: 2, attribute: "enrollment_display" },
]);
let groupData = [];
let activityData = reactive([]);
let activityData_display = reactive([]);
let userData = reactive({});
let detialDialogData = ref({});
let editDialogData = reactive({
  _id: "",
  title: "",
  object: [],
  location: "",
  activity_time: [],
  enroll_time: [],
  fee: 0,
  manager: "",
  manager_contact: "",
  quota: 0,
  activity_imgs: [],
  description: "",
});

let userSetting = reactive({
  displayMode: "list",
  selectedTag: "全部",
});

let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

let loading = ref(true);

/* functions */

function sortClick(option) {
  sortOptions.map((opt) => {
    if (opt.name != option.name) opt.status = 2;
  });

  if (option.name === "活動時間" || option.name === "報名時間") {
    activityData_display.sort(function (pre, next) {
      return pre[option.attribute][0] > next[option.attribute][0]
        ? (option.status - 1) * 1
        : (option.status - 1) * -1;
    });
    option.status = (option.status + 1) % 3;
  } else {
    activityData_display.sort(function (pre, next) {
      return pre[option.attribute] > next[option.attribute]
        ? (option.status - 1) * 1
        : (option.status - 1) * -1;
    });
    option.status = (option.status + 1) % 3;
  }
}
function displayClick() {
  userSetting.displayMode =
    userSetting.displayMode === "list" ? "block" : "list";
}
function tagClick(item) {
  userSetting.selectedTag = item.name;

  if (item.name === "全部") {
    activityData_display = JSON.parse(JSON.stringify(activityData));
  } else {
    activityData_display = JSON.parse(
      JSON.stringify(
        activityData.filter((activity) => activity.object.includes(item.name))
      )
    );
  }
}
function likeClick(activity) {
  UserService.likeActivity(activity._id);
  activity.like = !activity.like;
}
function detailClick(activity) {
  // 未完成: 愛心連動
  // 未完成: 事件 提示訊息
  ActivityService.watch(activity._id);
  activity.watch += 1;
  detialDialogData.value = activity;
}
function enrollClick(activity) {
  return ActivityService.enroll(activity._id)
    .then((res) => {
      messageData.message = res.data;
      messageData.state = "success";
      messageData.show = true;
      activity.enrollment_display += 1;
    })
    .catch((err) => {
      if (err.name === "AxiosError")
        Store.commit("handleHTTPResponse", { err, messageData });
      else console.error(err);
    });
}

function editClick(activity) {
  for (let key in editDialogData) {
    editDialogData[key] = activity[key];
  }
}

function fetchData() {
  // Get Group data
  return GroupService.getAllGroups()
    .then((res) => {
      groupData = res.data;
      groupData.unshift({
        _id: "0",
        authority: [],
        createTime: "",
        member: [],
        name: "全部",
        updateTime: "",
      });
      // Get User data
      return UserService.getUserInfo().then((res) => {
        userData = res.data;
        let user_enrolledActivity = [],
          user_likedActivity = [];
        userData.enrolledActivity.forEach((user_enrolled) => {
          user_enrolledActivity.push(user_enrolled._id);
        });

        userData.likedActivity.forEach((user_liked) => {
          user_likedActivity.push(user_liked._id);
        });

        // Get Activity data
        return ActivityService.explore().then((res) => {
          res.data.map((activity) => {
            let registered = false,
              expired = false,
              liked = false,
              created = false;

            registered = user_enrolledActivity.includes(activity._id);
            expired = new Date(activity.activity_time[1]) < new Date();
            liked = user_likedActivity.includes(activity._id);
            created = activity.creator._id === userData._id;

            // 除了過期的都保留
            if (!expired) {
              activity.object_display = activity.object.join(" ");

              //utc時間轉換
              activity.activity_time[0] = new Date(activity.activity_time[0]);
              activity.activity_time[1] = new Date(activity.activity_time[1]);

              activity.activity_time_display = [
                activity.activity_time[0].toLocaleDateString(),
                activity.activity_time[1].toLocaleDateString(),
              ].join("~");

              activity.enroll_time[0] = new Date(activity.enroll_time[0]);
              activity.enroll_time[1] = new Date(activity.enroll_time[1]);

              activity.enroll_time_display = [
                activity.enroll_time[0].toLocaleDateString(),
                activity.enroll_time[1].toLocaleDateString(),
              ].join("~");

              activity.enrollment_display = activity.enrollment.length;

              activity["registered"] = registered;
              activity["expired"] = expired;
              activity["liked"] = liked;
              activity["created"] = created;

              activityData.push(JSON.parse(JSON.stringify(activity)));
              activityData_display.push(JSON.parse(JSON.stringify(activity)));
            }
          });
        });
      });
    })
    .catch((error) => {
      throw error;
    });
}

function showAlert(data) {
  if (data.state === "success") {
    messageData.message = data.message;
    messageData.state = "success";
    messageData.show = true;
  } else {
    let err = data.err;
    if (err.name === "AxiosError")
      Store.commit("handleHTTPResponse", { err, messageData });
    else console.error(err);
  }
}

// hook
onBeforeMount(() => {
  fetchData()
    .then(() => {
      loading.value = false;
    })
    .catch((err) => {
      if (err.name === "AxiosError")
        Store.commit("handleHTTPResponse", { err, messageData });
      else console.error(err);
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

    <DetailDialog :detail-data="detialDialogData" @like-click="likeClick" />
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
                    '  text-blue-500': item.status != 2,
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
                      ' fill-blue-500': item.status === 0,
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
                      ' fill-blue-500': item.status === 1,
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
              @click="displayClick"
            />
            <img
              src="@/assets/image/exploreBlock.svg"
              alt="block"
              class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
              :class="{
                'border-2 ': userSetting.displayMode == 'block',
              }"
              @click="displayClick"
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
                @click="tagClick(item)"
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
                @like-click="likeClick"
                @detail-click="detailClick"
                @enroll-click="enrollClick"
                @edit-click="editClick"
              />
            </template>
          </div>
        </div>
      </main>
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
