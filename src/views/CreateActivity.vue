<script setup>
import { reactive, onBeforeMount, ref, onMounted } from "vue";
import "tw-elements";
import { useRouter } from "vue-router";
const router = useRouter();

import Store from "@/store";
import ActivityService from "@/services/activity.service.js";
import GroupService from "@/services/group.service.js";
import AlertMessage from "@/components/AlertMessage.vue";
import FileUpload from "@/components/FileUpload.vue";

/* data */
let createFormData;

let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

let groupData = ref([]);

const antUpload = ref(null);

/* functions */

function resetClick(handleReset) {
  antUpload.value.resetFileList();
  handleReset();
}

function submitClick() {
  let submitData = {};
  for (let key in createFormData) {
    if (createFormData[key] != undefined || createFormData[key] != null) {
      if (key === "activity_imgs") {
        submitData["activity_imgs"] = [];
        let activity_imgs_arr = JSON.parse(JSON.stringify(createFormData[key]));
        for (let i of activity_imgs_arr) {
          submitData["activity_imgs"].push(i.preview);
        }
      } else {
        submitData[key] = JSON.parse(JSON.stringify(createFormData[key]));
      }
    }
  }

  ActivityService.create(submitData)
    .then((res) => {
      messageData.show = true;
      messageData.state = "success";
      messageData.message = res.data;
    })
    .catch((err) => {
      if (err.name === "AxiosError")
        Store.commit("handleHTTPResponse", { err, messageData });
      else console.error(err);
    });
}

function autoFill() {
  createFormData.title = "title";
  createFormData.object = ["所有人"];
  createFormData.quota = 1;
  createFormData.location = "location";
  createFormData.activity_time = ["2023/01/29", "2023/01/30"];
  createFormData.enroll_time = ["2023/01/29", "2023/01/30"];
  createFormData.manager = "manager";
  createFormData.manager_contact = "manager_contact";
  createFormData.description = "description";
}

// hook
onBeforeMount(() => {
  GroupService.getAllGroups()
    .then((res) => {
      groupData.value = res.data;
    })
    .catch((err) => {
      if (err.name === "AxiosError")
        Store.commit("handleHTTPResponse", { err, messageData });
      else console.error(err);
    });

  createFormData = reactive({
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
});

onMounted(() => {});
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
              <a class="dropdown-item" href="/myactivity">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden lg:flex">
          <div class="flex flex-shrink-0 gap-20 font-bold">
            <a class="text-black" href="/explore">探索活動</a>
            <a class="" href="/create">建立活動</a>
            <a class="text-black" href="/myactivity">我的活動</a>
          </div>
        </div>
      </nav>
      <div class="flex items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" class="w-10" />
      </div>
    </header>
    <main>
      <VeeForm
        v-slot="{ errors, handleSubmit, handleReset }"
        class="flex w-full flex-wrap justify-between gap-4 overflow-y-auto bg-white bg-opacity-50 text-2xl"
      >
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0" for="">活動標題</label>
          <VeeField
            id="title"
            v-model="createFormData.title"
            name="title"
            type="text"
            rules="required"
            placeholder="活動標題"
            class="ant-input form-control w-full lg:max-w-md"
            :class="{
              'is-invalid': errors['title'],
            }"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">活動地點</label>
          <VeeField
            id="location"
            v-model="createFormData.location"
            name="location"
            type="text"
            rules="required"
            placeholder="活動地點"
            class="ant-input form-control w-full lg:max-w-md"
            :class="{
              'is-invalid': errors['location'],
            }"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">對象(多選)</label>
          <VeeField
            v-slot="{ field }"
            v-model="createFormData.object"
            name="object"
            rules="required"
          >
            <a-select
              v-bind="field"
              class="w-full lg:max-w-md"
              :class="{
                ' border border-red-600 ': errors['object'],
              }"
              mode="multiple"
            >
              <a-select-option value="所有人">所有人</a-select-option>
              <template v-for="(item, index) in groupData" :key="item._id">
                <a-select-option :value="item.name">{{
                  item.name
                }}</a-select-option>
              </template>
            </a-select>
          </VeeField>
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
          <VeeField
            id="manager"
            v-model="createFormData.manager"
            name="manager"
            type="text"
            rules="required"
            placeholder="負責人"
            class="ant-input form-control w-full lg:max-w-md"
            :class="{
              'is-invalid': errors['manager'],
            }"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">聯絡方式</label>
          <VeeField
            id="manager_contact"
            v-model="createFormData.manager_contact"
            name="manager_contact"
            type="text"
            rules="required"
            placeholder="聯絡方式"
            class="ant-input form-control w-full lg:max-w-md"
            :class="{
              'is-invalid': errors['manager_contact'],
            }"
          />
        </div>
        <div class="flex w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">活動時間</label>
          <VeeField
            v-slot="{ field }"
            v-model="createFormData.activity_time"
            name="activity_time"
            rules="required"
          >
            <a-range-picker
              value-format="YYYY-MM-DD"
              :placeholder="['開始時間', '結束時間']"
              v-bind="field"
              class="w-full lg:max-w-md"
              :class="{
                ' border border-red-600 ': errors['activity_time'],
              }"
            />
          </VeeField>
        </div>

        <div class="flex h-16 w-full gap-4 p-4 lg:w-2/5">
          <label class="w-28 flex-shrink-0">報名時間</label>
          <VeeField
            v-slot="{ field }"
            v-model="createFormData.enroll_time"
            name="enroll_time"
            rules="required"
          >
            <a-range-picker
              value-format="YYYY-MM-DD"
              :placeholder="['開始時間', '結束時間']"
              v-bind="field"
              class="w-full lg:max-w-md"
              :class="{
                ' border border-red-600 ': errors['enroll_time'],
              }"
            />
          </VeeField>
        </div>
        <div class="flex w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">活動照片<br />(限8張)</label>
          <FileUpload
            ref="antUpload"
            v-model:value="createFormData.activity_imgs"
          />
        </div>
        <div class="flex w-full gap-4 p-4">
          <label class="w-28 flex-shrink-0">活動介紹</label>
          <VeeField
            id="description"
            v-slot="{ field }"
            v-model="createFormData.description"
            name="description"
            rules="required"
            class="w-full lg:max-w-md"
            type="textarea"
          >
            <textarea
              v-bind="field"
              name="description"
              class="ant-input form-control"
              :class="{
                'is-invalid': errors['description'],
              }"
              rows="5"
            />
          </VeeField>
        </div>
        <div class="flex w-full justify-end gap-4">
          <button
            class="w-24 rounded-md bg-red-300 text-base font-semibold text-gray"
            @click.prevent="autoFill"
          >
            autoFill
          </button>
          <button
            class="w-24 rounded-md text-base font-semibold text-gray bg-lightgray"
            @click.prevent="router.push('explore')"
          >
            取消
          </button>
          <button
            type="reset"
            class="alert-warning w-24 rounded-md text-base font-semibold"
            @click.prevent="resetClick(handleReset)"
          >
            清空
          </button>
          <button
            class="w-24 rounded-md text-base font-semibold text-white bg-primary"
            @click="handleSubmit($event, submitClick)"
          >
            建立
          </button>
        </div>
      </VeeForm>
    </main>
  </div>
</template>

<style scoped></style>
