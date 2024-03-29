<script setup>
import { reactive, watch, ref } from "vue";
import ActivityService from "@/services/activity.service.js";
import FileUpload from "@/components/main/FileUpload.vue";
import { activityDataTemplete } from "@/utils/common.js";
import { DeleteFilled } from "@ant-design/icons-vue";

/* props */
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

/* emits */
const emit = defineEmits(["showAlert", "removeActivityDisplay"]);

// data
let editData_copy = reactive(activityDataTemplete);
editData_copy["uploadedImages"] = [];
let editDialog = ref(null);
let antUpload = ref(null);

/* methods */
function deleteClick() {
  ActivityService.delete(editData_copy)
    .then((res) => {
      editDialog.value.click();
      emit("removeActivityDisplay", editData_copy);
      emit("showAlert", { message: res.data, state: "success", show: true });
    })
    .catch((err) => {
      emit("showAlert", { err: err, state: "error", show: true });
    });
}

function resetClick() {
  for (let key in editData_copy) {
    editData_copy[key] = JSON.parse(JSON.stringify(props.editData[key]));
  }
}

function submitClick() {
  ActivityService.edit(editData_copy)
    .then((res) => {
      emit("showAlert", { message: res.data, state: "success", show: true });
      editDialog.value.click();
    })
    .catch((err) => {
      emit("showAlert", { err: err, state: "error", show: true });
    });
}

function uploadChange(val) {
  editData_copy["uploadedImages"] = val;
}

function removeImgClick(img) {
  editData_copy.activity_imgs.splice(
    editData_copy.activity_imgs.indexOf(img),
    1
  );
}

/* computed, watch */
watch(
  () => props.editData,
  () => {
    for (let key in props.editData) {
      editData_copy[key] = JSON.parse(JSON.stringify(props.editData[key]));
    }
    antUpload.value.resetFileList();
  }
);
</script>

<template>
  <div
    id="editDialog"
    ref="editDialog"
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
                <label class="w-28 flex-shrink-0" for="title">{{
                  $t("editDialog_title")
                }}</label>
                <VeeField
                  id="title"
                  v-model="editData_copy.title"
                  name="title"
                  type="text"
                  rules="required"
                  :placeholder="$t('editDialog_title')"
                  class="ant-input form-control w-full lg:max-w-md"
                  :class="{
                    'is-invalid': errors['title'],
                  }"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0" for="location">{{
                  $t("editDialog_location")
                }}</label>
                <VeeField
                  id="location"
                  v-model="editData_copy.location"
                  name="location"
                  type="text"
                  rules="required"
                  :placeholder="$t('editDialog_location')"
                  class="ant-input form-control w-full lg:max-w-md"
                  :class="{
                    'is-invalid': errors['location'],
                  }"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_object")
                }}</label>
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
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_quota")
                }}</label>
                <a-input-number
                  v-model:value="editData_copy.quota"
                  :min="0"
                  class="w-full lg:max-w-md"
                  :placeholder="$t('editDialog_quota')"
                />
              </div>
              <div class="flex w-full min-w-[300px] gap-4 p-4 lg:w-[24%]">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_fee")
                }}</label>
                <a-input-number
                  v-model:value="editData_copy.fee"
                  :min="0"
                  class="w-full lg:max-w-md"
                  :placeholder="$t('editDialog_fee')"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_manager")
                }}</label>
                <VeeField
                  id="manager"
                  v-model="editData_copy.manager"
                  name="manager"
                  type="text"
                  rules="required"
                  :placeholder="$t('editDialog_manager')"
                  class="ant-input form-control w-full lg:max-w-md"
                  :class="{
                    'is-invalid': errors['manager'],
                  }"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_manager_contact")
                }}</label>
                <VeeField
                  id="manager_contact"
                  v-model="editData_copy.manager_contact"
                  name="manager_contact"
                  type="text"
                  rules="required"
                  :placeholder="$t('editDialog_manager_contact')"
                  class="ant-input form-control w-full lg:max-w-md"
                  :class="{
                    'is-invalid': errors['manager_contact'],
                  }"
                />
              </div>
              <div class="flex w-full gap-4 p-4 lg:w-2/5">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_activity_time")
                }}</label>
                <VeeField
                  v-slot="{ field }"
                  v-model="editData_copy.activity_time_editable"
                  name="activity_time"
                  rules="required"
                >
                  <a-range-picker
                    value-format="YYYY-MM-DD"
                    :placeholder="[
                      $t('editDialog_startTime'),
                      $t('editDialog_startTime'),
                    ]"
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
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_enroll_time")
                }}</label>
                <VeeField
                  v-slot="{ field }"
                  v-model="editData_copy.enroll_time_editable"
                  name="enroll_time"
                  rules="required"
                >
                  <a-range-picker
                    value-format="YYYY-MM-DD"
                    :placeholder="[
                      $t('editDialog_startTime'),
                      $t('editDialog_startTime'),
                    ]"
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
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_activity_imgs")
                }}</label>
                <div class="flex flex-col self-center md:flex-row">
                  <div class="text-sm md:flex md:self-end">
                    <template
                      v-for="(img, index) in editData_copy.activity_imgs"
                      :key="index"
                    >
                      <div
                        class="relative mb-2 mr-2 h-[104px] w-[104px] rounded-md border border-gray-300"
                      >
                        <div
                          class="absolute right-[-10px] top-[-10px] z-[1] h-6 w-6 cursor-pointer rounded-full border bg-red-500 text-center leading-4"
                          @click="removeImgClick(img)"
                        >
                          <delete-filled class="text-white" />
                        </div>
                        <a-image
                          :src="
                            img.includes('data:image')
                              ? img
                              : 'data:image/png;base64,' + img
                          "
                          :preview="false"
                        />
                      </div>
                    </template>
                  </div>

                  <FileUpload ref="antUpload" @upload-change="uploadChange" />
                </div>
              </div>
              <div class="flex w-full gap-4 p-4">
                <label class="w-28 flex-shrink-0">{{
                  $t("editDialog_description")
                }}</label>
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
                <button class="w-full bg-error" @click.prevent="deleteClick">
                  {{ $t("editDialog_delete") }}
                </button>
                <button
                  class="w-full bg-yellow-600"
                  @click.prevent="resetClick"
                >
                  {{ $t("editDialog_reset") }}
                </button>
                <button class="w-full bg-primary" @click.prevent="submitClick">
                  {{ $t("editDialog_modify") }}
                </button>
              </div>
            </div>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<style scope>
.myPreviewMask {
  background: red;
}
</style>
