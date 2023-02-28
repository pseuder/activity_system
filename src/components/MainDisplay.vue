<script setup>
defineProps({
  userSetting: {
    type: Object,
    default() {
      return {};
    },
  },
});

defineEmits(["displayClick"]);
</script>

<template>
  <img
    src="@/assets/image/exploreList.svg"
    alt="list"
    class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
    :class="{
      'border-2': userSetting.displayMode == 'list',
    }"
    @click="$emit('displayClick', 'list')"
  />
  <img
    src="@/assets/image/exploreBlock.svg"
    alt="block"
    class="h-8 w-8 cursor-pointer rounded-lg border-solid border-black p-1"
    :class="{
      'border-2 ': userSetting.displayMode == 'block',
    }"
    @click="$emit('displayClick', 'block')"
  />
</template>
