<script setup lang="ts">
import { ref, reactive } from "vue";
import AutofadeMessage from "@/components/AutofadeMessage.vue";

let testref = ref("test");
let messageData = reactive({
  show: true,
  type: "success",
  message: "成功!",
});

function showMessage(type) {
  messageData.show = true;
  messageData.type = type;
}

function closeMessage() {
  messageData.show = false;
}
</script>

<template>
  <div class="flex items-center justify-center bg-black">
    <button @click="showMessage('success')">success</button>
    <button @click="showMessage('warning')">warning</button>
    <button @click="showMessage('error')">error</button>
    <AutofadeMessage :messageData="messageData" @click="closeMessage">
    </AutofadeMessage>
  </div>
</template>
