<script setup>
import {
  HeartOutlined,
  HeartFilled,
  EyeFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
import "tw-elements"; //用於觸發 data-bs-toggle, data-bs-target
/* props */
defineProps({
  formData: {
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
defineEmits([
  "likeClick",
  "detailClick",
  "enrollClick",
  "editClick",
  "cancelClick",
]);
</script>

<template>
  <div
    class="relative m-auto min-w-[350px] rounded-lg bg-white p-6 shadow-lg lg:m-0"
  >
    <!-- 愛心 -->
    <div
      class="absolute top-2 right-4 cursor-pointer"
      @click="$emit('likeClick', formData)"
    >
      <heart-filled v-if="formData.liked" class="text-red-600" />
      <heart-outlined v-else />
    </div>
    <div
      class="flex h-full"
      :class="{
        'lg:flex': userSetting.displayMode == 'list',
        'flex-col': userSetting.displayMode == 'block',
      }"
    >
      <div
        class="flex flex-grow flex-col flex-wrap gap-4"
        :class="{
          'flex-col': userSetting.displayMode == 'block',
          'lg:flex-row': userSetting.displayMode == 'list',
        }"
      >
        <div
          class="flex flex-grow"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">{{ $t("title") }}</div>
          <div class="text-gray">{{ formData.title }}</div>
        </div>
        <div
          class="flex flex-grow"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">{{ $t("object") }}</div>
          <div class="text-gray">{{ formData.object_display }}</div>
        </div>
        <div
          class="flex flex-grow"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">{{ $t("location") }}</div>
          <div class="text-gray">{{ formData.location }}</div>
        </div>
        <div
          class="flex flex-grow"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">{{ $t("activity_time") }}</div>
          <div class="text-gray">
            {{ formData.activity_time_display }}
          </div>
        </div>
        <div
          class="flex flex-grow"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">{{ $t("enroll_time") }}</div>
          <div class="text-gray">
            {{ formData.enroll_time_display }}
          </div>
        </div>
        <!-- 分隔線 -->
        <hr class="border-1 w-[98%]" />
        <!-- 簡略資訊 -->
        <div class="mb-2 flex w-[98%] justify-end gap-4">
          <div class="w-10">${{ formData.fee }}</div>
          <div class="flex w-10 items-center">
            <eye-filled />{{ formData.watch }}
          </div>
          <div class="flex w-10 items-center">
            <user-outlined />{{ formData.enrollment_display }}
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-between gap-4"
        :class="{
          'lg:w-1/6  lg:min-w-[150px] lg:flex-col lg:justify-center':
            userSetting.displayMode == 'list',
        }"
      >
        <div data-bs-toggle="modal" data-bs-target="#detailDialog">
          <button
            class="w-[150px] bg-gray-500"
            @click="$emit('detailClick', formData)"
          >
            {{ $t("detailActivity") }}
          </button>
        </div>

        <!-- 修改活動按鈕 -->
        <div
          v-if="!formData.finished && formData.created"
          data-bs-toggle="modal"
          data-bs-target="#editDialog"
        >
          <button
            class="w-[150px] bg-edit"
            @click="$emit('editClick', formData)"
          >
            {{ $t("modifyActivity") }}
          </button>
        </div>

        <!-- 取消報名按鈕 -->
        <button
          v-if="formData.ongoing && formData.enrolled"
          class="w-[150px] bg-cancel"
          @click.prevent="$emit('cancelClick', formData)"
        >
          {{ $t("cancelRegistration") }}
        </button>

        <!-- 報名活動按鈕 -->
        <button
          v-if="formData.ongoing && !formData.enrolled && !formData.created"
          class="w-[150px] bg-blue-500"
          @click="$emit('enrollClick', formData)"
        >
          {{ $t("signUpForActivities") }}
        </button>
      </div>
    </div>
  </div>
</template>
