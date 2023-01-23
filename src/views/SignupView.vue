<script setup>
import LoginPanel from "@/components/LoginPanel.vue";

defineEmits(["navigate"]);
</script>

<template>
  <div
    class="flex flex-col overflow-auto bg-login-bg-small bg-cover bg-fixed bg-center bg-no-repeat md:bg-signup-bg-large"
  >
    <header class="py-auto flex h-20 justify-between px-6">
      <div class="flex items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
      <div class="flex items-center gap-2">
        <button
          class="h-10 text-primary border-primary"
          @click="$emit('navigate', 'login')"
        >
          Login
        </button>
        <button class="h-10 bg-primary" @click="$emit('navigate', 'signup')">
          Signup
        </button>
      </div>
    </header>
    <main class="flex flex-grow items-center justify-center">
      <div class="w-0 md:w-1/2"></div>
      <div class="md:w-1/2">
        <LoginPanel class="mx-auto my-4 w-11/12 max-w-lg" title="Signup">
          <template #helpbar>
            <!-- 同意條款 -->
            <div class="flex items-center">
              <input id="remember" type="checkbox" class="m-2" />
              <label for="agree" class=""
                >I’m agree with the <a href="">terms & conditions</a>.</label
              >
            </div>
          </template>

          <template #navbar>
            <div class="flex flex-wrap justify-center gap-2">
              Already have account?
              <a @click="$emit('navigate', 'login')">Login</a>
            </div>
          </template>
        </LoginPanel>
      </div>
    </main>
  </div>
</template>
