<script setup>
import { reactive, ref } from "vue";
import AlertMessage from "@/components/AlertMessage.vue";
import SettingProfile from "@/views/SettingProfile.vue";
import { messageDataTemplete } from "@/utils/common.js";
import router from "@/router";
import {
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

let currentPage = ref("profile");
let messageData = reactive(messageDataTemplete);
const pageMap = reactive({
  profile: SettingProfile,
});

function navigate(path) {
  currentPage.value = path;
}

function logoutClick() {
  localStorage.clear();
  router.push("/");
}
</script>

<template>
  <div class="">
    <AlertMessage
      :message-data="messageData"
      @close-message="messageData.show = false"
    >
    </AlertMessage>

    <div
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
            <span class="hidden lg:inline">個人資料</span>
          </div>
          <div
            class="flex cursor-pointer items-center"
            @click="navigate('favorite')"
          >
            <setting-outlined />
            <span class="hidden lg:inline">喜愛設定</span>
          </div>
          <div
            class="flex cursor-pointer items-center"
            @click="navigate('contact')"
          >
            <question-circle-outlined />
            <span class="hidden lg:inline">聯絡我們</span>
          </div>
          <div
            class="flex cursor-pointer items-center text-red-500"
            @click="logoutClick"
          >
            <logout-outlined />
            <span class="hidden lg:inline">登出</span>
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
    </div>
  </div>
</template>