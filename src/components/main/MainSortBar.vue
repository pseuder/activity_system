<script setup>
/* props */
defineProps({
  sortOptions: {
    type: Object,
    default() {
      return {};
    },
  },
  sortStatus: {
    type: Object,
    default() {
      return {};
    },
  },
});

/* emits */
defineEmits(["sortClick"]);
</script>

<template>
  <div v-for="(item, index) in sortOptions" :key="index">
    <div
      class="mx-6 my-2 inline-flex items-center justify-center gap-2"
      @click="$emit('sortClick', item)"
    >
      <span
        class="cursor-pointer select-none font-semibold"
        :class="{
          '  text-blue-500': item.status != sortStatus.unsorted,
        }"
        >{{ $t(item.attribute) }}
      </span>
      <div class="flex cursor-pointer flex-col gap-1">
        <svg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          xmlns="http://www.w3.org/2000/svg"
          :class="{
            ' fill-blue-500': item.status === sortStatus.ascending,
          }"
        >
          <path
            d="M5.22149 0.410216L0.258056 7.00414C-0.327704 7.78251 0.148355 9 1.03734 9H10.9642C11.1632 9.0002 11.3579 8.93373 11.5252 8.80855C11.6925 8.68336 11.8252 8.50478 11.9075 8.29418C11.9897 8.08358 12.018 7.84988 11.9889 7.62109C11.9598 7.39229 11.8746 7.17809 11.7435 7.00414L6.78006 0.411419C6.68292 0.2822 6.56313 0.178633 6.42872 0.107673C6.29431 0.0367125 6.14839 0 6.00077 0C5.85315 0 5.70724 0.0367125 5.57283 0.107673C5.43842 0.178633 5.31862 0.2822 5.22149 0.411419V0.410216Z"
          />
        </svg>
        <svg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          xmlns="http://www.w3.org/2000/svg"
          :class="{
            ' fill-blue-500': item.status === sortStatus.descending,
          }"
        >
          <path
            d="M5.22149 8.58978L0.258056 1.99466C-0.327703 1.21869 0.148355 4.42369e-07 1.03734 4.42369e-07H10.9642C11.1632 -0.000197853 11.3579 0.0662735 11.5252 0.191455C11.6925 0.316636 11.8252 0.49522 11.9075 0.705822C11.9897 0.916423 12.018 1.15011 11.9889 1.37891C11.9598 1.60771 11.8746 1.82191 11.7435 1.99586L6.78006 8.58858C6.68292 8.7178 6.56313 8.82137 6.42872 8.89233C6.29431 8.96329 6.14839 9 6.00077 9C5.85315 9 5.70724 8.96329 5.57283 8.89233C5.43842 8.82137 5.31862 8.7178 5.22149 8.58858V8.58978Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
