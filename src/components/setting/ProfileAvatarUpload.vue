<script setup>
import { ref, reactive, inject, watch } from "vue";
import {
  PlusOutlined,
  LoadingOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import urlJoin from "url-join";
import Store from "@/store";
import UserService from "@/services/user.service.js";
import {
  showMessageData,
  messageDataTemplete,
  handleAxiosResponse,
} from "@/utils/common.js";

/* props */
const props = defineProps({
  userImg: {
    type: String,
    default: "",
  },
});

/* data */
const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref("");
let editable = ref(false);
let messageData = reactive(messageDataTemplete);

/* computed, watch */
watch(
  () => props.userImg,
  (newValue) => (imageUrl.value = newValue)
);

/* inject */
const updateUserData = inject("updateUserData");

/* methods */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const handleChange = (info) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    getBase64(info.file.originFileObj, (base64Url) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
function editClick() {
  editable.value = true;
}
function cancelClick() {
  editable.value = false;
}
function checkClick() {
  UserService.updateProfile("avatar", imageUrl.value)
    .then((res) => {
      showMessageData({ message: res.data, state: "success" }, messageData);
      updateUserData({ key: "avatar", val: imageUrl.value });
      editable.value = false;
    })
    .catch((err) => {
      handleAxiosResponse(err, messageData);
    });
}
</script>

<template>
  <div class="flex max-w-2xl px-4 py-2">
    <div v-show="!editable">
      <!-- 使用者原照片 -->
      <div class="h-[150px] w-[150px]">
        <img
          v-if="userImg === ''"
          src="@\assets\image\default user.png"
          class="rounded-full"
        />
        <img v-else :src="userImg" alt="no img here" class="rounded-full" />
      </div>
    </div>
    <a-upload
      v-show="editable"
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :action="urlJoin(Store.state.domainAddress, '/api/auth/upload/')"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div>
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="avatar"
          class="h-full rounded-full"
        />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </div>
    </a-upload>
    <!-- edit button group -->
    <div class="self-center">
      <span
        v-show="!editable"
        class="flex h-8 w-8 cursor-pointer items-center justify-center"
        @click="editClick"
      >
        <edit-outlined />
      </span>

      <div class="flex align-bottom">
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
<style scope>
.avatar-uploader > .ant-upload {
  width: 150px;
  height: 150px;
}
</style>
