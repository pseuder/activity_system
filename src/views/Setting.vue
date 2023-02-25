<script setup>
import { reactive, ref } from "vue";
import ActivityService from "@/services/activity.service.js";
import GroupService from "@/services/group.service.js";
import AlertMessage from "@/components/AlertMessage.vue";
import AvatarUpload from "@/components/AvatarUpload.vue";
import { messageData } from "@/utils/common.js";

let avatarImg = reactive("");

let qwe = () => {
  console.log(avatarImg);
};
</script>

<template>
  <div class="main-bg flex flex-col gap-4 p-8 lg:px-16">
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
    <main>
      <div class="flex gap-2 overflow-y-auto bg-white bg-opacity-50 text-2xl">
        <div class="w-[10%]">nav</div>
        <div class="flex w-1 items-center">
          <div class="h-[400px] w-[1px] bg-gray-400"></div>
        </div>
        <div>
          <div class="flex w-full gap-4 p-4">
            <AvatarUpload v-model:value="avatarImg" />
          </div>
          <div class="flex w-full gap-4 p-4">
            <label class="w-28 flex-shrink-0" for="title">活動標題</label>
          </div>
          <div class="flex w-full gap-4 p-4">
            <label class="w-28 flex-shrink-0" for="title">活動標題</label>
          </div>
          <div class="flex w-full gap-4 p-4">
            <label class="w-28 flex-shrink-0" for="title">活動標題</label>
          </div>
          <div class="flex w-full gap-4 p-4">
            <label class="w-28 flex-shrink-0" for="title">活動標題</label>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
