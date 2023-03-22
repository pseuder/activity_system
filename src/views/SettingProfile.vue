<script setup>
import ProfileAvatarUpload from "@/components/setting/ProfileAvatarUpload.vue";
import ProfileEditableText from "@/components/setting/ProfileEditableText.vue";
import ResetPasswordDialog from "@/components/setting/ResetPasswordDialog.vue";

/* props */
let prop = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

/* methods */
</script>

<template>
  <ResetPasswordDialog />
  <div class="flex flex-col items-center">
    <ProfileAvatarUpload :user-img="prop.userData.avatar" />
    <ProfileEditableText type="username" :data="prop.userData.username" />
    <ProfileEditableText type="email" :data="prop.userData.email" />
    <ProfileEditableText type="phone" :data="prop.userData.phone" />
    <ProfileEditableText type="password" :data="prop.userData.password" />
  </div>
</template>
