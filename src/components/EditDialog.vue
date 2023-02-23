<script setup>
import { reactive, watch } from "vue";
import ActivityService from "@/services/activity.service.js";
import FileUpload from "@/components/FileUpload.vue";

// props
let props = defineProps({
  editData: {
    type: Object,
    default() {
      return {};
    },
  },
  groupData: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(["showAlert"]);

// data
let editData_copy = reactive({
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

watch(props.editData, async (newData) => {
  for (let key in editData_copy) {
    editData_copy[key] = newData[key];
  }
});

function deleteClick() {
  ActivityService.delete(editData_copy)
    .then((res) => {
      emit("showAlert", { message: res.data, state: "success", show: true });
    })
    .catch((err) => {
      emit("showAlert", { err: err, state: "error", show: true });
    });
}

function resetClick() {
  for (let key in editData_copy) {
    editData_copy[key] = props.editData[key];
  }
}

function submitClick() {
  ActivityService.edit(editData_copy)
    .then((res) => {
      emit("showAlert", { message: res.data, state: "success", show: true });
    })
    .catch((err) => {
      emit("showAlert", { err: err, state: "error", show: true });
    });
}
</script>

<template>
  <div
    id="editDialog"
    class="modal fade fixed top-0 left-0 hidden h-full w-full overflow-hidden"
    tabindex="-1"
  >
    <div
      class="modal-dialog pointer-events-none mx-auto my-7 h-[90%] w-5/6 max-w-max"
    >
      <div
        class="modal-content main-bg pointer-events-auto h-full rounded-md bg-clip-padding"
      >
        <VeeForm
          v-slot="{ errors }"
          class="modal-body h-full text-base font-normal"
        >
          <div class="flex h-full flex-col p-6">
            <div
              class="flex flex-wrap justify-between gap-6 overflow-y-auto bg-white bg-opacity-50 text-2xl"
            >
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0" for="title">活動標題</label>
                <VeeField
                  id="title"
                  v-model="editData_copy.title"
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
                <label class="w-28 flex-shrink-0" for="location"
                  >活動地點</label
                >
                <VeeField
                  id="location"
                  v-model="editData_copy.location"
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
                  v-model="editData_copy.object"
                  name="object"
                  rules="required"
                >
                  <a-select
                    v-bind="field"
                    dropdown-class-name="z-[1066]"
                    class="w-full lg:max-w-md"
                    :class="{
                      ' border border-red-600 ': errors['object'],
                    }"
                    mode="multiple"
                  >
                    <a-select-option value="所有人" class=""
                      >所有人</a-select-option
                    >
                    <template v-for="item in props.groupData" :key="item._id">
                      <a-select-option :value="item.name">{{
                        item.name
                      }}</a-select-option>
                    </template>
                  </a-select>
                </VeeField>
              </div>
              <div class="flex w-full min-w-[300px] gap-4 p-4 lg:w-[24%]">
                <label class="w-28 flex-shrink-0">參加名額</label>
                <a-input-number
                  v-model:value="editData_copy.quota"
                  :min="0"
                  class="w-full lg:max-w-md"
                  placeholder="參加名額"
                />
              </div>
              <div class="flex w-full min-w-[300px] gap-4 p-4 lg:w-[24%]">
                <label class="w-28 flex-shrink-0">參加費用</label>
                <a-input-number
                  v-model:value="editData_copy.fee"
                  :min="0"
                  class="w-full lg:max-w-md"
                  placeholder="參加費用"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">負責人</label>
                <VeeField
                  id="manager"
                  v-model="editData_copy.manager"
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
                  v-model="editData_copy.manager_contact"
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
                  v-model="editData_copy.activity_time"
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
                    dropdown-class-name="z-[1066]"
                  />
                </VeeField>
              </div>
              <div class="flex h-16 w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">報名時間</label>
                <VeeField
                  v-slot="{ field }"
                  v-model="editData_copy.enroll_time"
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
                    dropdown-class-name="z-[1066]"
                  />
                </VeeField>
              </div>
              <div class="flex w-full gap-4 p-4">
                <label class="w-28 flex-shrink-0">活動照片<br />(限8張)</label>
                <FileUpload
                  ref="antUpload"
                  v-model:value="editData_copy.activity_imgs"
                />
              </div>
              <div class="flex w-full gap-4 p-4">
                <label class="w-28 flex-shrink-0">活動介紹</label>
                <VeeField
                  id="description"
                  v-slot="{ field }"
                  v-model="editData_copy.description"
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
            </div>

            <div class="h-[80px] w-full">
              <!-- 分隔線 -->
              <hr class="my-3 w-[98%] border-2" />
              <div class="flex gap-6">
                <button
                  class="w-full bg-yellow-600"
                  @click.prevent="deleteClick"
                >
                  刪除活動
                </button>
                <button
                  class="w-full bg-yellow-600"
                  @click.prevent="resetClick"
                >
                  重置資料
                </button>
                <button class="w-full bg-primary" @click.prevent="submitClick">
                  修改活動
                </button>
              </div>
            </div>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>
