<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useForumStore } from "../stores/forum";
import CardForum from "../components/CardForum.vue"
const {user} = storeToRefs(useUserStore())
const {allforum} = storeToRefs(useForumStore())
</script>

<template>
  <v-main>
    <v-container>

    </v-container>
  </v-main>
</template>

<style></style>
