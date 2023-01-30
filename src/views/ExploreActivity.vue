<script setup>
import { reactive, ref, onBeforeMount } from "vue";
import "tw-elements";
import {
  HeartOutlined,
  HeartFilled,
  EyeFilled,
  UserOutlined,
} from "@ant-design/icons-vue";

import ActivityService from "@/services/activity.service.js";
import UserService from "@/services/user.service.js";
import ModalDialog from "@/components/ModalDialog.vue";
import AlertMessage from "@/components/AlertMessage.vue";

/* data */
let sortOptions = ["活動時間", "報名時間", "報名價格", "查看人數", "參加人數"];
let filterOptions = ["全部", "A Group", "B Group", "C Group", "D Group"];
let activityData = reactive([]);
let userData = reactive(null);

let modalDialogData = ref({});

let userSetting = reactive({
  displayMode: "list",
  selectedTag: "全部",
});

let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

/* functions */

function sortClick(target) {
  console.log(target);
}
function displayClick() {
  userSetting.displayMode =
    userSetting.displayMode === "list" ? "block" : "list";
}
function tagClick(item) {
  userSetting.selectedTag = item;
}
function likeClick(activity) {
  UserService.likeActivity(activity._id);
  activity.like = !activity.like;
}
function detailClick(activity) {
  ActivityService.watch(activity._id);
  activity.watch += 1;
  modalDialogData.value = activity;
}
function enrollClick(activity) {
  ActivityService.enroll(activity._id)
    .then((res) => {
      messageData.message = res.data;
      messageData.state = "success";
      messageData.show = true;
      activity.enrollment_num += 1;
    })
    .catch((err) => {
      if (err.code === "ERR_BAD_REQUEST") {
        // 伺服器回饋的錯誤(預期錯誤)
        messageData.message = err.response.data;
        messageData.state = "warning";
      } else if (err.code === "ERR_NETWORK") {
        // 連不上伺服器(網路錯誤)
        messageData.message = "無法連接至伺服器";
        messageData.state = "error";
      } else {
        // 任何非預期錯誤
        messageData.message = "非預期的錯誤";
        messageData.state = "error";
      }
      messageData.show = true;
    });
}

// hook
onBeforeMount(() => {
  try {
    UserService.getUserInfo()
      .then((res) => {
        userData = res.data[0];

        ActivityService.explore()
          .then((res) => {
            res.data.map((item) => {
              item.object = item.object.join("  ");

              //utc時間轉換
              item.activity_time[0] = new Date(
                item.activity_time[0]
              ).toLocaleDateString();
              item.activity_time[1] = new Date(
                item.activity_time[1]
              ).toLocaleDateString();
              item.activity_time = item.activity_time.join("~");

              item.enroll_time[0] = new Date(
                item.enroll_time[0]
              ).toLocaleDateString();
              item.enroll_time[1] = new Date(
                item.enroll_time[1]
              ).toLocaleDateString();
              item.enroll_time = item.enroll_time.join("~");

              item.enrollment_num = item.enrollment.length;

              // like尚未處理
              item["like"] = false;
              if (userData.likedActivity.includes(item._id))
                item["like"] = true;

              activityData.push(item);
            });
          })
          .catch((err) => {
            console.log("ActivityService err");
            throw new Error(err);
          });
      })
      .catch((err) => {
        console.log("UserService err");
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    if (err.code === "ERR_BAD_REQUEST") {
      if (err.response.status == 401) {
        messageData.message = "請登入後再試!";
        messageData.state = "unauthorized";
      } else messageData.message = err.message;
    } else if (err.code === "ERR_NETWORK") {
      messageData.message = "伺服器錯誤";
      messageData.state = "error";
    } else {
      messageData.message = "非預期的錯誤";
      messageData.state = "error";
    }
    messageData.show = true;
  }
});
</script>

<template>
  <div class="main-bg p-8 lg:px-16">
    <AlertMessage
      :message-data="messageData"
      @close-message="messageData.show = false"
    >
    </AlertMessage>
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
              <a class="dropdown-item text-primary" href="/explore">探索活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="/create">建立活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex">
          <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
            <a class="" href="/explore">探索活動</a>
            <a class="text-black" href="/create">建立活動</a>
            <a class="text-black">我的活動</a>
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
            >
              <label for="">{{ item }}</label>
              <img src="@/assets/image/sortButton.svg" alt="" class="w-3" />
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
          <template v-for="(item, index) in filterOptions" :key="index">
            <div
              class="tag mx-2 my-2 inline-flex w-20 lg:w-11/12 lg:max-w-[160px]"
              :class="{
                'text-white bg-primary': userSetting.selectedTag == item,
              }"
              @click="tagClick(item)"
            >
              {{ item }}
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
          <template v-for="(item, index) in activityData" :key="index">
            <!-- 每個活動 -->
            <div
              class="relative m-auto min-w-[350px] rounded-lg bg-white p-6 shadow-lg lg:m-0"
            >
              <!-- 愛心 -->
              <div
                class="absolute top-2 right-4 cursor-pointer"
                @click="likeClick(item)"
              >
                <heart-filled v-if="item.like" class="text-red-600" />
                <heart-outlined v-else />
              </div>
              <div :class="{ 'lg:flex': userSetting.displayMode == 'list' }">
                <div
                  class="flex flex-grow flex-col flex-wrap gap-4"
                  :class="{
                    'flex-col': userSetting.displayMode == 'block',
                    'lg:flex-row': userSetting.displayMode == 'list',
                  }"
                >
                  <div
                    class="flex"
                    :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
                  >
                    <div class="w-20">標題</div>
                    <div class="text-gray">{{ item.title }}</div>
                  </div>
                  <div
                    class="flex"
                    :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
                  >
                    <div class="w-20">對象</div>
                    <div class="text-gray">{{ item.object }}</div>
                  </div>
                  <div
                    class="flex"
                    :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
                  >
                    <div class="w-20">地點</div>
                    <div class="text-gray">{{ item.location }}</div>
                  </div>
                  <div
                    class="flex"
                    :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
                  >
                    <div class="w-20">活動時間</div>
                    <div class="text-gray">{{ item.activity_time }}</div>
                  </div>
                  <div
                    class="flex"
                    :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
                  >
                    <div class="w-20">報名時間</div>
                    <div class="text-gray">{{ item.enroll_time }}</div>
                  </div>
                  <!-- 分隔線 -->
                  <hr class="border-1 w-[98%]" />
                  <!-- 簡略資訊 -->
                  <div class="mb-2 flex w-[98%] justify-end gap-4">
                    <div class="w-10">${{ item.fee }}</div>
                    <div class="flex w-10 items-center">
                      <eye-filled />{{ item.watch }}
                    </div>
                    <div class="flex w-10 items-center">
                      <user-outlined />{{ item.enrollment_num }}
                    </div>
                  </div>
                </div>

                <div
                  class="flex items-center justify-between gap-4"
                  :class="{
                    'lg:w-1/6  lg:min-w-[150px] lg:flex-col lg:justify-center':
                      userSetting.displayMode == 'list',
                  }"
                >
                  {{ testVal }}
                  <ModalDialog
                    :detail-data="modalDialogData"
                    @like-click="likeClick"
                  >
                    <button
                      class="w-[150px] bg-gray-500"
                      @click="detailClick(item)"
                    >
                      詳細資訊
                    </button>
                  </ModalDialog>

                  <button
                    class="w-[150px] bg-primary"
                    @click="enrollClick(item)"
                  >
                    報名活動
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
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
