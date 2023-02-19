<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user";
import { RouterView } from "vue-router";

import Navbar from "./components/Navbar.vue"
const {theme} = storeToRefs(useUserStore())


</script>

<template>
  <v-app :theme="theme">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </v-app>
</template>

<style scoped></style>


