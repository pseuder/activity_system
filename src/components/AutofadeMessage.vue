<script setup>
import { InfoCircleOutlined } from "@ant-design/icons-vue";

defineProps({
  messageData: {
    type: Object,
    default() {
      return {
        show: false,
        type: "success",
        message: "",
      };
    },
  },
});

defineEmits(["closeMessage"]);
</script>

<template>
  <div
    v-show="messageData.show"
    class="autofade-message absolute top-10 flex w-[90%] max-w-lg"
    :class="{
      ' text-white': messageData.type === 'success',
      'bg-warning': messageData.type === 'warning',
      'bg-error': messageData.type === 'error',
    }"
  >
    <div class="flex flex-grow">
      <div class="flex flex-grow items-center">
        <info-circle-outlined class="my-auto mx-2" />
        <div>{{ messageData.message }}</div>
      </div>
      <div class="w-fit">
        <button
          v-show="messageData.type === 'success'"
          class="bg-warning text-black"
        >
          加入行事曆
        </button>
      </div>
    </div>

    <button class="ml-4 w-fit text-black" @click="closeMessage">x</button>
  </div>
</template>
