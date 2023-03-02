<script setup>
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
const forumStore = useForumStore()
</script>

<template>
  <v-main>
    <v-container>
      <v-combobox variant="outlined" class="combo" v-model="forumStore.tag" chips label="Tag"
        :items="['All', 'JavaScript', 'Java', 'Vue.js', 'Node.js']"></v-combobox>
      <CardForum v-for="forum in forumStore.filterForum" :forum="forum" :to="`/forum/${forum.idPost}`"/>
    </v-container>
  </v-main>
</template>

<style scoped>
 .combo{
  width: 12%;
 }
</style>
