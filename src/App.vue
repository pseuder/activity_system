<script setup>
import i18n from "./i18n";
function changeLocal(lang) {
  i18n.global.locale.value = lang;
}
</script>
<template>
  <button class="bg-blue-500" @click="changeLocal('zh-TW')">zh</button>
  <button class="bg-blue-500" @click="changeLocal('en-US')">en</button>
  <router-view class="h-full" />
</template>
