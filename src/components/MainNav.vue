<script setup>
defineProps({
  userData: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <div class="flex items-center">
    <img src="@/assets/image/vite.svg" alt="vue logo" class="w-10" />
  </div>
  <nav
    class="flex flex-grow items-center justify-center lg:ml-[10vw] lg:justify-start"
  >
    <div class="dropdown relative">
      <button
        id="dropdownMenuButton"
        class="dropdown-toggle flex items-center text-primary lg:hidden"
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
          <a class="dropdown-item text-primary" href="/explore">探索活動</a>
        </li>
        <li>
          <a class="dropdown-item" href="/create">建立活動</a>
        </li>
        <li>
          <a class="dropdown-item" href="/myactivity">我的活動</a>
        </li>
      </ul>
    </div>

    <div class="hidden lg:flex">
      <div class="flex flex-shrink-0 gap-20 pl-[10vw] font-bold">
        <a class="" href="/explore">探索活動</a>
        <a class="text-black" href="/create">建立活動</a>
        <a class="text-black" href="/myactivity">我的活動</a>
      </div>
    </div>
  </nav>
  <div class="flex items-center">
    <a href="/setting">
      <img :src="userData.avatar" alt="vue logo" class="w-16 rounded-full" />
    </a>
  </div>
</template>
