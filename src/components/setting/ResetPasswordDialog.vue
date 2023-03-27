<script setup>
import { reactive, ref } from "vue";
import { EditOutlined } from "@ant-design/icons-vue";
import UserService from "@/services/user.service.js";
import { messageDataTemplete } from "@/utils/common.js";

let inputData = ref({
  origin: "",
  newPassword: "",
  newPassword2: "",
});

let resetPasswordDialog = ref(null);
let messageData = reactive(messageDataTemplete);

function cancelClick() {
  resetPasswordDialog.value.click();
}

function submitClick() {
  UserService.resetPassword(inputData.value)
    .then((res) => {
      console.log(res.data);
      messageData.message = res.data;
      messageData.state = "success";
      messageData.show = true;
      resetPasswordDialog.value.click();
    })
    .catch((err) => {
      console.log(err.response.data);
      messageData.message = err.response.data;
      messageData.state = "warning";
      messageData.show = true;
    });
}
</script>

<template>
  <AlertMessage
    :message-data="messageData"
    @close-message="messageData.show = false"
  />
  <div
    id="resetPasswordDialog"
    ref="resetPasswordDialog"
    class="modal fade fixed top-0 left-0 hidden h-full w-full overflow-hidden"
    tabindex="-1"
  >
    <div
      class="modal-dialog pointer-events-none mx-auto mt-40 h-96 w-72 md:h-96 md:w-96"
    >
      <div
        class="modal-content main-bg pointer-events-auto h-full rounded-md bg-clip-padding"
      >
        <div class="modal-body h-full p-4 text-base font-normal">
          <div class="flex justify-center gap-2 self-center text-2xl">
            <edit-outlined />修改密碼
          </div>
          <div class="my-4">
            <div class="text-xl">原密碼</div>
            <a-input
              v-model:value="inputData.origin"
              :placeholder="'Please input your origin password'"
              class="w-[100%] text-xl"
              size="large"
            />
          </div>
          <div class="my-4">
            <div class="text-xl">新密碼</div>
            <a-input
              v-model:value="inputData.newPassword"
              :placeholder="'Please input your new password'"
              class="w-[100%] text-xl"
              size="large"
              type="password"
            />
          </div>
          <div class="my-4">
            <div class="text-xl">重複新密碼</div>
            <a-input
              v-model:value="inputData.newPassword2"
              :placeholder="'Please repeat your new password'"
              class="w-[100%] text-xl"
              size="large"
              type="password"
            />
          </div>
          <div class="text-end">
            <button
              class="mx-4 text-black bg-lightyellow"
              @click.prevent="cancelClick"
            >
              取消
            </button>
            <button class="bg-primary" @click.prevent="submitClick">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
