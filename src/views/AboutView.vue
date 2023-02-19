<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const {user} = storeToRefs(useUserStore())

</script>

<template>
  <v-main>
    <v-container fluid>
      <h1 v-if="!user">u are guest</h1>
      <h1 v-else>u are {{ user.fname }}</h1>
    </v-container>
  </v-main>
</template>

<style></style>
