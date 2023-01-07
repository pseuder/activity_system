<script setup>
import { reactive } from "vue";
import { MailOutlined, LockOutlined } from "@ant-design/icons-vue";
import { googleTokenLogin } from "vue3-google-login";

import AuthService from "@/services/auth.service.js";
import router from "@/router";
import CustomInput from "./CustomInput.vue";
import Alert from "./AlertMessage.vue";

// props
let props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

//data
let formData = reactive({
  email: "",
  password: "",
});

let alertData = reactive({
  show: false,
  state: "warning",
  message: "帳號密碼錯誤!",
});

// functions
function authorize() {
  AuthService.localAuth(props.title, formData, alertData).then((res) => {
    if (res) router.push("/explore");
  });
  router.push("/explore");
}

function clickSSO(type) {
  if (type == "google") {
    googleTokenLogin()
      .then((res) => {
        AuthService.googleAuth(res);
        router.push("/explore");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<template>
  <!-- 外框: 內縮, 圓角, 最大寬度 -->
  <div class="rounded-md bg-white px-10 py-6 md:rounded-2xl md:py-10">
    <!-- 內框-->
    <div class="flex flex-col gap-2 lg:gap-4 xl:gap-6 2xl:gap-10">
      <!-- 標題: 居中, 粗體, h1 -->
      <h1 class="text-shadow text-center">{{ title }}</h1>
      <!-- 第三方登入: flex排列 -->
      <div class="flex justify-center gap-5 self-center">
        <!-- 登入按鈕: 圓角, flex淡灰色背景 (hover效果) -->
        <button class="btn h-10 w-10 bg-[#FAFAFA] p-2">
          <img src="@/assets/image/Facebook.svg" />
        </button>
        <button
          class="btn h-10 w-10 bg-[#FAFAFA] p-2"
          @click="clickSSO('google')"
        >
          <img src="@/assets/image/Google.svg" />
        </button>
        <button class="btn h-10 w-10 bg-[#FAFAFA] p-2">
          <img src="@/assets/image/Linkedin.svg" />
        </button>
      </div>
      <!-- <button @click="alertData.show = !alertData.show" class="btn bg-primary">
        切換提示訊息
      </button> -->
      <!-- 提示訊息 -->
      <Alert
        :alert-data="alertData"
        @close-alert="alertData.show = false"
      ></Alert>

      <!-- 信箱&密碼 -->
      <div>
        <!-- <input :value="formData.email" type="text" @input="updateValue" /> -->
        <!-- 信箱輸入 -->
        <custom-input
          v-model="formData.email"
          placeholder="Email address"
          type="email"
          class="my-2 h-14"
        >
          <mail-outlined />
        </custom-input>
        <!-- 密碼輸入 -->
        <custom-input
          v-model="formData.password"
          placeholder="Password"
          input-type="password"
          class="my-2 h-14"
        >
          <lock-outlined />
        </custom-input>
      </div>
      <!-- help bar -->
      <slot name="helpbar"></slot>
      <!-- 登入按鈕 -->
      <button
        class="btn h-12 font-bold"
        :class="{
          'bg-primary': title === 'Login',
          'bg-[#6836DD]': title === 'Signup',
        }"
        @click="authorize"
      >
        {{ title }}
      </button>
      <!-- nav bar -->
      <slot name="navbar"></slot>
    </div>
  </div>
</template>
