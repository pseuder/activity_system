<script setup>
/* props */
defineProps({
  filterOptions: {
    type: Array,
    default() {
      return [];
    },
  },
  userSetting: {
    type: Object,
    default() {
      return {};
    },
  },
});

/* emits */
defineEmits(["filterClick"]);
</script>

<template>
  <div v-for="item in filterOptions" :key="item._id">
    <div
      class="tag mx-2 my-2 inline-flex w-20 lg:w-11/12 lg:max-w-[160px]"
      :class="{
        'text-white bg-primary': userSetting.selectedTag == item.name,
      }"
      @click="$emit('filterClick', item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
