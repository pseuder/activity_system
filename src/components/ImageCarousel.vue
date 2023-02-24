<script setup>
import { reactive, onMounted, computed } from "vue";

const state = reactive({
  running: true,
  currentIndex: 0,
});

onMounted(() => {
  setInterval(() => {
    if (state.running)
      state.currentIndex =
        props.images.length && (state.currentIndex + 1) % props.images.length;
  }, 1000);
});

const currentImage = computed(() => {
  return "data:image/png;base64," + props.images[state.currentIndex];
});

function mouseenter() {
  state.running = false;
}
function mouseleave() {
  state.running = true;
}

// props
let props = defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div @mouseover="mouseenter" @mouseleave="mouseleave">
    <a-image :src="currentImage"></a-image>
  </div>
</template>
