<script setup>
import { reactive, onBeforeMount, ref } from "vue";
import "tw-elements";

import ActivityService from "@/services/activity.service.js";
import AlertMessage from "@/components/AlertMessage.vue";
import FileUpload from "@/components/FileUpload.vue";

/* data */
let createFormData;

let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

/* functions */
function initCreateFormData() {
  createFormData = reactive({
    title: "",
    object: ["所有人"],
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
}

function submitClick() {
  let submitData = {};
  for (let key in createFormData) {
    submitData[key] = JSON.parse(JSON.stringify(createFormData[key]));
  }
  ActivityService.create(submitData)
    .then((res) => {
      console.log(res);
      messageData.show = true;
      messageData.state = "success";
      messageData.message = res.data;
    })
    .catch((err) => {
      console.log(err.message);
      messageData.show = true;
      messageData.state = "error";
      messageData.message = err.message;
    });
}

// hook
onBeforeMount(() => {
  initCreateFormData();
});
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
            class="dropdown-toggle flex items-center text-primary lg:hidden"
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
              <a class="dropdown-item text-primary" href="/create">建立活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex">
          <div class="flex flex-shrink-0 gap-20 font-bold">
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
    <main>
      <div
        class="flex w-full flex-wrap justify-between gap-4 overflow-y-auto bg-white bg-opacity-50 text-2xl"
      >
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">活動標題</label>
          <a-input
            v-model:value="createFormData.title"
            class="w-full lg:max-w-md"
            placeholder="活動標題"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">活動地點</label>
          <a-input
            v-model:value="createFormData.location"
            type="text"
            class="w-full lg:max-w-md"
            placeholder="活動地點"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">對象(多選)</label>
          <a-select
            v-model:value="createFormData.object"
            mode="multiple"
            class="w-full lg:max-w-md"
            placeholder="選擇對象"
          >
            <a-select-option value="china">China</a-select-option>
            <a-select-option value="usa">U.S.A</a-select-option>
          </a-select>
        </div>

        <div class="flex w-full gap-4 p-4 lg:w-[24%]">
          <label class="w-28 flex-shrink-0">參加名額</label>
          <a-input-number
            v-model:value="createFormData.quota"
            :min="0"
            class="w-full lg:max-w-md"
            placeholder="參加名額"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-[24%]">
          <label class="w-28 flex-shrink-0">參加費用</label>
          <a-input-number
            v-model:value="createFormData.fee"
            :min="0"
            class="w-full lg:max-w-md"
            placeholder="參加費用"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">負責人</label>
          <a-input
            v-model:value="createFormData.manager"
            type="text"
            class="w-full lg:max-w-md"
            placeholder="負責人"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">聯絡方式</label>
          <a-input
            v-model:value="createFormData.manager_contact"
            type="text"
            class="w-full lg:max-w-md"
            placeholder="負責人聯絡方式"
          />
        </div>
        <div class="flex w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">活動時間</label>
          <a-range-picker
            v-model:value="createFormData.activity_time"
            class="w-full lg:max-w-md"
            value-format="YYYY-MM-DD"
            :placeholder="['開始時間', '結束時間']"
          />
        </div>

        <div class="flex h-16 w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">報名時間</label>
          <a-range-picker
            v-model:value="createFormData.enroll_time"
            class="w-full lg:max-w-md"
            value-format="YYYY-MM-DD"
            :placeholder="['開始時間', '結束時間']"
          />
        </div>
        <div class="flex w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">上傳照片<br />(限8張)</label>
          <FileUpload v-model:value="createFormData.activity_imgs" />
        </div>
        <div class="flex w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">活動介紹</label>
          <a-textarea
            v-model:value="createFormData.description"
            placeholder="活動介紹"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            class="w-full lg:max-w-md"
          />
        </div>
      </div>
    </main>
    <footer class="flex justify-end gap-4">
      <button class="w-28 font-normal text-gray bg-lightgray">取消</button>
      <button
        class="w-28 font-normal text-black bg-warning"
        @click="initCreateFormData"
      >
        清空
      </button>
      <button
        class="w-28 font-normal text-white bg-primary"
        @click="submitClick"
      >
        建立
      </button>
    </footer>
  </div>
</template>

<style scoped>
.ant-btn-primary {
  background: #1890ff;
}
</style>
