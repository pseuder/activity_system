<script setup>
import { reactive, ref } from "vue";
import "tw-elements";
import {
  HeartOutlined,
  HeartFilled,
  EyeFilled,
  UserOutlined,
} from "@ant-design/icons-vue";

import ActivityService from "@/services/activity.service.js";
import ButtonModal from "@/components/ButtonModal.vue";
import AutofadeMessage from "@/components/AutofadeMessage.vue";

//data
let sortOptions = ["活動時間", "報名時間", "報名價格", "查看人數", "參加人數"];
let filterOptions = ["全部", "A Group", "B Group", "C Group", "D Group"];
let activityData = reactive([]);
let buttonModalData = ref({});

for (let i = 0; i < 5; i++) {
  activityData.push({
    id: i,
    title: "活動標題" + i,
    object: "所有人",
    location: "Building 1",
    activity_time: "2022/11/12",
    enroll_time: "2022/11/01 ~ 2022/11/10",
    like: true,
    fee: 100,
    watch: 50,
    enrollment: "20", // 數字or滿
  });
}

let userSetting = reactive({
  displayMode: "list",
  selectedTag: "全部",
});

// functions

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
function likeClick(item) {
  item.like = !item.like;
}
function detailClick(item) {
  buttonModalData.value = item;
}
function enrollClick(id) {
  console.log(id);
  // ActivityService.enroll(JWT, activity_id);
}
</script>

<template>
  <div class="exploreBG p-8 lg:px-16">
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
            class="text-primary dropdown-toggle flex items-center lg:hidden"
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
              <a class="text-primary dropdown-item" href="#">探索活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">建立活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex">
          <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
            <a class="">探索活動</a>
            <a class="text-black">建立活動</a>
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
            class="h-8 w-8 rounded-lg border-black p-1"
            :class="{
              ' border-2': userSetting.displayMode == 'list',
            }"
            @click="displayClick"
          />
          <img
            src="@/assets/image/exploreBlock.svg"
            alt="block"
            class="h-8 w-8 rounded-lg border-black p-1"
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
                'bg-primary text-white': userSetting.selectedTag == item,
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
                      <user-outlined />{{ item.enrollment }}
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
                  <ButtonModal
                    :detail-data="buttonModalData"
                    @like-click="likeClick"
                  >
                    <button
                      class="btn w-[150px] bg-gray-500"
                      @click="detailClick(item)"
                    >
                      詳細資訊
                    </button>
                  </ButtonModal>

                  <button
                    class="bg-primary btn w-[150px]"
                    @click="enrollClick(item.id)"
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
