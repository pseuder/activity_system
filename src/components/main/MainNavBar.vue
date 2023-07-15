<script setup>
import { computed } from "vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";
/* props */
const props = defineProps({
  userData: {
    type: Object,
    default() {
      return {};
    },
  },
  currentPage: {
    type: String,
    default() {
      return "";
    },
  },
});

/* data */
let pageMap = {
  explore: "exploreAactivity",
  create: "createActivity",
  mine: "mineActivity",
};

/* computed */
let currentPage_display = computed(() => {
  // 過濾條件
  return pageMap[props.currentPage]
    ? pageMap[props.currentPage]
    : "exploreAactivity";
});

/* methods */
function navClick(path) {
  emits("navigate", path);
}

/* emits */
const emits = defineEmits(["navigate"]);
</script>

<template>
  <div class="flex items-center">
    <img
      src="@/assets/image/vite.svg"
      alt=""
      class="w-10 cursor-pointer"
      @click="navClick('explore')"
    />
  </div>
  <nav
    class="flex flex-grow items-center justify-center lg:ml-[10vw] lg:justify-start"
  >
    <a-dropdown
      :trigger="['click']"
      class="self-center text-black lg:hidden"
      :class="{
        'text-primary': pageMap[currentPage] === currentPage_display,
      }"
    >
      <a class="ant-dropdown-link" @click.prevent>
        {{ $t(currentPage_display) }}
        <CaretDownOutlined class="align-middle" />
      </a>

      <template #overlay>
        <a-menu class="rounded-md">
          <a-menu-item key="0">
            <a class="text-lg" @click="navClick('explore')">{{
              $t("exploreAactivity")
            }}</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a class="text-lg" @click="navClick('create')">{{
              $t("createActivity")
            }}</a>
          </a-menu-item>
          <a-menu-item key="2"
            ><a class="text-lg" @click="navClick('mine')">{{
              $t("mineActivity")
            }}</a></a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
    <div class="hidden lg:flex">
      <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
        <a
          :class="{ 'text-black': currentPage !== 'explore' }"
          @click="navClick('explore')"
          >{{ $t("exploreAactivity") }}</a
        >
        <a
          :class="{ 'text-black': currentPage !== 'create' }"
          @click="navClick('create')"
          >{{ $t("createActivity") }}</a
        >
        <a
          :class="{ 'text-black': currentPage !== 'mine' }"
          @click="navClick('mine')"
          >{{ $t("mineActivity") }}</a
        >
      </div>
    </div>
  </nav>

  <div class="flex w-12 items-center">
    <a @click="navClick('setting')" class="">
      <img
        v-if="userData.avatar === ''"
        src="@\assets\image\defaultUser.png"
        class="w-16 rounded-full"
      />
      <img :src="userData.avatar" alt="" class="m-auto w-16 rounded-full" />
      <div class="text-center text-sm">{{ userData.username }}</div>
    </a>
  </div>
</template>
