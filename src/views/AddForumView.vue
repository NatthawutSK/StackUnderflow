<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import FormAddForum from "../components/FormAddForum.vue"


</script>

<template>
  <v-main>
    <v-container>
        <FormAddForum></FormAddForum>
    </v-container>
  </v-main>
</template>

<style></style>