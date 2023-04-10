<script setup>
import { ref } from "vue";
import i18n from "@/i18n.js";

const language = ref(null);

// 先去localStorage看是否有紀錄
// 再去根據瀏覽器預設語言決定

if (localStorage.getItem("language"))
  language.value = localStorage.getItem("language");
else language.value = navigator.language.split("-")[0];

/* methods */
function handleChange(val) {
  i18n.global.locale.value = val;
  localStorage.setItem("language", val);
}
</script>

<template>
  <div class="p-10">
    <div class="flex gap-2">
      <div class="w-24">{{ $t("favorite_language") }}</div>
      <a-select
        ref="select"
        v-model:value="language"
        style="width: 120px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="zh">中文</a-select-option>
        <a-select-option value="en">English</a-select-option>
      </a-select>
    </div>
  </div>
</template>
