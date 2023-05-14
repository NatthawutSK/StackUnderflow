<script setup>
import { useUserStore } from "@/stores/user";
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue"
const userStore = useUserStore()


</script>

<template>
  <v-app :theme="userStore.theme">
    <Navbar></Navbar>
    <RouterView :key="$route.path"></RouterView>
  </v-app>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
  body{
    font-family: 'Source Sans Pro', sans-serif;
  }
</style>


