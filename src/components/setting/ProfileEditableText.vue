<script setup>
import { ref, inject } from "vue";
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
let editData = ref(props.data);
let caption = {
  username: "profile_username",
  password: "profile_password",
  email: "profile_email",
  phone: "profile_phone",
};

/* inject */
const updateUserData = inject("updateUserData");

/* methods */
function editClick() {
  editable.value = true;
}
function cancelClick() {
  editable.value = false;
}
function checkClick() {
  UserService.updateProfile(props.type, editData.value).then(() => {
    updateUserData({ key: props.type, val: editData.value });
    editable.value = false;
  });
}
</script>

<template>
  <div class="flex h-24 w-full max-w-2xl items-center px-2 py-2">
    <div class="flex-grow gap-4 overflow-hidden md:flex">
      <label class="flex-shrink-0">{{ $t(caption[type]) }}</label>
      <div
        v-if="type === 'username' || type === 'email' || type === 'phone'"
        class="flex-grow text-gray"
      >
        <a-input
          v-model:value="editData"
          :placeholder="'Please input your ' + type"
          class="w-[85%] text-xl"
          :disabled="!editable"
          size="large"
        />
      </div>

      <div
        v-if="type === 'password'"
        class=""
        data-bs-toggle="modal"
        data-bs-target="#resetPasswordDialog"
      >
        <span class="flex h-8 w-8 cursor-pointer items-center justify-center">
          <edit-outlined />
        </span>
      </div>
    </div>
    <div
      v-if="type === 'username' || type === 'email' || type === 'phone'"
      class="w-[65px]"
    >
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
