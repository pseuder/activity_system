<template>
  <div class="flex max-w-2xl px-4 py-2">
    <a-upload
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader w-fit"
      :show-upload-list="false"
      :action="urlJoin(Store.state.domainAddress, '/api/auth/upload/')"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="rounded-full" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <!-- edit button group -->
    <div class="self-center">
      <span
        v-show="!editable"
        class="flex h-8 w-8 items-center justify-center"
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

<script>
import {
  PlusOutlined,
  LoadingOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import Store from "../store";
import urlJoin from "url-join";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
  },
  setup(props, { emit }) {
    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref("");
    let editable = ref(false);
    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
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
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
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
      editable.value = false;
    }
    return {
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      Store,
      urlJoin,
      editable,
      editClick,
      cancelClick,
      checkClick,
    };
  },
});
</script>
<style scope>
.avatar-uploader > .ant-upload {
  width: 150px;
  height: 150px;
}
</style>
