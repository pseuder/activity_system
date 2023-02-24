<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";

import "tw-elements";

let mImages = reactive([
  "https://source.unsplash.com/random/1",
  "https://source.unsplash.com/random/2",
]);

function aa() {
  mImages.length = 0;
  mImages.push("https://source.unsplash.com/random/3");
  mImages.push("https://source.unsplash.com/random/4");
}
</script>

<template>
  <button class="bg-black" @click="aa">aaa</button>
  <ImageCarousel :images="mImages" />
</template>

<style scoped></style>
