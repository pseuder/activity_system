<script setup>
import { onMounted, reactive } from "vue";
import "tw-elements";
import {
  HeartOutlined,
  HeartFilled,
  EyeFilled,
  UserOutlined,
} from "@ant-design/icons-vue";

let sortOptions = ["活動時間", "報名時間", "報名價格", "查看人數", "參加人數"];
let filterOptions = ["全部", "A Group", "B Group", "C Group", "D Group"];
let activityData = reactive([]);

for (let i = 0; i < 5; i++) {
  activityData.push({
    title: "活動標題",
    object: "所有人",
    location: "Building 1",
    activity_time: "2022/11/12",
    enroll_time: "2022/11/01 ~ 2022/11/10",
    like: true,
    fee: 100,
    watch: 20,
    enrollment: 30,
  });
}

let userSetting = reactive({
  displayMode: "list",
});

onMounted(async () => {
  console.log(`the EXPLORE component is now mounted.`);
});
</script>

<template>
  <div
    class="min-w-min overflow-auto bg-explore-bg-large bg-cover bg-fixed bg-center bg-no-repeat"
  >
    <header
      class="flex h-20 justify-between py-2 px-6 text-2xl font-medium lg:px-20 lg:pt-[60px]"
    >
      <div class="flex w-10 flex-shrink-0 items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
      <nav class="flex items-center lg:flex-grow">
        <div class="dropdown relative">
          <button
            id="dropdownMenuButton"
            class="text-primary dropdown-toggle flex items-center lg:hidden"
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

        <div class="hidden lg:flex">
          <div class="ml-[16vw] flex flex-shrink-0 gap-20">
            <a>探索活動</a>
            <a class="text-gray">建立活動</a>
            <a class="text-gray">我的活動</a>
          </div>
        </div>
      </nav>
      <div class="flex w-10 flex-shrink-0 items-center">
        <img src="@/assets/image/vue.svg" alt="vue logo" />
      </div>
    </header>
    <main class="py-2 px-6">
      <div class="lg:p-4 lg:pr-14 lg:pl-[16vw]">
        <div class="flex">
          <!-- 條件排序 -->
          <div class="flex flex-grow flex-wrap">
            <template v-for="(item, index) in sortOptions" :key="index">
              <div
                class="mx-4 my-2 inline-flex w-20 items-center justify-center"
              >
                <label for="">{{ item }}</label>
                <img src="@/assets/image/sortButton.svg" alt="" class="w-3" />
              </div>
            </template>
          </div>
          <!-- 排序模式 -->
          <div class="hidden justify-center gap-4 self-center lg:flex">
            <img
              src="@/assets/image/exploreList.svg"
              alt="list"
              class="h-8 w-8 rounded-lg border-black p-1"
              :class="{
                ' border-2': userSetting.displayMode == 'block',
              }"
              @click="userSetting.displayMode = 'block'"
            />
            <img
              src="@/assets/image/exploreBlock.svg"
              alt="block"
              class="h-8 w-8 rounded-lg border-black p-1"
              :class="{
                'border-2 ': userSetting.displayMode == 'list',
              }"
              @click="userSetting.displayMode = 'list'"
            />
          </div>
        </div>
      </div>
      <!-- tag過濾 -->
      <div class="lg:flex">
        <div class="flex flex-wrap content-center lg:w-1/5 lg:flex-col">
          <template v-for="(item, index) in filterOptions" :key="index">
            <div
              class="tag mx-4 my-2 inline-flex w-20 lg:w-11/12 lg:max-w-[160px]"
            >
              {{ item }}
            </div>
          </template>
        </div>
        <!-- 活動顯示 -->
        <div class="flex w-full flex-col flex-wrap gap-4 lg:flex-row">
          <template v-for="(item, index) in activityData" :key="index">
            <div class="mx-2 min-w-[350px] rounded-lg bg-white p-6 shadow-lg">
              <div class="text-end">
                <heart-filled
                  v-if="item.like"
                  class="cursor-pointer text-red-600"
                  @click="item.like = !item.like"
                />
                <heart-outlined
                  v-else
                  class="cursor-pointer"
                  @click="item.like = !item.like"
                />
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex">
                  <div class="w-20">標題</div>
                  <div class="text-gray">{{ item.title }}</div>
                </div>
                <div class="flex">
                  <div class="w-20">對象</div>
                  <div class="text-gray">{{ item.object }}</div>
                </div>
                <div class="flex">
                  <div class="w-20">地點</div>
                  <div class="text-gray">{{ item.location }}</div>
                </div>
                <div class="flex">
                  <div class="w-20">活動時間</div>
                  <div class="text-gray">{{ item.activity_time }}</div>
                </div>
                <div class="flex">
                  <div class="w-20">報名時間</div>
                  <div class="text-gray">{{ item.register_time }}</div>
                </div>
                <hr class="border-1" />
                <div class="flex justify-end gap-4">
                  <div class="w-10">${{ item.fee }}</div>
                  <div class="flex w-10 items-center">
                    <eye-filled />{{ item.watch }}
                  </div>
                  <div class="flex w-10 items-center">
                    <user-outlined />{{ item.enrollment }}
                  </div>
                </div>

                <div class="flex justify-between">
                  <button class="btn mr-2 w-1/2 bg-gray-500">詳細資訊</button>
                  <button class="bg-primary btn ml-2 w-1/2">報名活動</button>
                </div>
              </div>
            </div>
          </template>
        </div>
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
