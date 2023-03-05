<script setup>
import { ref, watch } from "vue";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import UserService from "@/services/user.service.js";

/* props */
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  data: {
    type: String,
    default: "",
  },
});

/* data */
let editable = ref(false);
let editData = ref("");
let caption = {
  username: "姓名",
  password: "密碼",
  email: "信箱",
  phone: "電話",
};

/* computed, watch */
watch(
  () => props.data,
  (newValue) => (editData.value = newValue)
);

/* methods */
function editClick() {
  editable.value = true;
}
function cancelClick() {
  editable.value = false;
}
function checkClick() {
  UserService.updateProfile(props.type, editData.value).then(() => {
    emit("changeUserData", props.type, editData.value);
    editable.value = false;
  });
}

/* emits */
const emit = defineEmits(["changeUserData"]);
</script>

<template>
  <div class="flex h-24 w-full max-w-2xl items-center px-2 py-2">
    <div class="flex-1 gap-4 overflow-hidden md:flex">
      <label class="w-10 flex-shrink-0">{{ caption[type] }}</label>
      <div class="flex-grow text-gray">
        <a-input
          v-model:value="editData"
          :placeholder="'Please input your ' + type"
          class="w-[85%] text-xl"
          :disabled="!editable"
          size="large"
        />
      </div>
    </div>
    <div class="w-[65px]">
      <span
        v-show="!editable"
        class="flex h-8 w-8 cursor-pointer items-center justify-center"
        @click="editClick"
      >
        <edit-outlined />
      </span>

      <div class="flex w-full gap-3">
        <span
          v-show="editable"
          class="flex h-8 w-8 cursor-pointer items-center justify-center"
          @click="cancelClick"
        >
          <close-outlined />
        </span>
        <span
          v-show="editable"
          class="flex h-8 w-8 cursor-pointer items-center justify-center"
          @click="checkClick"
        >
          <check-outlined />
        </span>
      </div>
    </div>
  </div>
</template>
