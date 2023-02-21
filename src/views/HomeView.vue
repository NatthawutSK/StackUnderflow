<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const {user} = storeToRefs(useUserStore())

</script>

<template>
  <v-main>
    <h1>Y A I M A K M A K</h1>
    <v-container fluid>
      <h1 v-if="!user">welcome guest</h1>
      <h1 v-else>welcome{{ user.fname }}</h1>
    </v-container>
  </v-main>
</template>

<style></style>
