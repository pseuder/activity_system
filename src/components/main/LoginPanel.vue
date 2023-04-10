<script setup>
import { reactive, ref, onMounted } from "vue";
import { MailOutlined, LockOutlined } from "@ant-design/icons-vue";
import { googleTokenLogin } from "vue3-google-login";
import vueRecaptcha from "vue3-recaptcha2";

import router from "@/router";
import AuthService from "@/services/auth.service.js";
import LoginPanelInput from "@/components/main/LoginPanelInput.vue";
import LoginPanelMessage from "@/components/main/LoginPanelMessage.vue";
/* props */
let props = defineProps({
  title: {
    type: String,
    default: "",
  },
  remember: {
    type: Boolean,
    default: false,
  },
});

//data
let formData = reactive({
  email: "",
  password: "",
});

let alertData = reactive({
  state: "",
  message: "",
  show: false,
});

let captcha = ref("");
let captchaRef = ref("");

// functions
async function authorize() {
  if (captcha.value === "") {
    alertData.state = "warning";
    alertData.message = "請先通過機器人驗證";
    alertData.show = true;
    return;
  }
  AuthService.localAuth(props.title, formData, captcha.value)
    .then((res) => {
      if (props.remember)
        localStorage.setItem("authorization", JSON.stringify(res.data));
      else sessionStorage.setItem("authorization", JSON.stringify(res.data));
      router.push("/main");
    })
    .catch((err) => {
      console.log(err);
      alertData.state = "warning";
      alertData.message = err.response.data;
      alertData.show = true;

      captcha.value = "";
      captchaRef.value.reset();
    });
}

function clickSSO(type) {
  if (type == "google") {
    googleTokenLogin()
      .then((res) => {
        AuthService.googleAuth(res)
          .then((res) => {
            sessionStorage.setItem("authorization", JSON.stringify(res.data));
            router.push("/main");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// 回傳一組 token，並把 token 傳給後端驗證
const recaptchaVerified = (res) => {
  captcha.value = res;
};

const recaptchaExpired = (res) => {
  // 過期後執行動作
  console.log(res);
};

const recaptchaFailed = (res) => {
  // 失敗執行動作
  console.log(res);
};

onMounted(() => {});
</script>

<template>
  <!-- 外框: 內縮, 圓角, 最大寬度 -->
  <div class="rounded-md bg-white px-10 py-6 md:rounded-2xl md:py-10">
    <!-- 內框-->
    <div class="flex flex-col gap-2 lg:gap-4 xl:gap-6">
      <!-- 標題: 居中, 粗體, h1 -->
      <h1 class="text-center text-shadow">{{ title }}</h1>
      <!-- 第三方登入: flex排列 -->
      <div class="flex justify-center gap-5 self-center">
        <!-- 登入按鈕: 圓角, flex淡灰色背景 (hover效果) -->
        <button class="h-10 w-10 bg-[#FAFAFA] p-2">
          <img src="@/assets/image/Facebook.svg" />
        </button>
        <button class="h-10 w-10 bg-[#FAFAFA] p-2" @click="clickSSO('google')">
          <img src="@/assets/image/Google.svg" />
        </button>
        <button class="h-10 w-10 bg-[#FAFAFA] p-2">
          <img src="@/assets/image/Linkedin.svg" />
        </button>
      </div>
      <!-- 提示訊息 -->
      <LoginPanelMessage
        :alert-data="alertData"
        @close-alert="alertData.show = false"
      ></LoginPanelMessage>

      <!-- 信箱&密碼 -->
      <div>
        <!-- 信箱輸入 -->
        <LoginPanelInput
          v-model="formData.email"
          :placeholder="$t('inputPlaceholderEmail')"
          type="email"
          class="my-2 h-14"
        >
          <mail-outlined />
        </LoginPanelInput>
        <!-- 密碼輸入 -->
        <LoginPanelInput
          v-model="formData.password"
          :placeholder="$t('inputPlaceholderPassword')"
          input-type="password"
          class="my-2 h-14"
        >
          <lock-outlined />
        </LoginPanelInput>
      </div>
      <!-- help bar -->
      <slot name="helpbar"></slot>
      <vue-recaptcha
        ref="captchaRef"
        class="scale-90 transform self-center overflow-auto md:scale-100 md:self-start"
        sitekey="6LdbAi4lAAAAABIdPfcUvVRzaPfs2TsqQJ8N1vpu"
        size="normal"
        @verify="recaptchaVerified"
        @expire="recaptchaExpired"
        @fail="recaptchaFailed"
      >
      </vue-recaptcha>
      <!-- 登入按鈕 -->
      <button
        class="h-12 font-bold"
        :class="{
          'bg-primary': title === 'login',
          'bg-[#6836DD]': title === 'signup',
        }"
        @click="authorize"
      >
        {{ $t(title) }}
      </button>
      <!-- nav bar -->
      <slot name="navbar"></slot>
    </div>
  </div>
</template>

<style scoped></style>
