<script setup>
import { reactive, onBeforeMount } from "vue";
import UserService from "@/services/user.service.js";
import ProfileAvatarUpload from "@/components/setting/ProfileAvatarUpload.vue";
import ProfileEditableText from "@/components/setting/ProfileEditableText.vue";

/* data */
let userData = reactive({
  _id: "",
  avatar: "",
  createDate: "",
  email: "",
  password: "",
  username: "",
  phone: "",
});

/* methods */
function changeUserData(key, val) {
  userData[key] = val;
}

/* hook */
onBeforeMount(async () => {
  await UserService.getUserInfo().then((res) => {
    for (let key in userData) {
      userData[key] = res.data[key];
    }
  });
});
</script>

<template>
  <div class="flex flex-col items-center">
    <ProfileAvatarUpload
      :user-img="userData.avatar"
      @change-user-data="changeUserData"
    />
    <ProfileEditableText
      type="username"
      :data="userData.username"
      @change-user-data="changeUserData"
    />
    <ProfileEditableText
      type="email"
      :data="userData.email"
      @change-user-data="changeUserData"
    />
    <ProfileEditableText
      type="password"
      :data="userData.password"
      @change-user-data="changeUserData"
    />
    <ProfileEditableText
      type="phone"
      :data="userData.phone"
      @change-user-data="changeUserData"
    />
  </div>
</template>
