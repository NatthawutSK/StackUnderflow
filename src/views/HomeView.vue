<script setup>
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
const forumStore = useForumStore()
</script>

<template>
  <v-main>
    <v-container>
      <v-select variant="outlined" class=" d-flex flex-row-reverse" v-model="forumStore.tag" chips label="Tag"
        :items="['All', 'JavaScript', 'Java', 'Vue.js', 'Node.js']"></v-select>
      <CardForum v-for="forum,index in forumStore.filterForum" :forum="forum" :to="`/forum/${index}`"/>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
