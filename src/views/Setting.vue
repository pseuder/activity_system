<script setup>
import { reactive, ref } from "vue";
import AlertMessage from "@/components/AlertMessage.vue";
import ProfileSetting from "@/components/ProfileSetting.vue";
import { messageDataTemplete } from "@/utils/common.js";

import {
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";

let currentPage = ref("profile");
let messageData = reactive(messageDataTemplete);

function navigate(path) {
  currentPage.value = path;
}

const pageMap = reactive({
  profile: ProfileSetting,
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
        class="flex flex-grow items-center justify-center xl:ml-[10vw] xl:justify-start"
      >
        <div class="dropdown relative">
          <button
            id="dropdownMenuButton"
            class="dropdown-toggle flex items-center text-black lg:hidden"
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
              <a class="dropdown-item" href="/explore">探索活動</a>
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
          <div class="flex flex-shrink-0 gap-20 font-bold">
            <a class="text-black" href="/explore">探索活動</a>
            <a class="text-black" href="/create">建立活動</a>
            <a class="text-black" href="/myactivity">我的活動</a>
          </div>
        </div>
      </nav>
      <div class="flex items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" class="w-10" />
      </div>
    </header>
    <main
      class="flex h-[700px] gap-2 overflow-y-auto bg-white bg-opacity-50 p-4 text-xl"
    >
      <!-- left side -->
      <div class="w-[10%] max-w-[140px] md:w-[20%]">
        <div class="mt-[100%] flex flex-col items-center gap-14">
          <div
            class="flex cursor-pointer items-center"
            @click="navigate('profile')"
          >
            <user-outlined />
            <span class="hidden md:inline">個人資料</span>
          </div>
          <div
            class="flex cursor-pointer items-center"
            @click="navigate('favorite')"
          >
            <setting-outlined />
            <span class="hidden md:inline">喜愛設定</span>
          </div>
          <div
            class="flex cursor-pointer items-center"
            @click="navigate('contact')"
          >
            <question-circle-outlined />
            <span class="hidden md:inline">聯絡我們</span>
          </div>
        </div>
      </div>
      <!-- middle -->
      <div class="flex w-1 items-center">
        <div class="h-[90%] w-[1px] bg-gray-400"></div>
      </div>
      <!-- right side -->
      <div class="flex-grow">
        <keep-alive>
          <component
            :is="pageMap[currentPage]"
            @navigate="navigate"
          ></component>
        </keep-alive>
      </div>
    </main>
  </div>
</template>
