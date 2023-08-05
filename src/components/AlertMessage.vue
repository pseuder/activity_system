<script setup>
import { InfoCircleOutlined } from "@ant-design/icons-vue";

import { useRouter } from "vue-router";
import { atcb_action } from "add-to-calendar-button";

const router = useRouter();

const props = defineProps({
  messageData: {
    type: Object,
    default() {
      return {
        show: false,
        state: "success",
        message: "",
        activityInfo: {},
      };
    },
  },
});

defineEmits(["closeMessage"]);

function formatDateToISOString(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}Z`;
}

function addToCalendar(button) {
  let { title, activity_time, location, description } =
    props.messageData.activityInfo;

  const config = {
    name: title,
    location: location,
    description: description,
    startDate: formatDateToISOString(activity_time[0]),
    endDate: formatDateToISOString(activity_time[1]),
    options: ["Google"],
    timeZone: "currentBrowser",
  };
  atcb_action(config, button.target);
}
</script>

<template>
  <div
    v-show="messageData.show"
    class="alert alert-message z-[2000] flex font-semibold"
    :class="{
      ' text-white bg-primary ': messageData.state === 'success',
      'text-black bg-lightyellow':
        messageData.state === 'warning' || messageData.state === 'unauthorized',
      'text-white bg-error': messageData.state === 'error',
    }"
  >
    <div class="flex flex-grow">
      <div class="flex flex-grow items-center">
        <info-circle-outlined class="my-auto mx-2" />
        <div>{{ $t(messageData.message) }}</div>
      </div>
      <div class="w-fit">
        <button
          v-show="
            messageData.state === 'success' &&
            messageData.message.includes('enrollment_successful')
          "
          id="my-default-button"
          class="text-black bg-lightyellow"
          @click="addToCalendar($event)"
        >
          加入行事曆
        </button>

        <button
          v-show="messageData.state === 'unauthorized'"
          class="text-white bg-primary"
          @click="router.push('/')"
        >
          登入
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
