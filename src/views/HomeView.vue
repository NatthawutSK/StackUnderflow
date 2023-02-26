<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import CardForum from "../components/CardForum.vue"
const {user} = storeToRefs(useUserStore())
const {allForum} = useForumStore()
</script>

<template>
  <v-main>
    <v-container>
      <CardForum
       v-for="forum, index in allForum"
      :forum="forum"
      :to="`/forum/${index}`"
      ></CardForum>
    </v-container>
  </v-main>
</template>

<style></style>
