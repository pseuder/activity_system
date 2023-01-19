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
import AutofadeMessage from "@/components/AutofadeMessage.vue";

/* data */
let createFormData = reactive({
  title: "",
  object: "",
  location: "",
  activity_time: [],
  enroll_time: [],
  like: true,
  fee: 0,
  manager: "",
  manager_contact: "",
  quota: 0,
  activity_imgs: [],
  description: "",
});

let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

/* functions */
</script>

<template>
  <div class="mainBG p-8 lg:px-16">
    <AutofadeMessage
      :message-data="messageData"
      @close-message="messageData.show = false"
    >
    </AutofadeMessage>
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
            建立活動
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
              <a class="dropdown-item" href="/explore">探索活動</a>
            </li>
            <li>
              <a class="text-primary dropdown-item" href="/create">建立活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex">
          <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
            <a class="text-black" href="/explore">探索活動</a>
            <a class="" href="/create">建立活動</a>
            <a class="text-black">我的活動</a>
          </div>
        </div>
      </nav>
      <div class="flex items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" class="w-10" />
      </div>
    </header>
    <main class="p-4">
      <a-button type="primary">Primary Button</a-button>
      <div
        class="flex w-full flex-wrap justify-between gap-4 overflow-y-auto bg-white bg-opacity-50 text-2xl"
      >
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">標題</label>
          <input
            v-model="createFormData.title"
            type="text"
            class="w-full lg:max-w-md"
            placeholder="活動標題"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">對象</label>
          <input
            v-model="createFormData.object"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">地點</label>
          <input
            v-model="createFormData.location"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">名額</label>
          <input
            v-model.number="createFormData.quota"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">價格</label>
          <input
            v-model.number="createFormData.fee"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">活動時間</label>
          <!-- <input type="text" class="w-full lg:max-w-md" /> -->
          <a-range-picker
            v-model:value="createFormData.activity_time"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">負責人</label>
          <input
            v-model="createFormData.manager"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">聯絡方式</label>
          <input
            v-model="createFormData.manager_contact"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">報名時間</label>
          <input type="text" class="w-full lg:max-w-md" />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">上傳時間</label>
          <input type="text" class="w-full lg:max-w-md" />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-24 flex-shrink-0">介紹</label>
          <input
            v-model="createFormData.description"
            type="text"
            class="w-full lg:max-w-md"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
