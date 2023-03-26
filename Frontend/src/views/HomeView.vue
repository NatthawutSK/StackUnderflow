<script setup>
import { onMounted } from "vue";
import { useForumStore } from "@/stores/forum";
import CardForum from "@/components/CardForum.vue"
const forumStore = useForumStore()
onMounted(forumStore.fetchPost)
onMounted(forumStore.fetchTag)
onMounted(forumStore.fetchSinglePost)
// const dateString = '2023-03-26T01:58:59.000Z';

// const dateObj = new Date(forumStore.post[4].post_created_at);

// const options = { 
//   month: 'short', 
//   day: '2-digit', 
//   year: 'numeric', 
//   hour: 'numeric', 
//   minute: '2-digit', 
//   hour12: true 
// };

// const formattedDate = dateObj.toLocaleString('en-US', options);

// console.log(formattedDate); // Output: "Mar 26, 2023 1:58 AM"



</script>

<template>
  <v-main>
    <!-- <v-btn @click="forumStore.fetchSinglePost">test</v-btn> -->
    {{ forumStore.allTag }}<br/>
    {{ forumStore.selectTag }}<br/>
    {{ forumStore.singlePost }}
    <!-- {{ formattedDate }} -->
    <!-- {{ forumStore.post[0].post_created_at }} -->
    <v-container>
      <!-- <v-btn @click="forumStore.kuy()">test</v-btn> -->
      <v-select  variant="outlined" class=" d-flex flex-row-reverse" item-title="tag_name" item-value="tag_id" v-model="forumStore.selectTag" chips label="Tag"
        :items="forumStore.allTag" return-object></v-select>
      <CardForum  v-for="forum in forumStore.filterForum" :forum="forum" :to="{ name: 'forum', params: { id: parseInt(forum.post_id) }}" />
    </v-container>
    
    
  </v-main>
</template>

<style scoped>
</style>
