<script setup>
import { onMounted } from "vue";
import "tw-elements";

let sortOptions = ["活動時間", "報名時間", "價格", "查看數", "參加人數"];

onMounted(async () => {
  console.log(`the EXPLORE component is now mounted.`);
});
</script>

<template>
  <div
    class="overflow-auto bg-explore-bg-large bg-cover bg-fixed bg-center bg-no-repeat"
  >
    <header class="flex h-20 justify-between py-2 px-6 text-2xl font-medium">
      <div class="flex w-10 flex-shrink-0 items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
      <nav class="flex items-center md:flex-grow">
        <div class="dropdown relative">
          <button
            id="dropdownMenuButton"
            class="text-primary dropdown-toggle flex items-center md:hidden"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            探索活動
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              class="ml-2 w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a class="text-primary dropdown-item" href="#">探索活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">建立活動</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">我的活動</a>
            </li>
          </ul>
        </div>

        <div class="hidden md:block">
          <div class="m-[16vw] flex gap-10">
            <button class="text-primary">探索活動</button>
            <button>建立活動</button>
            <button>我的活動</button>
          </div>
        </div>
      </nav>
      <div class="flex w-10 flex-shrink-0 items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
    </header>
    <main class="flex py-2 px-6">
      <!-- 條件過濾 -->
      <div class="w-full table-auto">
        <template v-for="(item, index) in sortOptions" :key="index">
          <div class="inline-flex w-[120px]">
            <label for="">{{ item }}</label>
            <button class="w-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
                />
              </svg>
            </button>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
