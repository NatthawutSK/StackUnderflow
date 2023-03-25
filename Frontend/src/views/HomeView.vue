<script setup>
import { ref, reactive, onMounted } from "vue";
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
// import axios from 'axios';
const forumStore = useForumStore()
onMounted(forumStore.fetchPost)
onMounted(forumStore.fetchTag)
</script>

<template>
  <v-main>
    {{ forumStore.allTag }}
    {{ forumStore.selectTag }}<br/>
    <v-container>
      <!-- <v-btn @click="forumStore.kuy()">test</v-btn> -->
      <v-select  variant="outlined" class=" d-flex flex-row-reverse" item-title="tag_name" item-value="tag_id" v-model="forumStore.selectTag" chips label="Tag"
        :items="forumStore.allTag" return-object></v-select>
      <CardForum v-for="forum,index in forumStore.filterForum" :forum="forum" :to="`/forum/${index}`"/>
    </v-container>
    
    
  </v-main>
</template>

<style scoped>
</style>
