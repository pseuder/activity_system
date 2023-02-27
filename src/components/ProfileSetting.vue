<script setup>
import { reactive, onBeforeMount } from "vue";
import AvatarUpload from "@/components/AvatarUpload.vue";
import EditableText from "@/components/EditableText.vue";
import UserService from "@/services/user.service.js";

let userData = reactive({
  _id: "",
  avatar: "",
  createDate: "",
  email: "",
  password: "",
  username: "",
  phone: "",
});

onBeforeMount(async () => {
  await UserService.getUserInfo().then((res) => {
    for (let key in userData) {
      userData[key] = res.data[key];
    }
  });
});

function changeUserData(key, val) {
  userData[key] = val;
}
</script>

<template>
  <div class="flex flex-col items-center">
    <AvatarUpload
      :user-img="userData.avatar"
      @change-user-data="changeUserData"
    />
    <EditableText
      type="username"
      :data="userData.username"
      @change-user-data="changeUserData"
    />
    <EditableText
      type="email"
      :data="userData.email"
      @change-user-data="changeUserData"
    />
    <EditableText
      type="password"
      :data="userData.password"
      @change-user-data="changeUserData"
    />
    <EditableText
      type="phone"
      :data="userData.phone"
      @change-user-data="changeUserData"
    />
  </div>
</template>
