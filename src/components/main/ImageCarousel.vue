<script setup>
import { reactive, onMounted, computed } from "vue";

const state = reactive({
  running: true,
  currentIndex: 0,
});

onMounted(() => {
  // 控制照片的輪播
  setInterval(() => {
    // 避免props還沒準備好時導致計算結果為null
    if (state.running && props.images.length > 1)
      state.currentIndex = (state.currentIndex + 1) % props.images.length;
  }, 2500);
});

const currentImage = computed(() => {
  if (props.images.length > 0) {
    console.log(props.images[state.currentIndex]);
    if (props.images[state.currentIndex].includes("data:image"))
      return props.images[state.currentIndex];
    else return "data:image/png;base64," + props.images[state.currentIndex];
  }
  return "";
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
    <!-- 待完成: 人為控制輪播 -->
    <a-image :src="currentImage" :preview="false"></a-image>
  </div>
</template>
