<script setup>
import { ref, reactive, onMounted } from "vue";
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
// import axios from 'axios';
const forumStore = useForumStore()
onMounted(forumStore.fetchPost)
</script>

<template>
  <v-main>
    <v-container>
      <v-select variant="outlined" class=" d-flex flex-row-reverse" v-model="forumStore.selectTag" chips label="Tag"
        :items="['All', 'JavaScript', 'Java', 'Vue.js', 'Node.js']"></v-select>
      <CardForum v-for="forum,index in forumStore.filterForum" :forum="forum" :to="`/forum/${index}`"/>
    </v-container>
    <!-- {{ forumStore.post }} -->
  </v-main>
</template>

<style scoped>
</style>
