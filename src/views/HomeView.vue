<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import CardForum from "../components/CardForum.vue"
const {user} = storeToRefs(useUserStore())

</script>

<template>
  <v-main>
    <v-container>
      <CardForum />
       <CardForum />
       <CardForum />
    </v-container>
  </v-main>
</template>

<style></style>
