<script setup>
import { ref, watch } from "vue";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import UserService from "@/services/user.service.js";

const emit = defineEmits(["changeUserData"]);

let editable = ref(false);
let editData = ref("");

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

let caption = {
  username: "姓名",
  password: "密碼",
  email: "信箱",
  phone: "電話",
};

function editClick() {
  editable.value = true;
}
function cancelClick() {
  editable.value = false;
}
function checkClick() {
  UserService.updateProfile(props.type, editData.value)
    .then((a) => {
      emit("changeUserData", props.type, editData.value);
      editable.value = false;
    })
    .catch((b) => {
      console.log(b);
    });
}

watch(
  () => props.data,
  (newValue) => (editData.value = newValue)
);
</script>

<template>
  <div class="flex h-24 w-full max-w-2xl items-center px-2 py-2">
    <div class="flex-1 gap-4 overflow-hidden md:flex">
      <label class="w-10 flex-shrink-0">{{ caption[type] }}</label>
      <div class="h-8 flex-grow text-gray">
        <div v-show="!editable" class="overflow-x-auto">
          {{ data }}
        </div>
        <a-input
          v-show="editable"
          v-model:value="editData"
          :placeholder="'Please input your ' + type"
          class="h-[90%] w-[85%] text-xl"
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
