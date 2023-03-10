<script setup>
/* props */
defineProps({
  userSetting: {
    type: Object,
    default() {
      return {};
    },
  },
});

/* emits */
defineEmits(["orientationClick"]);
</script>

<template>
  <img
    src="@/assets/image/exploreList.svg"
    alt="list"
    class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
    :class="{
      'border-2': userSetting.displayMode == 'list',
    }"
    @click="$emit('orientationClick', 'list')"
  />
  <img
    src="@/assets/image/exploreBlock.svg"
    alt="block"
    class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
    :class="{
      'border-2 ': userSetting.displayMode == 'block',
    }"
    @click="$emit('orientationClick', 'block')"
  />
</template>
