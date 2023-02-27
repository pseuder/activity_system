<script setup>
import { reactive } from "vue";
import AvatarUpload from "@/components/AvatarUpload.vue";
import EditableText from "@/components/EditableText.vue";

let userData = reactive({
  name: "Leman",
  account: "a123456",
  password: "a12*****456",
  email: "a123456@mail.com",
  phone: "0912345678",
});
</script>

<template>
  <div class="flex flex-col items-center">
    <AvatarUpload />
    <EditableText type="name" :data="userData.name" />
    <EditableText type="account" :data="userData.account" />
    <EditableText type="password" :data="userData.password" />
    <EditableText type="email" :data="userData.email" />
    <EditableText type="phone" :data="userData.phone" />
  </div>
</template>
