<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import ActivityService from "@/services/activity.service.js";

let fileInput = reactive(null);

function uploadFile(a) {
  ActivityService.saveImages(a.target.files);
}
</script>

<template>
  <form>
    <input type="file" ref="fileInput" @change="uploadFile" multiple />
  </form>
</template>
