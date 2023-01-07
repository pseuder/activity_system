<template>
  <div class="flex items-center justify-center bg-black"></div>
</template>

<script setup lang="ts">
import {
  MailOutlined,
  LockOutlined,
  LinkedinFilled,
} from "@ant-design/icons-vue";

import { ref, reactive } from "vue";

let testref = ref("test");

let alertData = reactive({
  show: true,
  type: "warning",
  message: "帳號密碼錯誤!",
});

function pri() {
  console.log(alertData.show);
}
</script>
