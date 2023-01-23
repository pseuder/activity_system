<script setup>
import { InfoCircleOutlined } from "@ant-design/icons-vue";

defineProps({
  messageData: {
    type: Object,
    default() {
      return {
        show: false,
        state: "success",
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
    class="autofade-message absolute top-10 left-1/2 z-[1] flex w-[90%] max-w-lg -translate-x-1/2"
    :class="{
      ' text-white': messageData.state === 'success',
      'bg-warning': messageData.state === 'warning',
      'bg-error': messageData.state === 'error',
    }"
  >
    <div class="flex flex-grow">
      <div class="flex flex-grow items-center">
        <info-circle-outlined class="my-auto mx-2" />
        <div>{{ messageData.message }}</div>
      </div>
      <div class="w-fit">
        <button
          v-show="messageData.state === 'success'"
          class="text-black bg-warning"
        >
          加入行事曆
        </button>
      </div>
    </div>

    <button class="ml-4 w-fit text-black" @click="$emit('closeMessage')">
      x
    </button>
  </div>
</template>
