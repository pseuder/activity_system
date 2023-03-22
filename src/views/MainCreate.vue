<script setup>
import { reactive, ref } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import ActivityService from "@/services/activity.service.js";
import AlertMessage from "@/components/AlertMessage.vue";
import FileUpload from "@/components/main/FileUpload.vue";
import { debounce } from "lodash";
import {
  handleAxiosResponse,
  fileToBase64ByQuality,
  convertBase64UrlToBlob,
  messageDataTemplete,
  showMessageData,
} from "@/utils/common.js";

/* props */
defineProps({
  groupData: {
    type: Array,
    required: true,
  },
});

/* data */
let createFormData = reactive({
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
let antUpload = ref(null);
let messageData = reactive(messageDataTemplete);
let submitLoading = ref(false);

/* methods */
function resetClick(handleReset) {
  antUpload.value.resetFileList();
  handleReset();
}

function submitClick() {
  submitLoading.value = true;
  submitDebounce();
}

let submitDebounce = debounce(async function () {
  const formData = new FormData();
  for (let key in createFormData) {
    if (createFormData[key] != undefined || createFormData[key] != null) {
      if (key === "activity_imgs") {
        for (let activity_img of createFormData[key]) {
          let file = activity_img.originFileObj;
          await fileToBase64ByQuality(file, 90).then((base64) => {
            let myBlob = convertBase64UrlToBlob(base64, file.type);
            formData.append("files", myBlob);
          });
        }
      } else {
        // 因為formData append會將陣列轉成字串, 所以先以stringify儲存
        formData.append(key, JSON.stringify(createFormData[key]));
      }
    }
  }

  ActivityService.create(formData)
    .then((res) => {
      showMessageData({ message: res.data, state: "success" }, messageData);
      submitLoading.value = false;
    })
    .catch((err) => {
      handleAxiosResponse(err, messageData);
      submitLoading.value = false;
    });
}, 2000);

function autoFill() {
  createFormData.title = "title";
  createFormData.object = ["所有人"];
  createFormData.quota = 1;
  createFormData.location = "location";
  let date, year, month, day, dateString1;

  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1; // 取得月份，注意要加 1
  day = date.getDate();

  dateString1 = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  createFormData.activity_time = [dateString1, dateString1];
  createFormData.enroll_time = [dateString1, dateString1];
  createFormData.manager = "manager";
  createFormData.manager_contact = "manager_contact";
  createFormData.description = "description";
}

/* emits */
defineEmits(["navigate", "stopLoading"]);
</script>

<template>
  <AlertMessage
    :message-data="messageData"
    @close-message="messageData.show = false"
  >
  </AlertMessage>

  <VeeForm
    v-slot="{ errors, handleSubmit, handleReset }"
    class="flex w-full flex-wrap justify-between gap-4 overflow-y-auto bg-white bg-opacity-50 text-2xl"
  >
    <div class="flex w-full gap-4 p-4 lg:w-2/5">
      <label class="w-28 flex-shrink-0" for="title">活動標題</label>
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
          <template v-for="item in groupData" :key="item._id">
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
        @click.prevent="$emit('navigate', 'explore')"
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
        v-show="!submitLoading"
        class="w-24 rounded-md text-base font-semibold text-white bg-primary"
        @click="handleSubmit($event, submitClick)"
      >
        建立
      </button>
      <button
        v-show="submitLoading"
        class="w-24 cursor-not-allowed rounded-md text-base font-semibold text-white bg-primary"
      >
        <loading-outlined />
        建立
      </button>
    </div>
  </VeeForm>
</template>
