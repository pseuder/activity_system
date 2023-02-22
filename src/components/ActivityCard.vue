<script setup>
import {
  HeartOutlined,
  HeartFilled,
  EyeFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
defineProps({
  formData: {
    type: Array,
    default() {
      return [];
    },
  },
  groupData: {
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
    <div :class="{ 'lg:flex': userSetting.displayMode == 'list' }">
      <div
        class="flex flex-grow flex-col flex-wrap gap-4"
        :class="{
          'flex-col': userSetting.displayMode == 'block',
          'lg:flex-row': userSetting.displayMode == 'list',
        }"
      >
        <div
          class="flex"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">標題</div>
          <div class="text-gray">{{ formData.title }}</div>
        </div>
        <div
          class="flex"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">對象</div>
          <div class="text-gray">{{ formData.object_display }}</div>
        </div>
        <div
          class="flex"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">地點</div>
          <div class="text-gray">{{ formData.location }}</div>
        </div>
        <div
          class="flex"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">活動時間</div>
          <div class="text-gray">
            {{ formData.activity_time_display }}
          </div>
        </div>
        <div
          class="flex"
          :class="{ 'lg:w-2/5': userSetting.displayMode == 'list' }"
        >
          <div class="w-20">報名時間</div>
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
            詳細資訊
          </button>
        </div>

        <div
          v-if="formData.created"
          data-bs-toggle="modal"
          data-bs-target="#editDialog"
        >
          <button
            class="w-[150px] bg-edit"
            @click="$emit('editClick', formData)"
          >
            修改活動
          </button>
        </div>
        <button
          v-else-if="formData.registered"
          class="w-[150px] bg-cancel"
          @click.prevent="$emit('cancelClick', formData)"
        >
          取消報名
        </button>
        <!-- 過期的不顯示下面的按鈕 -->
        <button
          v-else-if="!formData.expired"
          class="w-[150px] bg-blue-500"
          @click="$emit('enrollClick', formData)"
        >
          報名活動
        </button>
      </div>
    </div>
  </div>
</template>
