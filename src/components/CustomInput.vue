<script setup>
defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    require: false,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex items-center rounded-md border-2 border-gray-300 bg-white">
    <div class="flex w-full">
      <div class="flex w-10 flex-none items-center justify-center">
        <slot></slot>
      </div>
      <div class="flex-grow">
        <input
          :type="inputType"
          :placeholder="placeholder"
          class="w-full border-none px-2 outline-none"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
