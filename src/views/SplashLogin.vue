<script setup>
import { ref, reactive } from "vue";
import LoginPanel from "@/components/main/LoginPanel.vue";

let remember = ref(false);

/* emits */
defineEmits(["navigate"]);

function forgetClick() {
  console.log(remember.value);
}
</script>

<template>
  <div
    class="flex flex-col overflow-auto bg-login-bg-small bg-cover bg-fixed bg-center bg-no-repeat md:bg-login-bg-large"
  >
    <header class="flex h-20 justify-between py-2 px-6">
      <div class="flex items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
      <div class="flex items-center gap-2">
        <button class="h-10 bg-primary" @click="$emit('navigate', 'login')">
          {{ $t("login") }}
        </button>
        <button
          class="h-10 text-primary border-primary"
          @click="$emit('navigate', 'signup')"
        >
          {{ $t("signup") }}
        </button>
      </div>
    </header>
    <main class="flex flex-grow items-center justify-center">
      <div class="w-0 md:w-1/2"></div>
      <div class="md:w-1/2">
        <LoginPanel
          class="mx-auto my-4 w-11/12 max-w-lg"
          title="login"
          :remember="remember"
        >
          <template #helpbar>
            <div class="flex flex-wrap justify-between">
              <!-- 記住資訊 -->
              <div class="flex-shrink-0">
                <input
                  id="remember"
                  v-model="remember"
                  type="checkbox"
                  class="m-2"
                />
                <label for="remember">{{ $t("remember") }}</label>
              </div>
              <!-- 忘記密碼 -->
              <div class="self-center">
                <!-- <a class="flex-shrink-0" @click="forgetClick">{{
                  $t("forgetPassword")
                }}</a> -->
              </div>
            </div>
          </template>

          <template #navbar>
            <div class="flex flex-wrap justify-center gap-2">
              {{ $t("noAccount") }}
              <a @click="$emit('navigate', 'signup')">{{ $t("signup") }}</a>
            </div>
          </template>
        </LoginPanel>
      </div>
    </main>
  </div>
</template>
