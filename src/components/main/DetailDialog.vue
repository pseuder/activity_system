<script setup>
import { HeartOutlined, HeartFilled, EyeFilled } from "@ant-design/icons-vue";
import ImageCarousel from "@/components/main/ImageCarousel.vue";

/* props */
const props = defineProps({
  detailData: {
    type: Object,
    default() {
      return {};
    },
  },
});

/* methods */
function enrollClick() {
  emit("enrollClick", props.detailData);
}
function cancelClick() {
  emit("cancelClick", props.detailData);
}

/* emits */
const emit = defineEmits([
  "likeClick",
  "enrollClick",
  "cancelClick",
  "editClick",
]);
</script>

<template>
  <div
    id="detailDialog"
    class="modal fade fixed top-0 left-0 hidden h-full w-full overflow-hidden"
    tabindex="-1"
  >
    <div
      class="modal-dialog pointer-events-none mx-auto my-7 h-[90%] w-5/6 max-w-max md:w-4/6 lg:w-3/6"
    >
      <div
        class="modal-content pointer-events-auto h-full rounded-md bg-white bg-clip-padding"
      >
        <div class="modal-body h-full text-base font-normal">
          <div class="flex h-full flex-col p-6">
            <div
              class="flex flex-grow flex-wrap justify-between gap-6 overflow-y-auto"
            >
              <div class="flex w-full justify-between">
                <div class="flex items-center gap-2 text-xl">
                  <eye-filled />{{ detailData.watch }}
                </div>
                <div
                  class="cursor-pointer text-3xl"
                  @click="$emit('likeClick', detailData)"
                >
                  <heart-filled v-if="detailData.liked" class="text-red-600" />
                  <heart-outlined v-else class="" />
                </div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("title") }}</div>
                <div class="text-gray">{{ detailData.title }}</div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("object") }}</div>
                <div class="text-gray">{{ detailData.object_display }}</div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("location") }}</div>
                <div class="text-gray">
                  {{ detailData.location }}
                </div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("enrollment") }}</div>
                <div class="text-gray">
                  {{ detailData.enrollment_display }}/{{ detailData.quota }}
                </div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("fee") }}</div>
                <div class="text-gray">{{ detailData.fee }}</div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("activity_time") }}</div>
                <div class="text-gray">
                  {{ detailData.activity_time_display }}
                </div>
              </div>
              <div class="flex w-full">
                <div class="w-20">{{ $t("enroll_time") }}</div>
                <div class="text-gray">
                  {{ detailData.enroll_time_display }}
                </div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("manager") }}</div>
                <div class="text-gray">{{ detailData.manager }}</div>
              </div>
              <div class="flex w-full lg:w-2/5">
                <div class="w-20">{{ $t("manager_contact") }}</div>
                <div class="text-gray">{{ detailData.manager_contact }}</div>
              </div>
              <div class="flex w-full">
                <div class="w-20 flex-shrink-0">{{ $t("description") }}</div>
                <div class="text-gray">
                  {{ detailData.description }}
                </div>
              </div>
              <div class="flex w-full justify-center gap-2">
                <ImageCarousel
                  v-show="
                    detailData.activity_imgs &&
                    detailData.activity_imgs.length > 0
                  "
                  :images="detailData.activity_imgs"
                />
              </div>
            </div>

            <div class="h-[80px] w-full">
              <!-- 分隔線 -->
              <hr class="my-3 w-[98%] border-2" />
              <button
                v-if="detailData.pending && !detailData.created"
                class="w-full cursor-not-allowed bg-gray-300"
              >
                {{ $t("notYetRegistration") }}
              </button>
              <button
                v-else-if="detailData.ongoing && detailData.enrolled"
                class="w-full bg-cancel"
                @click.prevent="cancelClick"
              >
                {{ $t("cancelRegistration") }}
              </button>
              <button
                v-else-if="detailData.ongoing && !detailData.enrolled"
                class="w-full bg-primary"
                @click.prevent="enrollClick"
              >
                {{ $t("signUpForActivities") }}
              </button>
              <div
                v-else-if="!detailData.finished && detailData.created"
                data-bs-toggle="modal"
                data-bs-target="#editDialog"
              >
                <button
                  class="w-full bg-edit"
                  @click="$emit('editClick', detailData)"
                >
                  {{ $t("modifyActivity") }}
                </button>
              </div>
              <button
                v-if="detailData.finished"
                class="w-full cursor-not-allowed bg-gray-300"
              >
                {{ $t("eventOver") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>
