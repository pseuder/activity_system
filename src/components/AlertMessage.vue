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
    class="alert-message flex"
    :class="{
      ' text-white ': messageData.state === 'success',
      'text-black bg-warning': messageData.state === 'warning',
      'text-white bg-error': messageData.state === 'error',
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

    <div
      class="ml-4 w-fit cursor-pointer py-2 px-4"
      :class="{
        ' text-white ': messageData.state === 'success',
        'text-black ': messageData.state === 'warning',
        'text-white bg-error': messageData.state === 'error',
      }"
      @click="$emit('closeMessage')"
    >
      x
    </div>
  </div>
</template>
