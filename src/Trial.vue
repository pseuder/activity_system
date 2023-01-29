<script setup lang="ts">
import { ref, reactive } from "vue";
import AlertMessage from "@/components/AlertMessage.vue";

let user = ref({});

function showMessage(type) {
  messageData.show = true;
  messageData.type = type;
}

function closeMessage() {
  messageData.show = false;
}

function onSubmit() {
  console.log("Submitting :(");
  console.log(user.value);
}
</script>

<template>
  <VeeForm @submit="onSubmit" v-slot="{ errors }">
    {{ errors }}
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <VeeField
        id="email"
        name="email"
        type="email"
        class="form-control"
        rules="email|required"
        v-model="user.email"
        :class="{
          'is-invalid': errors['email'],
          'is-valid': !errors['email'] && user.email,
        }"
        placeholder="請輸入 Email"
      ></VeeField>
      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <button class="bg-black" type="submit">Submit</button>
  </VeeForm>
</template>
